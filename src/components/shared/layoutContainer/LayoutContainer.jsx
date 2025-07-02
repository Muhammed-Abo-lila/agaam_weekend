const LayoutContainer = ({ children }) => {
  return (
    <div
      className="position-fixed top-0 bottom-0 start-0 end-0 z-1 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "var(--background-opacity)" }}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
