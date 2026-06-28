import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  id,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const navigate = useNavigate();

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleCardClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        glareEnable
        glareMaxOpacity={0.18}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.02}
        transitionSpeed={1500}
        className="glass-card rounded-xl p-[1px] glow-border h-full"
      >
        <div className="bg-tertiary/50 rounded-xl p-4 h-full flex flex-col">
          <div className="relative w-full h-[120px] md:h-[200px] rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 flex justify-end m-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="glass w-9 h-9 rounded-full flex justify-center items-center cursor-pointer hover:bg-white/20 transition-colors"
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-4 h-4 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex-1 flex flex-col">
            <h3 className="text-white font-semibold text-[18px] tracking-tight">
              {name}
            </h3>
            <p className="mt-2 text-slate-400 text-[13px] leading-relaxed flex-1">
              <span className="hidden md:inline">
                {truncateText(description, 30)}
              </span>
              <span className="md:hidden">{truncateText(description, 10)}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="hidden md:flex md:flex-wrap md:gap-2">
                {tags.map((tag) => (
                  <span
                    key={`${name}-${tag.name}`}
                    className={`text-[11px] font-mono ${tag.color} bg-white/5 px-2 py-0.5 rounded`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${id}`);
                }}
                className="md:hidden text-accent text-[12px] font-medium hover:underline mt-1"
              >
                Read More →
              </button>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { projects } = usePortfolioData();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Projects</p>
        <h2 className={styles.sectionHeadText}>My Work.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-slate-400 text-[15px] max-w-3xl leading-relaxed"
      >
        Following projects showcases my skills and experience through real-world
        examples of my work. Each project is briefly described with links to
        code repositories.
      </motion.p>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "project");
