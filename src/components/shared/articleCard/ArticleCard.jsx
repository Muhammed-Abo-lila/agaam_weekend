import Button from "../button/Button";
import DeleteLayout from "../deleteLayout/DeleteLayout";
import { useState } from "react";
import { fetchToDeleteData } from "../../../helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditLayout from "../editLayout/EditLayout";
import Link from "next/link";
const ArticleCard = ({ article,t,lang,type }) => {
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
    <div className="col-sm-6 h-100">
      <div className="card">
        <div className="row g-0 flex-column flex-lg-row h-100">
          <div className="col col-lg-5">
            <img
              src={article?.cover_img}
              alt="Card"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col col-lg-7">
            <div className="card-body py-3 px-2 d-flex flex-column justify-content-between align-items-start h-100">
              <div>
                <h5
                  className="card-title text-capitalize"
                  style={{ fontSize: "calc(var(--font-size-base) + 0.1rem)" }}
                >
                  {lang == "ar" ? article?.title_ar : article?.title_en}
                </h5>
                <p
                  className="card-text mt-2"
                  style={{
                    fontSize: "calc(var(--font-size-base) - 0.2rem)",
                    minHeight: "50%",
                  }}
                >
                  {lang == "ar" ? article?.desc_ar : article?.desc_en}
                </p>
              </div>
              <div
                className="artical-footer d-flex justify-content-between align-items-center w-100"
                style={{ fontSize: "calc(var(--font-size-base) - 0.2rem)" }}
              >
                {lang == "en" && article?.title_en && article?.desc_ar && (
                  <span>متاح بالعربيه</span>
                )}
                {lang == "ar" && article?.title_en && article?.desc_en && (
                  <span>available in english</span>
                )}
                {type == "dashboard" && (
                  <div className="d-flex justify-content-center align-items-center gap-3 pointer">
                    <Button
                      text={t.edit}
                      fn={() => setShowEditPopup(true)}
                    />
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
      {/* {showDeletePopup && (
        <DeleteLayout
          title={lang == "ar" ? article?.title_ar : article?.title_en}
          deleteFn={deleteArticle}
          backFn={() => setShowDeletePopup(false)}
        />
      )} */}
      {/* {showEditPopup && (
        <EditLayout
          articleID={article?.id}
          backFn={() => setShowEditPopup(false)}
        />
      )} */}
    </div>
  );
};

export default ArticleCard;
