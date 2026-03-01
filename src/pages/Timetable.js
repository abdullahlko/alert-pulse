import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { days, periodTimes, periods } from "../constants/timetable";

const BREAK_AFTER_PERIOD = 4; // break column to be inserted after period index 4 (between P4 and P5)
const BREAK_TIME = "12:20 – 12:40";

const Timetable = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Load saved timetable from localStorage or initialize as empty
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === days.length) return parsed;
      } catch {
        localStorage.removeItem("timetable");
      }
    }
    return days.map(day => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods).fill({ subject: "", room: "" });
    });
  });

  // Temporary timetable copy for editing
  const [tempTimetable, setTempTimetable] = useState([]);

  // Check if timetable is empty
  const isEmpty = table =>
    table.every(day => day.every(cell => !cell.subject && !cell.room));

  // Enable editing mode, copy current timetable to temp
  const handleEdit = () => {
    setTempTimetable(JSON.parse(JSON.stringify(timetable)));
    setIsEditing(true);
  };

  // Cancel editing and discard changes
  const handleCancel = () => setIsEditing(false);

  // Save changes and update localStorage
  const handleSave = () => {
    setTimetable(tempTimetable);
    localStorage.setItem("timetable", JSON.stringify(tempTimetable));
    setIsEditing(false);
  };

  // Update a single cell while editing
  const handleCellChange = (dayIndex, periodIndex, field, value) => {
    const updated = [...tempTimetable];
    updated[dayIndex][periodIndex] = { ...updated[dayIndex][periodIndex], [field]: value };
    setTempTimetable(updated);
  };

  // Clear all entries in temp timetable
  const handleClear = () => {
    const cleared = days.map(day => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods).fill({ subject: "", room: "" });
    });
    setTempTimetable(cleared);
  };

  // Confirm before clearing the timetable
  const handleClearClick = () => {
    if (window.confirm("This will clear the entire timetable. Continue?")) {
      handleClear();
    }
  };

  return (
    <div className="min-h-screen">
      <Header variant="timetable" />

      {/* Top bar */}
      <div className="border-b">
        <div className="relative px-5 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc]"
          >
            <ArrowBackIcon fontSize="medium" />
            <span className="text-lg">Back</span>
          </button>

          {/* Desktop buttons */}
          <div className="hidden sm:flex ml-auto gap-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearClick}
                  className={`px-4 py-1 rounded text-white ${isEmpty(tempTimetable)
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                    }`}
                  disabled={isEmpty(tempTimetable)}
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            )}
          </div>

          {/* Desktop inline title */}
          <div className="hidden sm:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-semibold underline">Weekly Timetable</h1>
          </div>
        </div>

        {/* Mobile title row */}
        <div className="sm:hidden w-full bg-gray-100  border-gray-300">
          <div className="max-w-screen-md mx-auto py-3 text-center">
            <h1 className="text-xl font-semibold underline">
              Weekly Timetable
            </h1>
          </div>
        </div>
      </div>

      {/* Timetable table */}
      <div className="mx-2 mt-[7vh] sm:mt-[3vh] mb-24 border border-black overflow-x-auto">
        <table className="w-full text-sm text-center table-fixed min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-1 text-center">Day</th>
              {periodTimes.map((time, i) => (
                <React.Fragment key={i}>
                  <th className="border px-4 py-1 whitespace-nowrap text-center">
                    P{i + 1}
                    <div className="text-[10px] text-gray-500 text-center">{time.split(" - ")[0]}</div>
                  </th>
                  {/* Break column inserted after BREAK_AFTER_PERIOD */}
                  {i === BREAK_AFTER_PERIOD - 1 && (
                    <th className="border px-2 py-1 bg-gray-100 text-gray-500 text-center align-middle">
                      Break
                    </th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day, dayIndex) => (
              <tr
                key={day}
                className={!isEditing ? "hover:bg-gray-100" : ""}
                style={{ height: "64px" }}
              >
                {/* Shortened day name */}
                <td className="border p-1 font-semibold bg-gray-50">{day.slice(0, 3)}</td>

                {(timetable[dayIndex] || []).map((_, periodIndex) => {
                  const cell = (isEditing ? tempTimetable[dayIndex] : timetable[dayIndex])?.[periodIndex] || { subject: "", room: "" };

                  return (
                    <React.Fragment key={periodIndex}>
                      <td className={`border px-4 py-1 ${isEditing ? "hover:bg-yellow-100" : ""}`}>
                        {isEditing ? (
                          <div className="flex flex-col justify-center items-center gap-1 h-full">
                            <input
                              type="text"
                              placeholder="Subject"
                              maxLength={10}
                              value={cell.subject}
                              onChange={e => handleCellChange(dayIndex, periodIndex, "subject", e.target.value)}
                              className="border text-xs p-0.5 px-1 w-full text-center min-w-[56px]"
                            />
                            <input
                              type="text"
                              placeholder="Room"
                              maxLength={5}
                              value={cell.room}
                              onChange={e => handleCellChange(dayIndex, periodIndex, "room", e.target.value)}
                              className="border text-xs p-0.5 px-1 w-full text-center min-w-[40px]"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center h-full gap-0">
                            {cell.subject && <span className="text-xs sm:text-sm">{cell.subject}</span>}
                            {cell.room && <strong className="text-xs sm:text-sm">{`[${cell.room}]`}</strong>}
                          </div>
                        )}
                      </td>
                      {/* Break cell after BREAK_AFTER_PERIOD */}
                      {periodIndex === BREAK_AFTER_PERIOD - 1 && (
                        <td className="border bg-gray-50" />
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit, Cancel, Clear, and Save buttons fixed at bottom for mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full px-2 py-2 bg-white border-t flex gap-2 z-50">
        {!isEditing ? (
          <button onClick={handleEdit} className="flex-1 bg-blue-500 text-white rounded hover:bg-blue-600 py-2 text-base">
            Edit
          </button>
        ) : (
          <>
            <button onClick={handleCancel} className="flex-1 bg-gray-300 rounded hover:bg-gray-400 py-2 text-base">
              Cancel
            </button>
            <button
              onClick={handleClearClick}
              disabled={isEmpty(tempTimetable)}
              className={`flex-1 rounded py-2 text-white text-base ${isEmpty(tempTimetable) ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
            >
              Clear
            </button>
            <button onClick={handleSave} className="flex-1 bg-green-500 text-white rounded hover:bg-green-600 py-2 text-base">
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timetable;
