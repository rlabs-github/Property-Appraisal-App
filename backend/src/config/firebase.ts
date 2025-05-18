// src/config/firebase.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as fs from 'fs';
import * as path from 'path';

let app;

try {
  // Try loading from a file path (Cloud Run, mounted secret)
  const keyPath = process.env.FIREBASE_ADMIN_KEY_PATH || '';
  if (keyPath && fs.existsSync(keyPath)) {
    const rawJson = fs.readFileSync(keyPath, 'utf8');
    const serviceAccount = JSON.parse(rawJson);
    app = initializeApp({ credential: cert(serviceAccount) });
    console.log('[🔥 Firebase] Initialized using mounted service account key.');
  } else {
    // Fallback to env-based credentials (for local dev)
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('[🔥 Firebase] Initialized using environment variable credentials.');
  }
} catch (e) {
  console.error('[❌ Firebase] Initialization failed:', e instanceof Error ? e.message : e);
  process.exit(1);
}

const auth = getAuth(app);

export { app as firebase, auth };

// 🔎 Optional test block for local dev
if (require.main === module) {
  (async () => {
    try {
      const user = await auth.getUserByEmail('test@example.com');
      console.log('[✅ Firebase Test] User lookup succeeded');
    } catch (e) {
      console.warn('[⚠️ Firebase Test] User lookup failed:', e instanceof Error ? e.message : e);
    }
  })();
}



