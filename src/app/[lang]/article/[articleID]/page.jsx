import SingleArticle from "@/components/singleArticle/SingleArticle";
import { fetchToGetData } from "@/helpers/fetcher";
export async function generateMetadata({ params }) {
  const { articleID, lang } = await params;
  const articleData = await fetchToGetData("articals", articleID);
  console.log("articleData====================>", articleData);

  const title = lang === "en" ? articleData.title_en : articleData.title_ar;
  const description = lang === "en" ? articleData.desc_en : articleData.desc_ar;
  const image =
    "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=";
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${lang}/artical/${articleID}`;

  return {
    title: title,
    description: description,
    other: {
      lang: "ar",
      dir: "rtl",
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "frada.com.sa",
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
      "og:site_name": "frada.com.sa",
    },
  };
}

const SingleArtical = async ({ params }) => {
  const { articleID, lang } = await params;
  return <SingleArticle articleID={articleID} lang={lang} />;
};

export default SingleArtical;
