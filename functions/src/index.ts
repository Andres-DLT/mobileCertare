import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// ---- Configuracion SMTP ----
// Crea un archivo functions/.env con:
//   SMTP_EMAIL=tu-email@gmail.com
//   SMTP_PASSWORD=tu-app-password
// Para produccion, configura secrets en Google Cloud.

const OWNER_EMAIL = "jackson.grim@redboyconsulting.com";

export interface OrderItem {
  name: string;
  size: string;
  units: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderEmailData {
  orderId: string;
  payerName: string;
  payerEmail: string;
  items: OrderItem[];
  totalProducts: number;
  totalAmount: number;
  paymentDate: string;
}

/**
 * Construye el HTML del correo con los detalles del pedido.
 */
export function buildOrderEmailHtml(data: OrderEmailData): string {
  const itemsRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.size}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.units}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${item.subtotal.toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1a1a1a;color:#fff;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;color:#e8192c;">CLOTH STORE</h1>
        <p style="margin:5px 0 0;">New Order Received</p>
      </div>
      <div style="padding:20px;background:#f9f9f9;border:1px solid #ddd;">
        <h2 style="color:#1a1a1a;margin-top:0;">Order #${data.orderId}</h2>
        <p><strong>Date:</strong> ${data.paymentDate}</p>
        <p><strong>Customer:</strong> ${data.payerName}</p>
        <p><strong>Email:</strong> ${data.payerEmail}</p>
        <h3 style="color:#e8192c;">Order Details</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="background:#1a1a1a;color:#fff;">
              <th style="padding:8px;border:1px solid #ddd;">Product</th>
              <th style="padding:8px;border:1px solid #ddd;">Size</th>
              <th style="padding:8px;border:1px solid #ddd;">Qty</th>
              <th style="padding:8px;border:1px solid #ddd;">Unit Price</th>
              <th style="padding:8px;border:1px solid #ddd;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>
        <div style="text-align:right;font-size:18px;margin-top:10px;">
          <strong>Total Products:</strong> ${data.totalProducts}<br/>
          <strong style="color:#e8192c;">TOTAL: $${data.totalAmount.toFixed(2)}</strong>
        </div>
        <div style="margin-top:20px;padding:12px;background:#d4edda;border-radius:6px;text-align:center;">
          <strong style="color:#155724;">Payment completed via PayPal</strong>
        </div>
      </div>
      <div style="background:#1a1a1a;color:#888;padding:12px;text-align:center;border-radius:0 0 8px 8px;font-size:12px;">
        Cloth Store - Automated Order Notification
      </div>
    </div>
  `;
}

/**
 * Crea el transporter de Nodemailer con la configuracion SMTP.
 */
export function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Cloud Function v2: sendOrderEmail
 * Se llama desde el frontend despues de un pago exitoso con PayPal.
 * Envia un correo con todos los detalles del pedido al dueno de la tienda.
 */
export const sendOrderEmail = onCall(async (request) => {
  const data = request.data as OrderEmailData;

  // Validar datos requeridos
  if (!data.orderId || !data.items || !data.totalAmount) {
    throw new HttpsError(
      "invalid-argument",
      "Faltan datos del pedido (orderId, items, totalAmount)."
    );
  }

  const transporter = createTransporter();
  const htmlBody = buildOrderEmailHtml(data);

  const mailOptions = {
    from: `"Cloth Store" <${process.env.SMTP_EMAIL}>`,
    to: OWNER_EMAIL,
    subject: `New Order #${data.orderId} - $${data.totalAmount.toFixed(2)} - ${data.payerName}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Guardar registro en Firestore
    await admin.firestore().collection("orders").doc(data.orderId).set({
      ...data,
      emailSent: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: "Email sent successfully." };
  } catch (error: any) {
    console.error("Error sending email:", error);

    // Guardar la orden aunque falle el correo
    await admin.firestore().collection("orders").doc(data.orderId).set({
      ...data,
      emailSent: false,
      emailError: error.message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    throw new HttpsError("internal", "Failed to send email notification.");
  }
});
