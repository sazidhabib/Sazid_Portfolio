import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

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
          <h3 className="text-lg font-semibold text-white md:text-sm">
            {experience?.role}
          </h3>
          <p className="text-sm font-medium text-gray-400 md:text-xs">
            {experience?.company}
          </p>
          <p className="text-xs font-normal text-gray-500 md:text-[10px]">
            {experience?.date}
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-4 text-sm text-white md:text-xs">
        {experience?.desc && <p>{experience.desc}</p>}

        {experience?.skills && (
          <div className="mt-2">
            <p className="font-bold text-white mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
                >
                  &nbsp;.{skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
