import { motion } from "framer-motion";
import { leftContentAnimation } from "../utils/motion";
import { styles } from "../styles";
import { headContentAnimation } from "../utils/motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto flex items-center flex-wrap justify-center">
      {/* Content Container */}
      <div className="flex flex-col px-6 items-center lg:flex-row gap-10 max-w-7xl my-auto mx-auto">
        {/* Bio Section */}
        <motion.div {...leftContentAnimation}>
          <div className="max-w-md mx-auto mt-10">
            {/* <div className="flex flex-col justify-center items-center">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div> */}
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm{" "}
                <span className="text-[#915EFF]">Mahabub Sazid Habib</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-secondary`}>
                Crafting responsive, user-friendly web applications with modern
                tools. Passionate about building impactful projects. Let's
                create something amazing together!
              </p>
              <a
                href="/Mahabub Sazid Habib_Resume.pdf"
                download="Mahabub Sazid Habib_Resume.pdf"
              >
                <button
                  type="button"
                  className="mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Resume
                </button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          {...headContentAnimation}
          className="xl:h-full md:h-[550px] h-[350px] flex items-center justify-center overflow-hidden relative"
        >
          {/* <img src="planet/chareacter.png" alt="" /> */}
          <div className="home__img bg-center bg-cover aspect-w-1 aspect-h-1"></div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 md:bottom-1 lg:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
