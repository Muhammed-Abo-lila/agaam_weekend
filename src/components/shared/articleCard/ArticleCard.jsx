import Button from "../button/Button";
import Link from "next/link";
import DeleteLayout from "../deleteLayout/DeleteLayout";
import EditLayout from "../editLayout/EditLayout";
import useArticleCardHook from "@/hooks/useArticleCardHook";
const ArticleCard = ({ article, t, lang, type }) => {
  const [
    isArabic,
    showDeletePopup,
    setShowDeletePopup,
    showEditPopup,
    setShowEditPopup,
    deleteArticle,
  ] = useArticleCardHook(article?.id, lang);
  const title = isArabic
    ? article?.meta_data_title_ar
    : article?.meta_data_title_en;
  const desc = isArabic
    ? article?.meta_data_desc_ar
    : article?.meta_data_desc_en;
  return (
    <div className="col-sm-6">
      <div className="card h-100 position-relative overflow-hidden" style={{ minHeight: "160px" }}>
        <span className="article-number position-absolute top-0 end-0 d-flex justify-content-center align-items-center bg-black" style={{width:"30px",height:"30px",color:"var(--identity-color)"}}>{article?.article_number}</span>
        <div className="row g-0 flex-column flex-lg-row h-100">
          <div className="col col-lg-4">
            <img
              src={article?.meta_data_image_url}
              alt={title}
              className="card-img-top h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col col-lg-8">
            <div className="card-body py-3 px-2 d-flex flex-column justify-content-between align-items-start h-100">
              <div>
                <h5
                  className="card-title text-capitalize"
                  style={{
                    fontSize: "calc(var(--font-size-base) + 0.1rem)",
                  }}
                >
                  {title?.length > 35 ? title?.slice(0, 35) + "..." : title}
                </h5>
                <p
                  className="card-text mt-2"
                  style={{
                    fontSize: "calc(var(--font-size-base) - 0.2rem)",
                    minHeight: "50%",
                  }}
                >
                  {desc?.length > 150 ? desc?.slice(0, 150) + "..." : desc}
                </p>
              </div>
              <div
                className="artical-footer d-flex justify-content-between align-items-center w-100 mt-3"
                style={{
                  fontSize: "calc(var(--font-size-base) - 0.2rem)",
                }}
              >
                <span style={{ minWidth: "70px" }}>
                  {!isArabic && article?.article_data_ar && "متاح بالعربيه"}
                  {isArabic &&
                    article?.article_data_en &&
                    "available in english"}
                </span>
                {type == "dashboard" && (
                  <div className="d-flex justify-content-center align-items-center gap-3 pointer">
                    <Button text={t.edit} fn={() => setShowEditPopup(true)} />
                    <Button
                      text={t.delete}
                      fn={() => setShowDeletePopup(true)}
                    />
                  </div>
                )}
                <Link
                  rel="preload"
                  className="text-decoration-none"
                  href={`/${lang}/article/${article?.id}`}
                >
                  <Button text={t.more} type="submit"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <DeleteLayout
          title={
            isArabic ? article?.meta_data_title_ar : article?.meta_data_title_en
          }
          t={t}
          deleteFn={deleteArticle}
          backFn={() => setShowDeletePopup(false)}
        />
      )}
      {showEditPopup && (
        <EditLayout
          articleID={article?.id}
          t={t}
          lang={lang}
          backFn={() => setShowEditPopup(false)}
        />
      )}
    </div>
  );
};

export default ArticleCard;
