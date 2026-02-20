import React from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "../assets/logo.png";

const Header = ({ showViewTimetableButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between py-4 px-5">

        {/* Logo + App Name + Tagline */}
        <div
          className="flex flex-col md:flex-row items-center md:space-x-3 cursor-pointer text-center md:text-left mb-3 md:mb-0"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-14 h-14" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white leading-none">
                TimetablePulse
              </span>
              <span className="text-sm text-white/80 mt-1">
                Manage your weekly class schedule effortlessly
              </span>
            </div>
          </div>
        </div>

        {/* "Open Timetable" button is shown only if the prop is true */}
        {showViewTimetableButton && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/timetable")}
              className="flex items-center justify-center w-[230px] h-[46px] bg-white text-blue-500 rounded hover:bg-gray-100 transition"
            >
              <VisibilityIcon sx={{ fontSize: 28 }} />
              <span className="ml-3 font-medium">Open Timetable</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
