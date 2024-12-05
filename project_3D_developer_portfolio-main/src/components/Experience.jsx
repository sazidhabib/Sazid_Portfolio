import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { experiences } from "../constants/Constants";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          src={experience?.img}
          alt={experience?.company}
          className="rounded-full object-cover w-full h-full"
        />
      }
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 255, 255, 0.3)",
      }}
      date={experience?.date}
    >
      {/* Header Section */}
      <div className="flex gap-3">
        <img
          src={experience?.img}
          alt={experience?.company}
          className="h-12 w-12 rounded-md object-cover mt-1 md:h-10"
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-white md:text-sm">
            {experience?.role}
          </div>
          <div className="text-sm font-medium text-gray-400 md:text-xs">
            {experience?.company}
          </div>
          <div className="text-xs font-normal text-gray-500 md:text-[10px]">
            {experience?.date}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-4 text-sm text-white md:text-xs">
        {experience?.desc && (
          <ul className="mt-5 list-disc ml-5 space-y-2">
            {experience.desc.map((item, index) => (
              <li
                key={`experience-desc-${index}`}
                className="text-white-100 text-[14px] pl-1 tracking-wider"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {experience?.skills && (
          <div className="mt-2 flex gap-2">
            <b className="font-bold text-white text-xs mb-1">Skills:</b>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
                >
                  &nbsp;{skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
