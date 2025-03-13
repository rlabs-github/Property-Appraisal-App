import { getAuth } from 'firebase-admin/auth';

const auth = getAuth();
const userCredential = await auth.signInWithEmailAndPassword(email, password
    if (!email || !password) {
        throw new Error('Email and password are required');
      }
);