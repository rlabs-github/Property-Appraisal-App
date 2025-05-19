// src/config/firebase.ts
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let app;

try {
  app = initializeApp({
    credential: applicationDefault(),
  });
  console.log('[🔥 Firebase] Initialized using Application Default Credentials.');
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
