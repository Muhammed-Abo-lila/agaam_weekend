import { fetchToDeleteData } from "@/helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
const useArticleCardHook = (articleId,lang) => {
  const isArabic = lang == "ar";
  const queryClient = useQueryClient();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  // delete article
  const deleteMutation = useMutation({
    mutationFn: () => fetchToDeleteData("articals", articleId),
    onSuccess: () => {
      setShowDeletePopup(false);
      queryClient.invalidateQueries(["articles"]);
    },
  });
  const deleteArticle = () => {
    deleteMutation.mutate();
  };
  return [
    isArabic,
    showDeletePopup,
    setShowDeletePopup,
    showEditPopup,
    setShowEditPopup,
    deleteArticle,
  ];
};

export default useArticleCardHook;
