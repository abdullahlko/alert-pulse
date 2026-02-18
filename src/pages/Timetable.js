import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { days, periodTimes, periods } from "../constants/timetable";

const Timetable = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) return JSON.parse(saved);
    return days.map((day) => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods).fill(0).map(() => ({ subject: "", room: "" }));
    });
  });

  const [tempTimetable, setTempTimetable] = useState([]);

  const isTimetableEmpty = (temp) => {
    return temp.every((day) =>
      day.every((period) => period.subject === "" && period.room === ""),
    );
  };

  const handleEdit = () => {
    setTempTimetable(JSON.parse(JSON.stringify(timetable)));
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    setTimetable(tempTimetable);
    localStorage.setItem("timetable", JSON.stringify(tempTimetable));
    setIsEditing(false);
  };

  const handleCellChange = (dayIndex, periodIndex, field, value) => {
    const newTemp = [...tempTimetable];
    newTemp[dayIndex] = [...newTemp[dayIndex]];
    newTemp[dayIndex][periodIndex] = {
      ...newTemp[dayIndex][periodIndex],
      [field]: value,
    };
    setTempTimetable(newTemp);
  };

  const handleClear = () => {
    const clearedTimetable = days.map((day) => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods)
        .fill(0)
        .map(() => ({ subject: "", room: "" }));
    });

    setTempTimetable(clearedTimetable);
  };

  const handleClearClick = () => {
    if (window.confirm("This will clear the entire timetable. Continue?")) {
      handleClear();
    }
  };

  return (
    <div className="min-h-screen">
      <Header variant="timetable" />

      <div className="relative px-5 py-4 border-b flex items-center">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc]"
          >
            <ArrowBackIcon fontSize="medium" />
            <span className="text-lg">Back</span>
          </button>
        </div>

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
                className={`px-4 py-1 rounded text-white ${
                  isTimetableEmpty(tempTimetable)
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={isTimetableEmpty(tempTimetable)}
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

      <div className="mx-5 mt-6 border border-black">
        <table className="w-full text-sm text-center table-fixed h-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Day</th>

              {periodTimes.slice(0, 4).map((time, i) => (
                <th className="border p-1" key={i}>
                  P{i + 1}
                  <div className="text-[10px] text-gray-500">{time}</div>
                </th>
              ))}

              <th className="border p-1 bg-gray-200">Break</th>

              {periodTimes.slice(4).map((time, i) => (
                <th className="border p-1" key={i + 4}>
                  P{i + 5}
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
                style={{ height: "65px" }}
              >
                <td className="border p-0.5 font-semibold bg-gray-50">{day}</td>

                {timetable[dayIndex].slice(0, 4).map((_, periodIndex) => {
                  const cellData = isEditing
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
                            value={cellData.subject}
                            onChange={(e) =>
                              handleCellChange(
                                dayIndex,
                                periodIndex,
                                "subject",
                                e.target.value,
                              )
                            }
                            className="border text-xs p-0.5 w-16 text-center"
                          />
                          <input
                            type="text"
                            placeholder="Room"
                            value={cellData.room}
                            onChange={(e) =>
                              handleCellChange(
                                dayIndex,
                                periodIndex,
                                "room",
                                e.target.value,
                              )
                            }
                            className="border text-xs p-0.5 w-12 font-bold text-center"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center h-full gap-0">
                          <span>{cellData.subject || "—"}</span>
                          {cellData.room && (
                            <strong>{`[${cellData.room}]`}</strong>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}

                <td className="border p-0.5 bg-gray-200"></td>

                {timetable[dayIndex].slice(4).map((_, periodIndex) => {
                  const cellData = isEditing
                    ? tempTimetable[dayIndex][periodIndex + 4]
                    : timetable[dayIndex][periodIndex + 4];

                  return (
                    <td
                      key={periodIndex + 4}
                      className={`border p-0.5 ${isEditing ? "hover:bg-yellow-100" : ""}`}
                    >
                      {cellData ? (
                        isEditing ? (
                          <div className="flex flex-col justify-center items-center gap-0.5 h-full">
                            <input
                              type="text"
                              placeholder="Subject"
                              value={cellData.subject}
                              onChange={(e) =>
                                handleCellChange(
                                  dayIndex,
                                  periodIndex + 4,
                                  "subject",
                                  e.target.value,
                                )
                              }
                              className="border text-xs p-0.5 w-16 text-center"
                            />
                            <input
                              type="text"
                              placeholder="Room"
                              value={cellData.room}
                              onChange={(e) =>
                                handleCellChange(
                                  dayIndex,
                                  periodIndex + 4,
                                  "room",
                                  e.target.value,
                                )
                              }
                              className="border text-xs p-0.5 w-12 font-bold text-center"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center h-full gap-0">
                            <span>{cellData.subject || "—"}</span>
                            {cellData.room && (
                              <strong>{`[${cellData.room}]`}</strong>
                            )}
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col justify-center items-center h-full gap-0">
                          <span>—</span>
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
