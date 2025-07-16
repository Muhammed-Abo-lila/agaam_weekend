"use client";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "@/components/shared/loading/Loading";
import ArticleCard from "../shared/articleCard/ArticleCard";
import EmptyContent from "../shared/emptyContent/EmptyContent";
const HomeComp = ({ t, lang }) => {
  const isArabic = lang == "ar";
  const [articlesData, isLoading, isError, error] = useHomeHook();
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  return (
    <section className="articles" dir={lang == "ar" ? "rtl" : "ltr"}>
      <div
        className="container pb-3 shadow-sm mt-3"
        style={{ minHeight: "90vh", maxWidth: "var(--section-max-width)" }}
      >
        {articlesData && articlesData?.length > 0 ? (
          <div className="row g-2">
            {articlesData?.map((article) => {
              const isValidArticle =
                (isArabic &&
                  article?.article_data_ar &&
                  article?.meta_data_title_ar &&
                  article?.meta_data_desc_ar) ||
                (!isArabic &&
                  article?.article_data_en &&
                  article?.meta_data_title_en &&
                  article?.meta_data_desc_en);

              return isValidArticle ? (
                <ArticleCard
                  key={article.id}
                  article={article}
                  t={t}
                  lang={lang}
                />
              ) : null;
            })}
          </div>
        ) : (
          <EmptyContent text={t.no_details} />
        )}
      </div>
    </section>
  );
};

export default HomeComp;
