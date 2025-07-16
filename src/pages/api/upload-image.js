import { supabase } from "@/supabaseClient";
import { log } from "console";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};
console.log("process.env.SUPABASE_BUCKET==========================>",process.env.SUPABASE_BUCKET);

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { files } = await parseForm(req);

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename}`;
    console.log("supabase.storage===================>",await supabase.storage.from(process.env.SUPABASE_BUCKET));
    
    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(fileName, fileContent, {
        contentType: file.mimetype,
      });
console.log("uploadError===================>",uploadError);

    if (uploadError) {
      return res
        .status(500)
        .json({ error: "Upload failed", message: uploadError.message });
    }

    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(fileName);

    return res.status(200).json({ link: publicUrlData.publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
}
