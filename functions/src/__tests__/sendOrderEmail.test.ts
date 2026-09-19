/**
 * Tests para sendOrderEmail Cloud Function.
 *
 * Se mockean nodemailer, firebase-admin y firebase-functions/v2/https
 * para verificar que:
 *  1. buildOrderEmailHtml genera HTML con todos los datos del pedido
 *  2. sendOrderEmail envia el correo correctamente
 *  3. Se guarda el registro en Firestore con emailSent: true
 *  4. Si falla el envio, se guarda con emailSent: false
 *  5. Se lanza error si faltan datos requeridos
 */

// ---- Mocks ----

const mockSendMail = jest.fn();
const mockCreateTransport = jest.fn(() => ({ sendMail: mockSendMail }));

jest.mock("nodemailer", () => ({
  createTransport: mockCreateTransport,
}));

const mockSet = jest.fn(() => Promise.resolve());
const mockDoc = jest.fn(() => ({ set: mockSet }));
const mockCollection = jest.fn(() => ({ doc: mockDoc }));
const mockFirestore: any = jest.fn(() => ({
  collection: mockCollection,
}));
mockFirestore.FieldValue = { serverTimestamp: jest.fn(() => "MOCK_TIMESTAMP") };

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  firestore: mockFirestore,
}));

jest.mock("firebase-functions/v2/https", () => ({
  onCall: jest.fn((handler: any) => handler),
  HttpsError: class HttpsError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.code = code;
    }
  },
}));

// ---- Imports (after mocks) ----

import { buildOrderEmailHtml, OrderEmailData } from "../index";

// ---- Test data ----

function createMockOrderData(overrides: Partial<OrderEmailData> = {}): OrderEmailData {
  return {
    orderId: "PAY-123456",
    payerName: "John Doe",
    payerEmail: "john@example.com",
    items: [
      {
        name: "Black T-Shirt",
        units: 2,
        unitPrice: 29.99,
        subtotal: 59.98,
      },
      {
        name: "Blue Jeans",
        units: 1,
        unitPrice: 49.99,
        subtotal: 49.99,
      },
    ],
    totalProducts: 3,
    totalAmount: 109.97,
    paymentDate: "Saturday, April 19, 2026 at 3:00 PM",
    currency: "MXN",
    ...overrides,
  };
}

// ---- Tests ----

describe("buildOrderEmailHtml", () => {
  it("should include the order ID in the HTML", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("Order #PAY-123456");
  });

  it("should include all product names", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("Black T-Shirt");
    expect(html).toContain("Blue Jeans");
  });

  it("should include unit prices formatted to 2 decimals", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("$29.99");
    expect(html).toContain("$49.99");
  });

  it("should include subtotals for each item", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("$59.98");
    expect(html).toContain("$49.99");
  });

  it("should include the total amount", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("TOTAL: $109.97");
  });

  it("should include customer name and email", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("John Doe");
    expect(html).toContain("john@example.com");
  });

  it("should include the payment date", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("Saturday, April 19, 2026 at 3:00 PM");
  });

  it("should include the total products count", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("Total Products:</strong> 3");
  });

  it("should include PayPal payment confirmation", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("Payment completed via PayPal");
  });

  it("should include store branding", () => {
    const data = createMockOrderData();
    const html = buildOrderEmailHtml(data);
    expect(html).toContain("CERTARE");
    expect(html).toContain("New Order Received");
  });
});

describe("sendOrderEmail Cloud Function", () => {
  let sendOrderEmail: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSendMail.mockResolvedValue({ messageId: "test-id" });
    process.env.SMTP_EMAIL = "test@gmail.com";
    process.env.SMTP_PASSWORD = "test-password";

    // Re-require to get the wrapped handler
    jest.isolateModules(() => {
      const mod = require("../index");
      sendOrderEmail = mod.sendOrderEmail;
    });
  });

  afterEach(() => {
    delete process.env.SMTP_EMAIL;
    delete process.env.SMTP_PASSWORD;
  });

  it("should throw error when orderId is missing", async () => {
    const data = createMockOrderData({ orderId: "" });
    await expect(sendOrderEmail({ data })).rejects.toThrow(
      "Faltan datos del pedido"
    );
  });

  it("should throw error when items is missing", async () => {
    const data = createMockOrderData({ items: undefined as any });
    await expect(sendOrderEmail({ data })).rejects.toThrow(
      "Faltan datos del pedido"
    );
  });

  it("should throw error when totalAmount is missing", async () => {
    const data = createMockOrderData({ totalAmount: 0 });
    await expect(sendOrderEmail({ data })).rejects.toThrow(
      "Faltan datos del pedido"
    );
  });

  it("should call nodemailer createTransport with SMTP credentials", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    expect(mockCreateTransport).toHaveBeenCalledWith({
      service: "gmail",
      auth: {
        user: "test@gmail.com",
        pass: "test-password",
      },
    });
  });

  it("should send email to jackson.grim@redboyconsulting.com", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe("jackson.grim@redboyconsulting.com");
  });

  it("should include order details in email subject", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.subject).toContain("PAY-123456");
    expect(mailOptions.subject).toContain("$109.97");
    expect(mailOptions.subject).toContain("John Doe");
  });

  it("should include HTML body with all product details", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.html).toContain("Black T-Shirt");
    expect(mailOptions.html).toContain("Blue Jeans");
    expect(mailOptions.html).toContain("TOTAL: $109.97");
  });

  it("should save order to Firestore with emailSent: true on success", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    expect(mockCollection).toHaveBeenCalledWith("orders");
    expect(mockDoc).toHaveBeenCalledWith("PAY-123456");
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: "PAY-123456",
        emailSent: true,
        createdAt: "MOCK_TIMESTAMP",
      })
    );
  });

  it("should return success response when email is sent", async () => {
    const data = createMockOrderData();
    const result = await sendOrderEmail({ data });

    expect(result).toEqual({
      success: true,
      message: "Email sent successfully.",
    });
  });

  it("should save order with emailSent: false when email fails", async () => {
    mockSendMail.mockRejectedValue(new Error("SMTP connection failed"));
    const data = createMockOrderData();

    await expect(sendOrderEmail({ data })).rejects.toThrow(
      "Failed to send email notification."
    );

    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        emailSent: false,
        emailError: "SMTP connection failed",
      })
    );
  });

  it("should set the from field with SMTP_EMAIL", async () => {
    const data = createMockOrderData();
    await sendOrderEmail({ data });

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.from).toContain("test@gmail.com");
    expect(mailOptions.from).toContain("Certare");
  });
});
