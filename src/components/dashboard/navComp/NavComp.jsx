const NavComp = ({ tabsData, t, activeTab, setActiveTab, lang }) => {
  return (
    <>
      {tabsData && (
        <ul
          dir={lang == "ar" ? "rtl" : "ltr"}
          className="nav-list list-unstyled d-flex start-0 border-bottom p-0"
        >
          {tabsData?.map((tab, idx) => (
            <li
              key={idx}
              className={`fw-medium px-4 py-1 text-capitalize cursor-pointer ${
                activeTab == tab.name && "active-tab"
              }`}
              onClick={() => setActiveTab(tab?.name)}
              style={{
                width: "120px",
                marginInlineEnd: "20px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              {t[tab?.name]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default NavComp;
