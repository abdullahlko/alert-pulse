import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import ClassCard from "../Components/ClassCard";
import Footer from "../Components/Footer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { days, periodTimes } from "../constants/timetable";

const Home = () => {
  const navigate = useNavigate();

  // Manages current class index, next class index and timer text
  const [currentIndex, setCurrentIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);
  const [timerText, setTimerText] = useState("");

  // Uses saved timetable if available, otherwise creates a default empty structure
  const timetable =
    JSON.parse(localStorage.getItem("timetable")) ||
    days.map(() =>
      Array(periodTimes.length)
        .fill(0)
        .map(() => ({ subject: "", room: "" }))
    );

  // Determines which day's schedule should be shown
  const todayIndex = new Date().getDay() === 0 ? 0 : new Date().getDay() - 1;
  const todayRow = timetable[todayIndex] || [];

  // Keeps only periods that have subject or room filled
  const existingPeriods = todayRow
    .map((p, idx) => ({ ...p, periodIndex: idx }))
    .filter((p) => p.subject || p.room);

  // Total number of classes scheduled for today
  const totalClassesToday = existingPeriods.length;

  // Used to decide whether to show timetable UI or empty state
  const entireTimetableEmpty = timetable.every((day) =>
    day.every((p) => !p.subject && !p.room)
  );

  // Formats today's date for display
  const todayDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Converts time string into Date object for comparison
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0
    );
  };

  // Updates current class, next class, and countdown based on system time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let current = null;
      let next = null;

      for (let i = 0; i < existingPeriods.length; i++) {
        const actualIdx = existingPeriods[i].periodIndex;
        const [startStr, endStr] = periodTimes[actualIdx].split(" - ");
        const start = parseTime(startStr);
        const end = parseTime(endStr);

        if (now >= start && now < end) {
          current = i;
          next = i + 1 < existingPeriods.length ? i + 1 : null;
          break;
        } else if (now < start) {
          next = i;
          break;
        }
      }

      setCurrentIndex(current);
      setNextIndex(next);

      const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        // Hours shown only if greater than 0, minutes and seconds are padded
        return `${hrs > 0 ? `${String(hrs).padStart(2, "0")}h ` : ""}${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
      };

      if (current !== null) {
        const endTime = parseTime(
          periodTimes[existingPeriods[current].periodIndex].split(" - ")[1]
        );
        const diff = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimerText(formatTime(diff));
      } else if (next !== null) {
        const startTime = parseTime(
          periodTimes[existingPeriods[next].periodIndex].split(" - ")[0]
        );
        const diff = Math.max(0, Math.floor((startTime - now) / 1000));
        setTimerText(formatTime(diff));
      } else {
        setTimerText("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [existingPeriods]);

  const isAllClassesCompleted =
    existingPeriods.length > 0 && currentIndex === null && nextIndex === null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with "Open Timetable" button if timetable exists */}
      <Header showViewTimetableButton={!entireTimetableEmpty} />

      {/* Empty state when no timetable data exists */}
      {entireTimetableEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center px-4">
          <div>
            <p className="text-lg font-medium">No timetable data available.</p>
            <p className="text-sm mt-2">Please add your weekly timetable to get started.</p>
            {/* Add Timetable button */}
            <button
              onClick={() => navigate("/timetable")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add Timetable
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Date, title and total classes */}
          <div className="px-5 border-b flex items-center justify-between h-16 relative">
            <div className="flex items-center text-sm font-medium text-gray-700 gap-1">
              <CalendarTodayIcon fontSize="small" />
              <span>{todayDate}</span>
            </div>

            <h1 className="text-xl font-semibold text-black absolute left-1/2 -translate-x-1/2">
              Today's Classes
            </h1>

            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-blue-100 text-blue-700 font-medium text-sm px-3 py-1 rounded-full">
              <SchoolIcon fontSize="medium" />
              <span>
                {totalClassesToday} {totalClassesToday === 1 ? "class" : "classes"} today
              </span>
            </div>
          </div>

          {/* Class cards */}
          <div className="flex-1">
            <div className="px-5 py-6 flex justify-center items-start gap-8 flex-wrap">
              <ClassCard
                title="Current Class"
                periodIndex={currentIndex !== null ? existingPeriods[currentIndex].periodIndex : null}
                periodTimes={periodTimes}
                data={currentIndex !== null ? existingPeriods[currentIndex] : { subject: "", room: "" }}
                borderColor="#3B82F6"
                cardColor={currentIndex !== null ? "#DBEAFE" : "#f0f0f0"}
              />
              <ClassCard
                title="Upcoming Class"
                periodIndex={nextIndex !== null ? existingPeriods[nextIndex].periodIndex : null}
                periodTimes={periodTimes}
                data={nextIndex !== null ? existingPeriods[nextIndex] : { subject: "", room: "" }}
                borderColor="#10B981"
                cardColor={nextIndex !== null ? "#D1FAE5" : "#f0f0f0"}
              />
            </div>

            {/* Countdown timer */}
            {timerText && (
              <div className="text-center text-sm flex items-center justify-center gap-1 mt-3">
                <AccessTimeIcon fontSize="small" className="text-gray-500" />
                <span className="text-gray-600">
                  {currentIndex !== null ? "Current class ends in" : "Next class starts in"}
                </span>
                <span className={`font-semibold ${currentIndex !== null ? "text-blue-600" : "text-green-600"}`}>
                  {timerText}
                </span>
              </div>
            )}

            {existingPeriods.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No classes scheduled for today.
              </div>
            )}

            {isAllClassesCompleted && (
              <div className="text-center text-gray-500 mt-4">
                All classes for today are completed.
              </div>
            )}

            {/* Timetable table */}
            {existingPeriods.length > 0 && (
              <div className="mt-8 px-5 overflow-x-auto mb-10">
                <table className="min-w-full border border-gray-300 border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border border-gray-300">Period</th>
                      <th className="p-2 border border-gray-300">Subject</th>
                      <th className="p-2 border border-gray-300">Room</th>
                      <th className="p-2 border border-gray-300">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {existingPeriods.map((period, index) => {
                      const isCurrent = index === currentIndex;
                      const isNext = index === nextIndex;

                      return (
                        <tr
                          key={period.periodIndex}
                          className={isCurrent ? "bg-blue-100" : isNext ? "bg-green-100" : ""}
                        >
                          <td className="p-2 border border-gray-300">{period.periodIndex + 1}</td>
                          <td className="p-2 border border-gray-300">{period.subject}</td>
                          <td className="p-2 border border-gray-300">{period.room}</td>
                          <td className="p-2 border border-gray-300">{periodTimes[period.periodIndex]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;