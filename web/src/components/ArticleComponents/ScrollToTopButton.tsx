import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);

    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded shadow ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
};

export default ScrollToTopButton;
