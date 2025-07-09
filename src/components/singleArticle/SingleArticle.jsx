"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import { useRouter } from "next/navigation";
import Loading from "../shared/loading/Loading";
const SingleArticle = ({ articleID, lang }) => {
  const router = useRouter();
  const [
    singleArticleData,
    isLoading,
    isError,
    error,
    articleCardRef,
    isArabic,
  ] = useSingleArticleHook(articleID, lang);
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  if (isArabic && singleArticleData?.article_data_ar == "") {
    router.replace(`/${lang}`);
  }
  if (!isArabic && singleArticleData?.article_data_en == "") {
    router.replace(`/${lang}`);
  }
  return (
    <>
      {singleArticleData && (
        <article
          ref={articleCardRef}
          className="article-card border-0"
          dangerouslySetInnerHTML={{
            __html: isArabic
              ? singleArticleData?.article_data_ar
              : singleArticleData?.article_data_en,
          }}
        ></article>
      )}
    </>
  );
};
export default SingleArticle;