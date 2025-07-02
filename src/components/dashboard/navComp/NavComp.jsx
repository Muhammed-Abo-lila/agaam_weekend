const NavComp = ({ articlesData, t, activeTab,setActiveTab }) => {
  return (
    <ul className="list-unstyled d-flex start-0 border-bottom">
      <li
        className={`fw-medium px-4 py-1 text-capitalize cursor-pointer ${activeTab=="add"&&"active-tab"}`}
        onClick={() => setActiveTab("add")}
      >
        {t.add}
      </li>
      {articlesData && articlesData?.length > 0 && (
        <li
        className={`fw-medium px-4 py-1 text-capitalize cursor-pointer ${activeTab=="edit"&&"active-tab"}`}
          onClick={() => setActiveTab("edit")}
        >
          {t.edit}
        </li>
      )}
    </ul>
  );
};
export default NavComp;
