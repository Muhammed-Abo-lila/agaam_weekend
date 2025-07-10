const Button = ({ text, type, fn }) => {
  return (
    <>
      {type == "submit" ? (
        <button
          role="button"
          className="button btn text-capitalize m-auto"
          style={{width:"98%"}}
        >
          {text}
        </button>
      ) : (
        <div
          role="button"
          className="button btn text-capitalize m-auto"
          style={{width:"98%"}}
          onClick={() => fn()}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Button;
