import SingleArticle from "@/components/singleArticle/SingleArticle";
import { fetchToGetData } from "@/helpers/fetcher";
export async function generateMetadata({ params }) {
  const { articleID, lang } = await params;
  const isArabic = lang === "ar";
  const articleData = await fetchToGetData("articals", articleID);
  const title = isArabic
    ? articleData.meta_data_title_ar
    : articleData.meta_data_title_en;
  const description = isArabic
    ? articleData.meta_data_desc_ar
    : articleData.meta_data_desc_en;
  const image = articleData?.meta_data_image_url;
  const url = `${process.env.NEXT_PUBLIC_DEPLOY_DOMAIN_URL}/${lang}/artical/${articleID}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "agaam-weekend.vercel.app",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:url": url,
      "og:type": "website",
      "og:site_name": "agaam-weekend.vercel.app",
      lang: isArabic ? "ar" : "en",
      dir: isArabic ? "ltr" : "rtl",
    },
  };
}
const SingleArtical = async ({ params }) => {
  const { articleID, lang } = await params;
  return (
    <section
      className="container-lg py-2"
      style={{ maxWidth: "var(--single-article-max-width)" }}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <SingleArticle articleID={articleID} lang={lang} />
    </section>
  );
};

export default SingleArtical;
