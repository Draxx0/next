import { useEffect } from "react";

const useDetectSpace = () => {
  const handleDetectSpace = (e: any) => {
    if (e.key === " ") {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDetectSpace, false);
    return () => {
      document.removeEventListener("keydown", handleDetectSpace, false);
    };
  }, []);
};

export default useDetectSpace;
