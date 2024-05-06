import { useEffect, useRef } from "react";

const useTitle = (title) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    const prevTitle = originalTitle.current;

    if (document.title !== title) document.title = title;

    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
