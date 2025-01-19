import React from "react";
import { technologies } from "../constants";

const SkillShow = () => {
  const row1 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
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
        <h1 className="text-2xl lg:text-4xl font-semibold mb-2 text-gray-800">
          With Great Outcomes.
        </h1>
        <p className="text-gray-500 text-sm lg:text-base mb-8">
          Our customers have gotten offers from awesome companies.
        </p>

        {/* First Marquee */}
        <div className="relative w-full overflow-hidden mask-linear mb-8">
          <div className={`${marqueeGroupClass}`}>
            {technologies.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-40 h-20 mx-2 bg-gray-50 px-2"
                />
              </div>
            ))}
            {row1.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-40 h-20 mx-2 bg-gray-50 px-2"
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
            {row2.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-40 h-20 mx-2"
                />
              </div>
            ))}
            {row2.map((el, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={el}
                  alt="Company logo"
                  className="rounded-lg shadow-md object-contain w-40 h-20 mx-2"
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
