const DashboardInput = ({ label, fn, name, value, type }) => {
  return (
    <div className="mb-3">
      <label className="form-label text-capitalize">{label}</label>
      {name.includes("desc") ? (
        <textarea
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
          type={type}
          className="form-control"
          accept={type == "file" ? "image/*" : ""}
          value={value}
          required={type != "url"}
          onChange={(e) =>
            fn(name, type == "file" ? e.target.files[0] : e.target.value)
          }
        />
      )}
    </div>
  );
};
export default DashboardInput;
