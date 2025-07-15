import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const uploadFolder = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }
  const form = formidable({
    uploadDir: uploadFolder,
    keepExtensions: true,
    multiples: false,
  });
  try {
    const [fields, files] = await form.parse(req);
    const file = Object.values(files)[0]?.[0];
    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const fileName = path.basename(file.filepath);
    return res.status(200).json({ link: `/uploads/${fileName}` });
  } catch (err) {
    console.error("Upload Error:", err);
    return res
      .status(500)
      .json({ error: "Upload failed", message: err.message });
  }
}