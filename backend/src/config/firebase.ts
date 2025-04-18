// src/config/firebase.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as fs from 'fs';
import * as path from 'path';

const rawJson = fs.readFileSync(path.resolve(__dirname, '../../credentials/firebase-service-account.json'), 'utf8');
const serviceAccount = JSON.parse(rawJson);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth(app);

export { app as firebase, auth }; // ✅ Export firebase for services that use verifyIdToken/getUser

// At the bottom of config/firebase.ts
if (require.main === module) {
  (async () => {
    try {
      const user = await auth.getUserByEmail('test@example.com');
      console.log('[✅ TEST PASSED] Firebase initialized and user lookup ran');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log('[⚠️ TEST WARNING] Firebase initialized but user lookup failed:', msg);
    }
  })();
}



