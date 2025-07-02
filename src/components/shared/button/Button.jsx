import "./Button.css";
const Button = ({ text, type, fn }) => {
  return (
    <>
      {type == "submit" ? (
        <button
          role="button"
          className="button px-2 py-2 rounded-1 fw-bold text-center text-capitalize w-100"
        >
          {text}
        </button>
      ) : (
        <div
          role="button"
          className="button px-2 py-2 rounded-1 fw-bold text-center text-capitalize w-100"
          onClick={() => fn()}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Button;
