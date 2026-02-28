import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white border-t border-blue-400">
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

        {/* App name + copyright note*/}
        <div className="text-center md:text-left">
          <div className="text-sm font-bold text-white">TimetablePulse</div>
          <div className="text-xs text-white/80 mt-0.5">© {new Date().getFullYear()} All rights reserved.</div>
        </div>

        {/* LinkedIn / Developer */}
        <div className="flex items-center gap-1.5 justify-center">
          <LinkedInIcon fontSize="small" className="text-white/80" />
          <a
            href="https://www.linkedin.com/in/abdullahlko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/80 hover:text-white transition duration-200"
          >
           About the Developer
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;