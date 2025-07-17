import Button from "@/components/shared/button/Button";
import Image from "next/image";
import Link from "next/link";
const ArticleFooterCard = ({ isArabic, t, article }) => {
  return (
    <div className="footer-article-card row border-dashed py-3">
      <div className="image-container col-12 col-sm-5 col-md-3  overflow-hidden position-relative">
        <Image
          src={article?.meta_data_image_url}
          alt={isArabic ? article?.article_data_ar : article?.article_data_en}
          fill
          quality={100}
          className="rounded-3"
        />
      </div>
      <div className="footer-article-card-content col-12 col-sm-7 col-md-9">
        <h5>
          {isArabic ? article?.meta_data_title_ar : article?.meta_data_title_en}
        </h5>
        <p>
          {isArabic ? article?.meta_data_desc_ar : article?.meta_data_desc_en}
        </p>
        <div className="d-flex justify-content-end align-items-center">
          <Link
            rel="preload"
            className="text-decoration-none w-25 d-block"
            href={`/${isArabic ? "ar" : "en"}/article/${article?.id}`}
          >
            <Button text={t.more} type="submit" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleFooterCard;
