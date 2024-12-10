import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Mahbub Sazid Habib. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/sazidhabib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mahabub-sazid-habib-ba4754168/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xl"
          >
            <FaLinkedin />
          </a>

          {/* Email */}
          <a
            href="mailto:mahabubsazid88@gmail.com"
            className="text-gray-400 hover:text-white text-xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
