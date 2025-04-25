import React from "react";

const PercentageChange = ({ value }) => {
  const isPositive = value >= 0;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <span className={`${colorClass} font-medium`}>
      {value?.toFixed(2)}% {arrow}
    </span>
  );
};

export default PercentageChange;
