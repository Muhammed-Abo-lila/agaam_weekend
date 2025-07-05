import Button from "../button/Button";
import { useState } from "react";
import { fetchToDeleteData } from "../../../helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import DeleteLayout from "../deleteLayout/DeleteLayout";
import EditLayout from "../editLayout/EditLayout";
const ArticleCard = ({ article, t, lang, type }) => {
  const isArabic = lang == "ar";
  const queryClient = useQueryClient();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  // delete article
  const deleteMutation = useMutation({
    mutationFn: () => fetchToDeleteData("articals", article?.id),
    onSuccess: () => {
      setShowDeletePopup(false);
      queryClient.invalidateQueries(["articles"]);
    },
  });
  const deleteArticle = () => {
    deleteMutation.mutate();
  };
  return (
    <div className="col-sm-6">
      <div className="card h-100">
        <div className="row g-0 flex-column flex-lg-row h-100">
          <div className="col col-lg-4">
            <img
              src={article?.meta_data_image_url}
              alt={
                isArabic ? article?.meta_data_title_ar : article?.meta_data_title_en
              }
              className="card-img-top h-100"
            />
          </div>
          <div className="col col-lg-8">
            <div className="card-body py-3 px-2 d-flex flex-column justify-content-between align-items-start h-100">
              <div>
                <h5
                  className="card-title text-capitalize"
                  style={{ fontSize: "calc(var(--font-size-base) + 0.1rem)" }}
                >
                  {isArabic
                    ? article?.meta_data_title_ar
                    : article?.meta_data_title_en}
                </h5>
                <p
                  className="card-text mt-2"
                  style={{
                    fontSize: "calc(var(--font-size-base) - 0.2rem)",
                    minHeight: "50%",
                  }}
                >
                  {(isArabic
                    ? article?.meta_data_desc_ar
                    : article?.meta_data_desc_en
                  ).slice(0, 160)}
                </p>
              </div>
              <div
                className="artical-footer d-flex justify-content-between align-items-center w-100 mt-3"
                style={{ fontSize: "calc(var(--font-size-base) - 0.2rem)" }}
              >
                {!isArabic &&
                  article?.meta_data_title_en &&
                  article?.meta_data_title_en && <span>متاح بالعربيه</span>}
                {isArabic &&
                  article?.meta_data_title_ar &&
                  article?.meta_data_title_ar && <span>available in english</span>}
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
                  className="text-decoration-none"
                  href={`/${lang}/article/${article?.id}`}
                >
                  <Button text={t.more} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <DeleteLayout
          title={isArabic ? article?.meta_data_title_ar : article?.meta_data_title_en}
          t={t}
          deleteFn={deleteArticle}
          backFn={() => setShowDeletePopup(false)}
        />
      )}
      {showEditPopup && (
        <EditLayout
          articleID={article?.id}
          t={t}
          backFn={() => setShowEditPopup(false)}
        />
      )}
    </div>
  );
};

export default ArticleCard;
