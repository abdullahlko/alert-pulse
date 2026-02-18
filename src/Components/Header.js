import React from "react"
import { useNavigate } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import logo from "../assets/logo.png"

const Header = ({ variant = "home" }) => {

  const navigate = useNavigate()

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="flex items-center justify-between py-4 px-5">

        {/* Logo + App Name */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-14 h-14" />
          <span className="text-3xl font-bold text-white leading-none">
            WhatsNext
          </span>
        </div>

        {variant === "home" && (
          <div className="flex items-center space-x-4">

            {/* Open Timetable button */}
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
  )
}

export default Header
