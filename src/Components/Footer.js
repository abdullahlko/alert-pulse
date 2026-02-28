import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white border-t border-blue-400">
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

        {/* copyright note*/}
        <div className="text-xs md:text-sm text-white/80 text-center md:text-left">
          © {new Date().getFullYear()} All rights reserved.
        </div>

        {/* LinkedIn / About Developer */}
        <div className="flex items-center space-x-2 justify-center">
          <LinkedInIcon className="hover:text-white transition duration-200" fontSize="small" />
          <a
            href="https://www.linkedin.com/in/abdullahlko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base underline hover:text-white transition duration-200"
          >
            About the Developer
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;