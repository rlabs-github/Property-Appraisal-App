// src/config/storage.ts
import { Storage } from '@google-cloud/storage';

export const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE,
});