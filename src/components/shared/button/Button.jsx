const Button = ({ text, type, fn }) => {
  return (
    <>
      {type == "submit" ? (
        <button
          role="button"
          className="button btn text-capitalize m-auto"
          style={{ width: "98%", minWidth: "70px" }}
        >
          {text}
        </button>
      ) : (
        <div
          role="button"
          className="button btn text-capitalize m-auto"
          style={{ width: "98%", minWidth: "70px" }}
          onClick={() => fn()}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Button;
