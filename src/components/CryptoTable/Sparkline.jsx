import React from "react";

const Sparkline = ({ data }) => {
  if (!data || data.length < 2) {
    return <span className="text-gray-400">Insufficient data</span>;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);

   
  const height = 30; 
  const width = 100;  
  const margin = 5;  

  const getSparklinePath = () => {
    const path = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * (width - 2 * margin) + margin;

        const y = ((value - min) / (max - min)) * (height - 2 * margin) + margin;

        return `${index === 0 ? "M" : "L"}${x},${height - y}`;
      })
      .join(" ");  

    return path;
  };

  const pathData = getSparklinePath();

  return (
    <svg width={width} height={height} viewBox="0 0 100 30" className="sparkline">
      <path d={pathData} stroke="#4CAF50" fill="none" strokeWidth="2" />
    </svg>
  );
};

export default Sparkline;
