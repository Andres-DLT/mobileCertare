import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { onCall, HttpsError } from "firebase-functions/v2/https";

admin.initializeApp();

export interface OrderEmailData {
  orderId: string;
  payerName: string;
  payerEmail: string;
  items: {
    name: string;
    units: number;
    unitPrice: number;
    subtotal: number;
  }[];
  totalProducts: number;
  totalAmount: number;
  paymentDate: string;
  currency: string;
}

const STORE_EMAIL =
  process.env.STORE_EMAIL || "jackson.grim@redboyconsulting.com";

export function buildOrderEmailHtml(data: OrderEmailData): string {
  const cur = data.currency || 'MXN';
  const itemsRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${item.name}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.units}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">$${item.unitPrice.toLocaleString('en-US')} ${cur}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">$${item.subtotal.toLocaleString('en-US')} ${cur}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#0b1220;color:#e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#6366f1,#22d3ee);padding:24px 28px;">
      <h1 style="margin:0;color:#fff;font-size:22px;">CERTARE</h1>
      <p style="margin:4px 0 0;color:#e0e7ff;font-size:13px;">New Order Received</p>
    </div>
    <div style="padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:14px;">Order #${data.orderId}</p>
      <p style="margin:0 0 4px;font-size:14px;">${data.payerName} — ${data.payerEmail}</p>
      <p style="margin:0 0 16px;font-size:14px;">${data.paymentDate}</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#111a2e;color:#22d3ee;text-align:left;">
            <th style="padding:8px 10px;">Product</th>
            <th style="padding:8px 10px;">Qty</th>
            <th style="padding:8px 10px;text-align:right;">Unit</th>
            <th style="padding:8px 10px;text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
      <p style="margin:16px 0 0;text-align:right;font-size:13px;">
        Total Products:</strong> ${data.totalProducts}
      </p>
      <p style="margin:4px 0 16px;text-align:right;font-size:18px;font-weight:bold;color:#fff;">
        TOTAL: $${data.totalAmount.toLocaleString('en-US')} ${cur}
      </p>
      <p style="margin:0;font-size:12px;color:#94a3b8;">Payment completed via PayPal.</p>
    </div>
  </div>`;
}

export const sendOrderEmail = onCall(async (request: any) => {
  const data = request.data as OrderEmailData;

  if (!data?.orderId || !data?.items?.length || !data?.totalAmount) {
    throw new HttpsError("invalid-argument", "Faltan datos del pedido");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const cur = data.currency || 'MXN';

  const mailOptions = {
    to: STORE_EMAIL,
    from: `"Certare" <${process.env.SMTP_EMAIL}>`,
    subject: `New Order #${data.orderId} - $${data.totalAmount.toLocaleString('en-US')} ${cur} - ${data.payerName}`,
    html: buildOrderEmailHtml(data),
  };

  const ordersRef = admin.firestore().collection("orders");

  try {
    await transporter.sendMail(mailOptions);
    await ordersRef.doc(data.orderId).set({
      orderId: data.orderId,
      payerName: data.payerName,
      payerEmail: data.payerEmail,
      items: data.items,
      totalProducts: data.totalProducts,
      totalAmount: data.totalAmount,
      currency: data.currency || 'MXN',
      paymentDate: data.paymentDate,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      emailSent: true,
    });
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await ordersRef.doc(data.orderId).set({
      orderId: data.orderId,
      emailSent: false,
      emailError: message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    throw new HttpsError("internal", "Failed to send email notification.");
  }
});