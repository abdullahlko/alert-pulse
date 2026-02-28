import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import logo from "../assets/logo.png";

const Header = ({ showViewTimetableButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-500 shadow-md">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

        {/* Logo + App Name */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
          />
          <span className="text-base sm:text-2xl font-bold text-white tracking-tight">
            TimetablePulse
          </span>
        </div>

        {/* "Open Timetable" button is shown only if the prop is true */}
        {showViewTimetableButton && (
          <button
            onClick={() => navigate("/timetable")}
            className="flex items-center gap-2 h-11 sm:h-13 bg-white text-blue-500 rounded-full px-5 sm:px-6 hover:bg-blue-50 transition duration-200 hover:scale-105 flex-shrink-0 shadow-md"
            title="Open Weekly Timetable"
            aria-label="Open Weekly Timetable"
          >
            <CalendarMonthIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            <span className="text-sm sm:text-lg font-semibold">View</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;