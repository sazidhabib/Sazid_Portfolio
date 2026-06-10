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
    <div className="flex items-center justify-center bg-primary py-20">
      <div className="container flex flex-col items-center">
        <style>{`
          .skill-scroll { animation: skill-scroll 120s linear infinite; }
          .skill-scroll-reverse { animation: skill-scroll 80s linear infinite reverse; }
          @keyframes skill-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 1rem)); }
          }
        `}</style>

        <div className="relative w-full overflow-hidden mask-linear mb-6">
          <div className="flex space-x-4 skill-scroll whitespace-nowrap w-full">
            {[...row1, ...row1].map((el, index) => (
              <div
                key={index}
                className="flex-shrink-0 glass-cardSh rounded-lg p-3"
              >
                <img
                  src={el}
                  alt="Technology logo"
                  className="object-contain w-16 h-8 sm:w-24 sm:h-10 lg:w-28 lg:h-12"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden mask-linear">
          <div className="flex space-x-4 skill-scroll-reverse whitespace-nowrap w-full">
            {[...row1, ...row1].map((el, index) => (
              <div
                key={index}
                className="flex-shrink-0 glass-cardSh rounded-lg p-3"
              >
                <img
                  src={el}
                  alt="Technology logo"
                  className="object-contain w-16 h-8 sm:w-24 sm:h-10 lg:w-28 lg:h-12"
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
