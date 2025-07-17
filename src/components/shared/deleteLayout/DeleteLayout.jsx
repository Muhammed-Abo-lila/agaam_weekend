import Button from "../button/Button";
import LayoutContainer from "../layoutContainer/LayoutContainer";
const DeleteLayout = ({ title, t, deleteFn, backFn }) => {
  return (
    <LayoutContainer>
      <div
        className="p-5 rounded-2"
        style={{ backgroundColor: "var(--white-color)", maxWidth:"500px"}}
      >
        <h3 className="text-capitalize" style={{fontSize:"16px"}}>
          {t.delete_article}: <span  className="fw-normal" style={{fontSize:"14px"}}>{title}</span>
        </h3>
        <div className="buttons d-flex justify-content-center align-items-center gap-2 mt-5">
          <Button text={t.ok} fn={deleteFn} />
          <Button text={t.back} fn={backFn} />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default DeleteLayout;
