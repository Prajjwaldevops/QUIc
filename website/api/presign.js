import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { team_id, filename, contentType } = req.body;

    if (!team_id) {
      return res.status(400).json({ error: 'Missing team_id' });
    }

    const safeTeamId = team_id.replace('#', '');
    const uuid = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
      
    const key = `${safeTeamId}/draft_${uuid}.pdf`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType || 'application/pdf',
    });

    const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
    const publicUrl = `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`;

    res.status(200).json({ presignedUrl, publicUrl, key });
  } catch (error) {
    console.error('Presign error:', error);
    res.status(500).json({ error: 'Failed to generate presigned URL: ' + error.message });
  }
}
