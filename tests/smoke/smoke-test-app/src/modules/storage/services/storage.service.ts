import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class StorageService {
  private client: S3Client;

  constructor(config: { region: string; credentials: { accessKeyId: string; secretAccessKey: string } }) {
    this.client = new S3Client(config);
  }

  async getUploadUrl(bucket: string, key: string, expiresIn: number = 3600) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  async uploadFile(bucket: string, key: string, body: Buffer | Uint8Array | string) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
    });

    return await this.client.send(command);
  }
}
