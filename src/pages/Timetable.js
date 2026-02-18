import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { days, periodTimes, periods } from "../constants/timetable";

const Timetable = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Load saved timetable from localStorage or initialize as empty
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) return JSON.parse(saved);
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

      {/* Top bar with back button and controls */}
      <div className="relative px-5 py-4 border-b flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc]"
        >
          <ArrowBackIcon fontSize="medium" />
          <span className="text-lg">Back</span>
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold underline">
          Weekly Timetable
        </h1>

        <div className="ml-auto flex gap-4">
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
      </div>

      {/* Timetable table */}
      <div className="mx-5 mt-6 border border-black">
        <table className="w-full text-sm text-center table-fixed h-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Day</th>
              {periodTimes.map((time, i) => (
                <th className="border p-1" key={i}>
                  P{i + 1}
                  <div className="text-[10px] text-gray-500">{time}</div>
                </th>
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
                <td className="border p-0.5 font-semibold bg-gray-50">{day}</td>

                {timetable[dayIndex].map((_, periodIndex) => {
                  const cell = isEditing
                    ? tempTimetable[dayIndex][periodIndex]
                    : timetable[dayIndex][periodIndex];

                  return (
                    <td
                      key={periodIndex}
                      className={`border p-0.5 ${isEditing ? "hover:bg-yellow-100" : ""}`}
                    >
                      {isEditing ? (
                        <div className="flex flex-col justify-center items-center gap-0.5 h-full">
                          <input
                            type="text"
                            placeholder="Subject"
                            value={cell.subject}
                            onChange={e => handleCellChange(dayIndex, periodIndex, "subject", e.target.value)}
                            className="border text-xs p-0.5 w-16 text-center"
                          />
                          <input
                            type="text"
                            placeholder="Room"
                            value={cell.room}
                            onChange={e => handleCellChange(dayIndex, periodIndex, "room", e.target.value)}
                            className="border text-xs p-0.5 w-12 font-bold text-center"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center h-full gap-0">
                          {cell.subject && <span>{cell.subject}</span>}
                          {cell.room && <strong>{`[${cell.room}]`}</strong>}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
