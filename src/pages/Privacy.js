import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-gray-800">

      <h1 className="text-2xl font-bold mb-10 underline underline-offset-4">
        Privacy Policy
      </h1>

      <p className="mb-4">
        TimetablePulse respects your privacy. We do not collect or share any personal information. Your use of the app is completely anonymous.
      </p>

      <p className="mb-4">
        We use Firebase Analytics to track anonymous app usage. This helps us understand how the app is used and improve features. No personal details like names, emails or phone numbers are collected or shared.
      </p>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
      >
        &larr; Back
      </button>
    </div>
  );
};

export default Privacy;