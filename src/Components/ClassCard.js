import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const ClassCard = ({ title, periodIndex, periodTimes, data, borderColor, cardColor }) => {
  // Checks if the period has a subject scheduled
  const hasSubject = !!data?.subject;

  return (
    <div
      className="flex-1 max-w-sm sm:max-w-md p-4 sm:p-6 border rounded-3xl shadow-md flex flex-col h-[180px] sm:h-[200px]"
      style={{ borderColor }}
    >
      {/* Displays the card title with background color */}
      <div
        className="text-center rounded-b-lg px-2 py-1 mb-3 sm:mb-4 font-semibold text-lg sm:text-xl"
        style={{ backgroundColor: cardColor }}
      >
        {title}
      </div>

      {/* Class details: subject, room, and period time */}
      {hasSubject ? (
        <div className="flex flex-col items-center justify-center h-full space-y-1 sm:space-y-2">
          {/* Shows the subject name if available */}
          <p className="text-xl sm:text-2xl font-bold text-center">{data.subject}</p>

          {/* Shows room number icon if available */}
          {data?.room && (
            <p className="text-sm sm:text-base text-gray-700 font-medium flex items-center gap-1">
              <MeetingRoomIcon fontSize="small" />
              {data.room}
            </p>
          )}

          {/* Displays the period time at the bottom */}
          {periodIndex !== null && (
            <p className="text-[12px] sm:text-[14px] text-gray-500 text-center font-bold mt-1 sm:mt-2 mb-2 sm:mb-0">
              {periodTimes[periodIndex]}
            </p>
          )}
        </div>
      ) : (
        // Placeholder display when no subject is scheduled
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl font-bold text-center">—</p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;