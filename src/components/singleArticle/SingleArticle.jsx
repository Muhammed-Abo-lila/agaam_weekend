"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
const SingleArticle = ({ articleID, lang }) => {
  const isArabic = lang == "ar";
  const [singleArticleData, isLoading, isError, error] =
    useSingleArticleHook(articleID);
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  const desc = (
    isArabic ? singleArticleData?.desc_ar : singleArticleData?.desc_en
  )
    ?.trim()
    .split("\n\n");
  return (
    <>
      {singleArticleData && (
        <article className="card border-0">
          <div className="image-container position-relative">
            <img
              src={singleArticleData?.art_img}
              className="card-img-top"
              alt={
                isArabic
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
              {isArabic
                ? singleArticleData?.title_ar
                : singleArticleData?.title_en}
            </h2>
          </div>
          <div className="card-body">
            <h3>
              {isArabic
                ? singleArticleData?.top_title_ar
                : singleArticleData?.top_title_en}
            </h3>
            {desc?.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
          {singleArticleData?.media_img && (
            <img
              src={singleArticleData?.media_img}
              alt={
                isArabic
                  ? singleArticleData?.title_ar
                  : singleArticleData?.title_en
              }
              loading="lazy"
              className="mb-3"
            />
          )}
          {singleArticleData?.iframe && (
            <iframe
              src={singleArticleData?.iframe}
              style={{ width: "100%", height: "550px" }}
            ></iframe>
          )}
        </article>
      )}
    </>
  );
};
export default SingleArticle;
