// services/storage/file.service.ts
import { Storage } from '@google-cloud/storage';
import config from '../../config';

export class FileService {
    private storage: Storage;
    private bucket: string;

    constructor() {
        this.storage = new Storage();
        this.bucket = config.gcp.bucketName || 'default-bucket';
    }

    async uploadFile(file: Buffer, path: string): Promise<string> {
        console.log(`Uploading file to: ${path}`);
        const bucket = this.storage.bucket(this.bucket);
        const blob = bucket.file(path);
        await blob.save(file, { metadata: { contentType: 'application/octet-stream' } });
        return `https://storage.googleapis.com/${this.bucket}/${path}`;
    }

    async getFile(path: string): Promise<Buffer> {
        console.log(`Retrieving file: ${path}`);
        const bucket = this.storage.bucket(this.bucket);
        const blob = bucket.file(path);
        const [fileContent] = await blob.download();
        return fileContent;
    }
}
