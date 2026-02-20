import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const ClassCard = ({ title, periodIndex, periodTimes, data, borderColor, cardColor }) => {
  // Checks if the period has a subject scheduled
  const hasSubject = !!data?.subject;

  return (
    <div
      className="flex-1 max-w-sm p-6 border rounded-3xl shadow-md h-[200px] flex flex-col"
      style={{ borderColor }}
    >
      {/* Displays the card title with background color */}
      <div
        className="text-center rounded-b-lg px-2 py-1 mb-4 font-semibold text-lg"
        style={{ backgroundColor: cardColor }}
      >
        {title}
      </div>

      <div className="flex flex-col justify-between h-full mt-2">
        {hasSubject ? (
          <div className="flex flex-col items-center justify-center">
            {/* Shows the subject name if available */}
            <p className="text-2xl font-bold text-center">{data.subject}</p>

            {/* Shows room numbericon if available */}
            {data?.room && (
              <p className="text-sm text-gray-700 font-medium mt-2 flex items-center gap-1">
                <MeetingRoomIcon fontSize="small" />
                {data.room}
              </p>
            )}

            {/* Displays the time period at the bottom */}
            {periodIndex !== null && (
              <p className="text-[14px] text-gray-500 text-center font-bold mt-6">
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
    </div>
  );
};

export default ClassCard;