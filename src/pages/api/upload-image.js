import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  const uploadFolder = path.join(process.cwd(), '/public/uploads');

  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  form.uploadDir = uploadFolder;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });

    const file = files.image[0]; // Froala uses "image" field
    const fileName = path.basename(file.filepath);

    return res.status(200).json({ link: `/uploads/${fileName}` });
  });
}
