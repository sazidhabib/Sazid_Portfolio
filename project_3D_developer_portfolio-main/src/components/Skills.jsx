import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { skills } from "../constants/Constants";

const SkillCard = ({ skill, index }) => {
  return (
    <Tilt
      options={{
        max: 25,
        scale: 1,
        speed: 450,
      }}
      className="w-full max-w-[500px] bg-[rgba(17,25,40,0.83)] border border-[rgba(255,255,255,0.125)] shadow-[0_4px_24px_rgba(23,92,230,0.15)] rounded-lg p-[18px_36px]"
    >
      <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
        <div>
          <h3 className="text-lg font-semibold mb-6 text-center text-white">
            {skill.title}
          </h3>
          {/* Inside div */}
          <div className="flex justify-center flex-wrap gap-3 mb-5">
            {skill.skills.map((item, itemIndex) => (
              <div
                key={`skill-item-${itemIndex}`}
                className="flex items-center space-x-3 bg-gray-900 p-2 border border-[rgba(255,255,255,0.125)] rounded-md hover:bg-gray-700 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-gray-300 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const skill = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Here are some of my skills on which I have been working for the past 1
          years.
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills</h2>
      </motion.div>

      <section id="skills" className="pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="mt-20 flex flex-wrap gap-10 justify-center">
            {skills.map((skill, index) => (
              <SkillCard key={`skill-${index}`} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionWrapper(skill, "project");
