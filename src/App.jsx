import React from "react";
import CryptoTable from "./components/CryptoTable/CryptoTable";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <h1 className="text-2xl font-bold text-center p-4">
        Real-Time Crypto Price Tracker
      </h1>
      <CryptoTable />
    </div>
  );
};

export default App;
