import { useEffect, useState } from "react";

export default function useHorizontalScroll(elem, scrollDistance) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    elem.current.addEventListener("scroll", () => {
      setScrolled(elem.current.scrollLeft);
    });
  }, []);

  useEffect(() => {
    elem.current.scrollWidth - 10 >= elem.current.offsetWidth + scrolled
      ? setCanScrollRight(true)
      : setCanScrollRight(false);

    elem.current.scrollLeft <= 0
      ? setCanScrollLeft(false)
      : setCanScrollLeft(true);
  }, [elem, scrolled]);

  const scrollLeft = () => {
    elem.current.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    elem.current.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
}
