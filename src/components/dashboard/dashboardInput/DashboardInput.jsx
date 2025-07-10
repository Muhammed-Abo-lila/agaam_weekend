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
  t
}) => {
  const requiredFields = [
    "meta_data_title_en",
    "meta_data_desc_en",
    "meta_data_keywords_en",
    "meta_data_image_url",
    "article_number"
  ];

  return (
    <div className={`mb-3 ${classes}`}>
      <input
        dir={inputDir || "ltr"}
        placeholder={placeholder}
        type={type}
        className={`form-control ${
          isArticleNumUnique && "border border-danger"
        }`}
        value={value || ""}
        name={name}
        readOnly={readOnly}
        required={requiredFields.includes(name)}
        onChange={(e) => fn(name, e.target.value)}
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
