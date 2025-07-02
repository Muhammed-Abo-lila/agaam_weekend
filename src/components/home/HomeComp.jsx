"use client";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "@/components/shared/loading/Loading";
import ArticleCard from "../shared/articleCard/ArticleCard";
import EmptyContent from "../shared/emptyContent/EmptyContent";
const HomeComp = ({ t, lang }) => {
  const [articlesData, isLoading, isError, error] = useHomeHook();
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  return (
    <section className="arricles" dir={lang == "ar" ? "rtl" : "ltr"}>
      <div
        className="container py-3 shadow-sm mt-3"
        style={{ minHeight: "90vh", maxWidth: "1100px" }}
      >
        {articlesData && articlesData?.length > 0 ? (
          <div className="row g-2">
            {articlesData?.map((article) => (
              <ArticleCard
                key={article?.id}
                article={article}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <EmptyContent text={t.no_details} />
        )}
      </div>
    </section>
  );
};

export default HomeComp;
