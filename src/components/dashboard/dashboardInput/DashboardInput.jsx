"use client";
const DashboardInput = ({
  placeholder,
  fn,
  name,
  value,
  inputDir,
  type,
  classes,
  readOnly,
  isArticleNumUnique,
  t,
}) => {
  const requiredFields = [
    "meta_data_title_en",
    "meta_data_desc_en",
    "meta_data_keywords_en",
    "meta_data_image_url",
    "article_number",
  ];
  const handleChange = async (e) => {
    if (type === "file") {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (res.ok && result.link) {
          fn(name, result.link);
        } else {
          console.error("Upload failed:", result.message || result.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      fn(name, e.target.value);
    }
  };
  return (
    <div className={`mb-3 ${classes}`}>
      <input
        dir={inputDir || "ltr"}
        placeholder={placeholder}
        type={type}
        className={`form-control ${
          isArticleNumUnique && "border border-danger"
        }`}
        value={type !== "file" ? value || "" : undefined}
        name={name}
        readOnly={readOnly}
        required={requiredFields.includes(name)}
        onChange={handleChange}
      />
      {isArticleNumUnique && (
        <p
          className="text-danger text-center mt-2 fw-bold"
          style={{ fontSize: "10px" }}
        >
          {t.article_num_unique}
        </p>
      )}
    </div>
  );
};

export default DashboardInput;
