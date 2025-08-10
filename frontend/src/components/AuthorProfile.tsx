import React from "react";
// import headImg from '../assets/img/head.jpeg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const AuthorProfile = () => {
  return (
    <div className="rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4 space-y-4">
      <img
        className="h-32 w-32 rounded-full object-cover"
        src={process.env.PUBLIC_URL + "assets/img/head.jpeg"}
        alt="head"
      />
      <div className="flex flex-col max-w-xl space-y-2 text-center">
        <div className="text-gray-500">Software engineer</div>
        <h2 className="text-xl font-semibold">YCChen</h2>
        <div className="leading-relaxed text-gray-800">
          I'm a software engineer with 4 years of experience. This blog
          showcases my technical knowledge.
        </div>
        <div className="justify-center space-x-2">
          <a href="https://github.com/YCChenVictor">
            <button
              className="text-black shadow-lg h-10 w-10 rounded-full"
              type="button"
            >
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </a>
          <a href="https://www.linkedin.com/in/ycchen1">
            <button
              className="text-black shadow-lg h-10 w-10 rounded-full"
              type="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
