const NavComp = ({ articlesData }) => {
  return (
    <ul
      className="nav nav-tabs position-absolute d-flex start-0"
      id="tabs"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active fw-medium px-4 py-1 text-capitalize"
          id="add-tab"
          data-bs-toggle="tab"
          data-bs-target="#add"
          type="button"
          role="tab"
          aria-controls="add"
          aria-selected="true"
        >
          {t("add")}
        </button>
      </li>
      {articlesData && articlesData?.length > 0 && (
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fw-medium px-4 py-1 text-capitalize"
            id="edit-tab"
            data-bs-toggle="tab"
            data-bs-target="#edit"
            type="button"
            role="tab"
            aria-controls="edit"
            aria-selected="false"
          >
            {t("edit")}
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavComp;
