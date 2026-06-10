import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiImage,
  FiPlay,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { styles } from "../styles";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) {
      const timer = setTimeout(() => navigate("/", { replace: true }), 3000);
      return () => clearTimeout(timer);
    }
  }, [project, navigate]);

  if (!project) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-slate-400">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  const media = project.media || [{ type: "image", src: project.image }];
  const hasMultiple = media.length > 1;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <div className="bg-primary min-h-screen">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center fixed top-0 z-50 py-6 sm:py-8 px-4 sm:px-8"
        >
          <div className="w-full flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-8 rounded-full glass shadow-lg">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[13px] font-medium hidden sm:inline">
                Back
              </span>
            </button>

            <Link
              to="/"
              className="text-white font-bold cursor-pointer tracking-tight text-base"
            >
              Sazid<span className="text-accent">.</span>Habib
            </Link>

            <div className="w-16 sm:w-20" />
          </div>
        </motion.nav>

        <div className="pt-32 sm:pt-40 pb-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeIn("up", "spring", 0.1, 0.75)}
              initial="hidden"
              animate="show"
              className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card glow-border group"
            >
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={hasMultiple}
                pagination={{ clickable: true, enabled: hasMultiple }}
                autoplay={
                  hasMultiple
                    ? { delay: 5000, disableOnInteraction: false }
                    : false
                }
                loop={hasMultiple}
                className="w-full h-full project-media-swiper"
              >
                {media.map((item, index) => (
                  <SwiperSlide key={index} className="w-full h-full relative">
                    {item.type === "video" ? (
                      <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => openLightbox(index)}
                      >
                        <video
                          src={item.src}
                          poster={item.poster}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FiMaximize2 className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={`${project.name} screenshot ${index + 1}`}
                        className="w-full h-full object-contain cursor-pointer"
                        onClick={() => openLightbox(index)}
                      />
                    )}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md">
                      {item.type === "video" ? (
                        <><FiPlay className="w-3 h-3" /> Video</>
                      ) : (
                        <><FiImage className="w-3 h-3" /> Image</>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-24 -mt-8 relative z-10">
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          initial="hidden"
          animate="show"
          className="glass-card rounded-2xl p-6 sm:p-10 glow-border"
        >
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={`${project.id}-${tag.name}`}
                className={`text-[11px] font-mono ${tag.color} bg-white/5 px-3 py-1 rounded-full border border-white/5`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <motion.h1
            variants={textVariant()}
            className="text-white font-bold text-[32px] sm:text-[44px] md:text-[52px] tracking-tight leading-none mb-6"
          >
            {project.name}
          </motion.h1>

          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300"
            >
              <FiGithub className="w-4 h-4" />
              Source Code
            </a>
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "spring", 0.4, 0.75)}
            className="mb-10"
          >
            <h2 className="text-accent text-[11px] uppercase tracking-[0.2em] font-medium mb-4">
              Overview
            </h2>
            <p className="text-slate-300 text-[15px] leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)}>
            <h2 className="text-accent text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:bg-white/[0.04] transition-colors"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-accent" />
                  </span>
                  <span className="text-slate-300 text-[14px] leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>

            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <FiChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}

            {media.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex
                      ? "bg-accent w-6"
                      : "bg-white/40 hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {media[lightboxIndex].type === "video" ? (
                <video
                  src={media[lightboxIndex].src}
                  controls
                  autoPlay
                  poster={media[lightboxIndex].poster}
                  className="max-w-full max-h-[90vh] rounded-lg"
                  playsInline
                />
              ) : (
                <img
                  src={media[lightboxIndex].src}
                  alt={`${project.name} fullscreen ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .project-media-swiper {
          --swiper-navigation-size: 22px;
          --swiper-navigation-color: #fff;
          --swiper-pagination-color: #8b5cf6;
          --swiper-pagination-bullet-inactive-color: #fff;
          --swiper-pagination-bullet-inactive-opacity: 0.35;
        }
        .project-media-swiper .swiper-button-prev,
        .project-media-swiper .swiper-button-next {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .group:hover .project-media-swiper .swiper-button-prev,
        .group:hover .project-media-swiper .swiper-button-next {
          opacity: 1;
        }
        .project-media-swiper .swiper-button-prev::after,
        .project-media-swiper .swiper-button-next::after {
          font-size: 14px;
        }
        .project-media-swiper .swiper-pagination-bullet {
          transition: all 0.3s;
        }
        .project-media-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 4px;
        }
        .project-media-swiper .swiper-button-disabled {
          opacity: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
