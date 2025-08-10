import { useEffect } from "react";

const useScrollTo = () =>
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

export default useScrollTo;
