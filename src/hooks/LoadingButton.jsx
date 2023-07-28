  import React from "react";

  export default function LoadingButton() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-8 border-blue-500 border-solid border-opacity-50 rounded-full w-20 h-20 animate-spin mb-4"></div>
        <p className="text-blue-500 font-bold">Loading...</p>
      </div>
    );
  }
