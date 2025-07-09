"use client";
const DashboardInput = ({
  placeholder,
  fn,
  name,
  value,
  inputDir,
  type = "text",
  classes = "",
}) => {
  const requiredFields = [
    "meta_data_title_en",
    "meta_data_desc_en",
    "meta_data_keywords_en",
    "meta_data_image_url",
    "article_number",
  ];

  return (
    <div className={`mb-3 ${classes}`}>
      <input
        dir={inputDir || "ltr"}
        placeholder={placeholder}
        type={type}
        className="form-control"
        value={value||""}
        name={name}
        required={requiredFields.includes(name)}
        onChange={(e) => fn(name, e.target.value)}
      />
    </div>
  );
};

export default DashboardInput;
