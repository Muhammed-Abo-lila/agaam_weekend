import SingleArticle from "@/components/singleArticle/SingleArticle";
import { fetchToGetData } from "@/helpers/fetcher";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { getDictionary } from "../../dictionaries";
export async function generateMetadata({ params }) {
  const { articleID, lang } = await params;
  const isArabic=lang==="ar";
  const articleData = await fetchToGetData("articals", articleID);
  const title =
    isArabic ? articleData.meta_data_title_ar : articleData.meta_data_title_en;
  const description =
    isArabic ? articleData.meta_data_desc_ar : articleData.meta_data_desc_en;
  const image = articleData?.meta_data_image_url;
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${lang}/artical/${articleID}`;
  return {
    title: title,
    description: description,
    other: {
      lang: isArabic?"ar":"en",
      dir: isArabic?"ltr":"rtl"
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "https://agaam-weekend.vercel.app",
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
      title: title,
      description: description,
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
      "og:site_name": "https://agaam-weekend.vercel.app",
    },
  };
}

const SingleArtical = async ({ params }) => {
  const { articleID, lang } = await params;
  const t = await getDictionary(lang);
  return (
    <section
      className="container-lg py-2"
      style={{ maxWidth: "var(--section-max-width)" }}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <div
        className="header d-flex justify-content-between align-items-center  border-1 border-black mb-3 pb-2"
        style={{ borderBottomStyle: "dotted" }}
      >
        <h1 className="title d-flex gap-2 fs-4">
          <span style={{ color: "var(--identity-color)" }}>{t.argaam}</span>
          <span>{t.weekend}</span>
        </h1>
        {/* <div className="d-flex gap-3">
          <span>{lang == "ar" ? "english" : "العربية"}</span>
          <span>
            <IoMoon />
            <IoSunnyOutline />
          </span>
        </div> */}
      </div>

      <SingleArticle articleID={articleID} lang={lang} />
    </section>
  );
};

export default SingleArtical;
