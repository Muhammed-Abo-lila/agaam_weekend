"use client"
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
const SingleArticle = ({ articleID,lang }) => {
  const [singleArticleData, isLoading, isError, error] =
    useSingleArticleHook(articleID);
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  const image =
    "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=";
  return (
    <section
      className="container-lg py-2"
      style={{ maxWidth: "var(--section-max-width)" }}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      {singleArticleData && (
        <article className="card border-0">
          <div className="image-container position-relative">
            <img
              src={image}
              className="card-img-top"
              alt={
                lang == "ar"
                  ? singleArticleData?.title_ar
                  : singleArticleData?.title_en
              }
              loading="lazy"
            />
            <h2
              className="h5 fw-bold position-absolute bottom-0 top-50 start-0 end-0 text-center mb-0 d-flex justify-content-center align-items-center"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 1) 0.5%, rgba(255, 255, 255, 0))",
                color: "var(--white-color)",
              }}
            >
              {lang == "ar"
                ? singleArticleData?.title_ar
                : singleArticleData?.title_en}
            </h2>
          </div>
          <div className="card-body">
            <p className="card-text">
              {lang == "ar"
                ? singleArticleData?.desc_ar
                : singleArticleData?.desc_en}
            </p>
            {lang == "en" && singleArticleData?.link_en && (
              <a
                href={singleArticleData?.link_en}
                className="btn btn-outline-primary d-block"
                target="_blank"
              >
                {singleArticleData?.link_en}
              </a>
            )}
            {lang == "ar" && singleArticleData?.link_ar && (
              <a
                href={singleArticleData?.link_ar}
                className="btn btn-outline-primary d-block"
                target="_blank"
              >
                {singleArticleData?.link_ar}
              </a>
            )}
          </div>
        </article>
      )}
    </section>
  );
};
export default SingleArticle;