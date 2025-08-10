import React, { useState } from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`scroll-to-top fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded shadow ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      Top
    </button>
  );
}

export default ScrollToTopButton;
