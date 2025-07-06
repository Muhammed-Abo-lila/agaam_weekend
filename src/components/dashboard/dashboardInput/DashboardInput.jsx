const DashboardInput = ({
  placeholder,
  fn,
  name,
  value,
  inputDir,
  type,
  classes,
}) => {
  return (
    <div className={`mb-3 ${classes}`}>
      <input
        dir={inputDir || "ltr"}
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
