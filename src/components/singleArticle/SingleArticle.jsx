"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
import EmptyContent from "../shared/emptyContent/EmptyContent";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArticleFooterCard from "./subSections/articleFooterCard/ArticleFooterCard";
import useHomeHook from "@/hooks/useHomeHook";
import "./singleArticle.css";
const SingleArticle = ({ articleID, t, lang }) => {
  const [
    singleArticleData,
    isLoading,
    isError,
    error,
    articleCardRef,
    isArabic,
  ] = useSingleArticleHook(articleID, lang);
  const [articlesData] = useHomeHook();
  if (!isLoading && singleArticleData == undefined) {
    notFound();
  }
  if (isLoading) return <Loading />;
  if (isError) return <div>error: {error}</div>;
  const articleUrl = `${process.env.NEXT_PUBLIC_DEPLOY_DOMAIN_URL}/${lang}/article/${articleID}`;
  const linksData = [
    {
      to: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        articleUrl
      )}`,
      title: "Share on X",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          fill="currentColor"
          width="22"
          height="22"
        >
          <path d="M85.4 20H99L70.6 53.4 104 100H75.8L55.5 72.2 31.3 100H18.1L48.1 64.2 16 20h29l18.8 25.5L85.4 20ZM80.2 92h7.1L40 27.2h-7.5L80.2 92Z" />
        </svg>
      ),
    },
    {
      to: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        articleUrl
      )}`,
      title: "Share on linked in",
      logo: (
        <svg
          fill="none"
          height="22"
          viewBox="0 0 16 16"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
            fill="#0A66C2"
          ></path>
        </svg>
      ),
    },
    {
      to: `https://wa.me/?text=${encodeURIComponent(articleUrl)}`,
      title: "Share on whats app",
      logo: (
        <svg
          fill="#25D366"
          height="25"
          stroke="#25D366"
          strokeWidth="0.00024"
          viewBox="0 0 24 24"
          width="23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path>
        </svg>
      ),
    },
    {
      to: `mailto:?subject=Argaam Weekend |${
        isArabic
          ? singleArticleData?.meta_data_title_ar
          : singleArticleData?.meta_data_title_en
      }&body=Check this out:${encodeURIComponent(articleUrl)}`,
      title: "Share on email",
      logo: (
        <svg
          fill="#000000"
          height="18"
          role="img"
          stroke="#000000"
          strokeWidth="0.00024"
          viewBox="-1.2 -1.2 26.4 26.4"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12"></path>
        </svg>
      ),
    },
  ];
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      alert("Link copied succefully");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };
  return (
    <div className="single-article">
      {singleArticleData && (
        <>
          {(isArabic && !singleArticleData?.article_data_ar) ||
          (!isArabic && !singleArticleData?.article_data_en) ? (
            <EmptyContent text={t.no_article_lang} />
          ) : (
            <>
              <article className="article-card border-dashed">
                <div className="article-head border-dashed">
                  <div className="image-container">
                    <Image
                      src={singleArticleData?.meta_data_image_url}
                      alt={
                        isArabic
                          ? singleArticleData?.article_data_ar
                          : singleArticleData?.article_data_en
                      }
                      fill
                      quality={100}
                      property="1"
                    />
                    <div className="image-layer">
                      <h2>
                        {isArabic
                          ? singleArticleData?.meta_data_title_ar
                          : singleArticleData?.meta_data_title_en}
                      </h2>
                    </div>
                  </div>
                  <div
                    className="footer d-flex justify-content-between align-items-center p-2"
                    dir="ltr"
                  >
                    <div className="article-links d-flex justify-content-center align-items-center">
                      <p className="text-capitalize mb-0 me-2">share:</p>
                      <ul className="list-unstyled d-flex justify-content-center align-items-center gap-2 mb-0">
                        {linksData &&
                          linksData?.map((link, idx) => (
                            <li key={idx}>
                              <Link
                                href={link?.to}
                                title={link?.title}
                                target="_blank"
                              >
                                {link?.logo}
                              </Link>
                            </li>
                          ))}

                        <li onClick={copyLink} className="cursor-pointer">
                          <svg
                            fill="none"
                            height="18px"
                            stroke="#ffffff"
                            strokeWidth="0.00016"
                            transform="rotate(45)"
                            viewBox="0 0 16.00 16.00"
                            width="30px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="0.48"
                            >
                              <path
                                d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"
                                fill="#000000"
                              ></path>
                              <path
                                d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"
                                fill="#000000"
                              ></path>
                              <path
                                d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"
                                fill="#000000"
                              ></path>
                            </g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"
                                fill="#000000"
                              ></path>
                              <path
                                d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"
                                fill="#000000"
                              ></path>
                              <path
                                d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"
                                fill="#000000"
                              ></path>
                            </g>
                          </svg>
                        </li>
                      </ul>
                    </div>
                    <Link
                      href="https://www.argaam.com/en/newsletters"
                      target="_blank"
                      className="text-capitalize"
                      style={{ color: "var(--links-color)" }}
                    >
                      subscribe
                    </Link>
                  </div>
                </div>
                <div
                  ref={articleCardRef}
                  dangerouslySetInnerHTML={{
                    __html: isArabic
                      ? singleArticleData?.article_data_ar
                      : singleArticleData?.article_data_en,
                  }}
                />
              </article>
              <div className="single-article-footer">
                {articlesData && articlesData?.length > 1 && (
                  <>
                    <h4 className="border-dashed text-capitalize py-3 fs-5">
                      {t.more_this_week}
                    </h4>
                    {articlesData
                      ?.filter(
                        (article) => article?.id !== singleArticleData?.id
                      )
                      .slice(0, 2)
                      ?.map((article, idx) => (
                        <ArticleFooterCard
                          key={idx}
                          isArabic={isArabic}
                          t={t}
                          article={article}
                        />
                      ))}
                  </>
                )}
                <div className="links text-center py-3 border-dashed">
                  <div className="social d-flex justify-content-center align-items-center gap-4">
                    <Link href="https://x.com/ArgaamPlus" target="_blank">
                      <Image
                        src="https://image.s4.exct.net/lib/fe911573736c007d7d/m/2/c9c9fb8c-6cf8-4758-9cd8-0eb9ecef280d.png"
                        width={30}
                        height={30}
                        alt="argaam x"
                      />
                    </Link>
                    <Link
                      href="https://www.facebook.com/argaamplus/"
                      target="_blank"
                    >
                      <Image
                        src="https://image.s4.exct.net/lib/fe911573736c007d7d/m/2/24b84e22-8d38-4d6c-98db-80812ca4de5f.png"
                        width={30}
                        height={30}
                        alt="argaam facebook"
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/argaam-fz-llc"
                      target="_blank"
                    >
                      <Image
                        src="https://image.s4.exct.net/lib/fe911573736c007d7d/m/2/44cae9a3-eba9-48b9-911b-705f7777cd0e.png"
                        width={30}
                        height={30}
                        alt="argaam linked in"
                      />
                    </Link>
                  </div>
                  <div className="download mt-4">
                    <span
                      className="text-capitalize"
                      style={{ fontSize: "13px", fontWeight: "600" }}
                    >
                      download our app
                    </span>
                    <div className=" d-flex justify-content-center align-items-center gap-3 mt-2">
                      <Link
                        href="https://apps.apple.com/us/app/argaam-%D8%A3%D8%B1%D9%82%D8%A7%D9%85/id412588115"
                        target="_blank"
                      >
                        <Image
                          src="https://image.email.argaam.com/lib/fe3811737364047f751675/m/1/69d34561-2586-40fd-a9d9-102719246b8d.png"
                          width={140}
                          height={40}
                          alt="argaam apple store"
                        />
                      </Link>

                      <Link
                        href="https://play.google.com/store/apps/details?id=com.argaam"
                        target="_blank"
                      >
                        <Image
                          src="https://image.email.argaam.com/lib/fe3811737364047f751675/m/1/7adcd2cf-5d3b-4b04-9f9e-483bbd395b94.png"
                          width={140}
                          height={40}
                          alt="argaam google play"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center" style={{ fontSize: "14px" }}>
                  Argaam.com Copyright © 2025, Argaam Investment, All Rights
                  Reserved
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SingleArticle;
