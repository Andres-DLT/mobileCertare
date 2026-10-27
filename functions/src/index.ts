import { onCall, HttpsError } from "firebase-functions/v2/https";

// Disabled until orders and payments can be verified on the server. An existing
// deployment remains active until the operator deploys this change.
export const sendOrderEmail = onCall(async () => {
  throw new HttpsError("failed-precondition", "Order processing is disabled.");
});
