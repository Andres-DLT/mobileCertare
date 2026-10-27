import { sendOrderEmail } from "../index";

// Firebase wraps the handler, so mock the wrapper and call it without a network.
jest.mock("firebase-functions/v2/https", () => ({
  onCall: (handler: unknown) => handler,
  HttpsError: class HttpsError extends Error {
    constructor(public code: string, message: string) { super(message); }
  },
}));

describe("legacy order callable", () => {
  it("rejects unauthenticated requests and cannot process an order", async () => {
    const handler = sendOrderEmail as unknown as (request: unknown) => Promise<unknown>;
    await expect(handler({ data: { orderId: "fake", totalAmount: 1 } }))
      .rejects.toMatchObject({ code: "failed-precondition" });
  });
  it("also rejects authenticated requests until checkout is redesigned", async () => {
    const handler = sendOrderEmail as unknown as (request: unknown) => Promise<unknown>;
    await expect(handler({ auth: { uid: "member" }, data: {} }))
      .rejects.toMatchObject({ code: "failed-precondition" });
  });
});
