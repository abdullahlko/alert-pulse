import React from "react";
import logo from "../assets/logo.png";


const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col items-center gap-3">
        
        {/* Logo & app name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg">TimetablePulse</span>
        </div>

        {/* Small copyright note */}
        <div className="text-xs text-white/70">
          © {new Date().getFullYear()} TimetablePulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
