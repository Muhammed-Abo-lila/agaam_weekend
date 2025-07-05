const DashboardInput = ({ placeholder, fn, name, value, inputDir,type, classes }) => {
  return (
    <div className={`mb-3 ${classes}`}>
      {/* {name.includes("desc") ? (
        <textarea
          placeholder={placeholder}
          className="form-control"
          rows="4"
          style={{ minHeight: "150px", maxHeight: "150px" }}
          value={value}
          required
          onChange={(e) => {
            fn(name, e.target.value);
          }}
        ></textarea>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          className="form-control"
          accept={type == "file" ? "image/*" : ""}
          value={value}
          required={type != "url"}
          onChange={(e) =>
            fn(name, type == "file" ? e.target.files[0] : e.target.value)
          }
        />
      )} */}
      <input
      dir={inputDir||"ltr"}
        placeholder={placeholder}
        type={type}
        className="form-control"
        value={value}
        required
        onChange={(e) => fn(name, e.target.value)}
      />
    </div>
  );
};
export default DashboardInput;
