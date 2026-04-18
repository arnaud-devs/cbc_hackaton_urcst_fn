import { useEffect } from "react";

const useDocumentTitle = (title: string, concatenate = true) => {
  useEffect(() => {
    const originalTitle = "HuzaCare";

    if (concatenate) {
      document.title = `${title} | ${originalTitle}`;
    } else {
      document.title = title;
    }
  }, [concatenate, title]);
};

export default useDocumentTitle;
