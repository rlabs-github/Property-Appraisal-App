// src/config/environment.ts
export const environment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    database: {
      url: process.env.DATABASE_URL,
    },
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
    gcp: {
      projectId: process.env.GCP_PROJECT_ID,
      bucketName: process.env.GCP_BUCKET_NAME,
    },
  } as const;