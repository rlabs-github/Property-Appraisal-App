import { getAuth } from "firebase-admin/auth";

async verifyUser(idToken: string) {
  if (!idToken) {
    throw new Error("ID token is required.");
  }

  // Verify the ID token
  const decodedToken = await getAuth().verifyIdToken(idToken);
  return decodedToken;
}