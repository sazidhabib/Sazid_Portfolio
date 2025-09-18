import React from "react";
import {
  htmlnew,
  cssnew,
  javascriptnew,
  postman,
  react,
  reduxnew,
  typescriptnew,
  tailwindcss,
  Figma,
  gitnew,
  Mongodb,
  nodejsnew,
  bootstrap,
  python,
  githubnew,
  netlify,
  vscode,
  router,
} from "../assets";

const SkillShow = () => {
  const row1 = [
    htmlnew,
    cssnew,
    javascriptnew,
    postman,
    react,
    router,
    reduxnew,
    typescriptnew,
    tailwindcss,
    Figma,
    gitnew,
    Mongodb,
    nodejsnew,
    bootstrap,
    python,
    githubnew,
    netlify,
    vscode,
  ];

  return (
    <div className="flex items-center justify-center bg-primary p-12">
      <div className="container flex flex-col items-center">
        <style>
          {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% - 1rem));
            }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
          .animate-scroll-reverse {
            animation: scroll 40s linear infinite reverse;
          }
          .mask-linear {
            mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
          }
          `}
        </style>

        {/* First Marquee */}
        <div className="relative w-full overflow-hidden mask-linear mb-8">
          <div className="flex space-x-4 animate-scroll whitespace-nowrap w-full">
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Technology logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 p-2"
                />
              </div>
            ))}
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Technology logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 px-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Marquee */}
        <div className="relative w-full overflow-hidden mask-linear">
          <div className="flex space-x-4 animate-scroll-reverse whitespace-nowrap w-full">
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Technology logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 px-2"
                />
              </div>
            ))}
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Technology logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 px-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillShow;