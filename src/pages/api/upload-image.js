// src/pages/api/upload-image.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();
  const uploadFolder = path.join(process.cwd(), '/public/uploads');

  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  form.uploadDir = uploadFolder;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.image?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileName = path.basename(file.filepath);
    return res.status(200).json({ link: `/uploads/${fileName}` });
  });
}
