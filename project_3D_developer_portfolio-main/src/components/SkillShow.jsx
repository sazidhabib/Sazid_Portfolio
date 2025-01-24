import React from "react";
import { technologies } from "../constants";
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
} from "../assets";

const SkillShow = () => {
  const row1 = [
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
    htmlnew,
    cssnew,
  ];
  const technologies = [
    {
      name: "HTML 5",
      icon: htmlnew,
    },
    {
      name: "CSS 3",
      icon: cssnew,
    },
    {
      name: "JavaScript",
      icon: "https://dac.digital/wp-content/uploads/2023/11/react-logo-optimized.png",
    },
    {
      name: "TypeScript",
      icon: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    },
  ];
  const row2 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
  ];

  const marqueeGroupClass = `
    flex space-x-4 animate-scroll 
    whitespace-nowrap w-full
  `;

  return (
    <div className=" flex items-center justify-center bg-primary p-12">
      <div className="container flex flex-col items-center">
        {/* First Marquee */}
        <div className="relative w-full overflow-hidden mask-linear mb-8">
          <div className={`${marqueeGroupClass}`}>
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 p-2"
                />
              </div>
            ))}
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 px-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Marquee */}
        <div className="relative w-full overflow-hidden mask-linear">
          <div
            className={`${marqueeGroupClass} animate-scroll-reverse`}
            style={{ animationDelay: "-3s" }}
          >
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-20 h-10 sm:w-28 sm:h-14 lg:w-36 lg:h-16 xl:w-36 xl:h-16 bg-gray-50 px-2"
                />
              </div>
            ))}
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
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
