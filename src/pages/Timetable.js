import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Timetable = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Handlers
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="min-h-screen">
      <Header variant="timetable" />

      {/* Sub-Header */}
      <div className="px-5 py-6 border-b mb-10 flex items-center">
        <div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc]"
          >
            <ArrowBackIcon fontSize="medium" />
            <span className="text-lg">Back</span>
          </button>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold underline">
          Weekly Timetable
        </h1>


        {/* Edit / Cancel / Save Buttons */}
        <div className="ml-auto flex gap-2">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}

          {isEditing && (
            <>
            
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
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

      {/* TABLE */}
      <div className="mx-5 mb-6 overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-[900px] w-full text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Day</th>
              <th className="border p-3">
                Period 1
                <div className="text-xs text-gray-500">9:00 - 9:50</div>
              </th>
              <th className="border p-3">
                Period 2
                <div className="text-xs text-gray-500">9:50 - 10:40</div>
              </th>
              <th className="border p-3">
                Period 3
                <div className="text-xs text-gray-500">10:40 - 11:30</div>
              </th>
              <th className="border p-3">
                Period 4
                <div className="text-xs text-gray-500">11:30 - 12:20</div>
              </th>
              <th className="border p-3 bg-gray-200">
                Break
                <div className="text-xs text-gray-500">12:20 – 12:40</div>
              </th>
              <th className="border p-3">
                Period 5
                <div className="text-xs text-gray-500">12:40 - 1:30</div>
              </th>
              <th className="border p-3">
                Period 6
                <div className="text-xs text-gray-500">1:30 - 2:20</div>
              </th>
              <th className="border p-3">
                Period 7
                <div className="text-xs text-gray-500">2:20 - 3:10</div>
              </th>
              <th className="border p-3">
                Period 8
                <div className="text-xs text-gray-500">3:10 - 4:00</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {days.map((day) => (
              <tr key={day} className="hover:bg-gray-50">
                <td className="border p-3 font-semibold bg-gray-50">{day}</td>

                {/* Period 1–4 */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <td key={i} className="border p-3">—</td>
                ))}

                {/* Break column */}
                <td className="border p-3 bg-gray-100"></td>

                {/* Period 5–8 */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <td key={i} className="border p-3">—</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Timetable
