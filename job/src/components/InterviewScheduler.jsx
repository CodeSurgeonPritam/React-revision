import React, { useState } from "react";

const InterviewScheduler = () => {
  const [date, setDate] = useState("");
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  const scheduleInterview = () => {
    if (!date) {
      alert("Please select a date for the interview.");
      return;
    }

    // Add the scheduled interview to the list
    setScheduledInterviews((prevInterviews) => [...prevInterviews, date]);
    alert(`Interview scheduled for ${date}`);
    setDate(""); // Clear the input after scheduling
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Schedule an Interview</h2>
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={scheduleInterview}
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
        >
          Book Slot
        </button>
      </div>

      {/* Show scheduled interviews in card form */}
      {scheduledInterviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduledInterviews.map((interview, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-semibold text-gray-800">Interview Scheduled</h3>
              <p className="text-gray-600 mt-2">Date: {interview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;
