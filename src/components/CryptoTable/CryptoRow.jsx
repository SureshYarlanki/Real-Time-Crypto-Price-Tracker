import React from "react";
import PercentageChange from "./PercentageChange";
import Sparkline from "./Sparkline";


const CryptoRow = ({ asset }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };
console.log(asset.sparkline);
  const formatLargeNumber = (value) => {
    if (!value) return "-";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  const formatSupply = (value) => {
    if (!value) return "-";
    return `${(value / 1e6).toFixed(2)}M ${asset.symbol}`;
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{asset.rank}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={
              asset.image?.large ||
              `https://cryptologos.cc/logos/${asset.symbol.toLowerCase()}-logo.png`
            }
            onError={(e) => {
              e.target.src = `https://placehold.co/24x24?text=${asset.symbol.slice(
                0,
                2
              )}`;
              e.target.style.backgroundColor = "#f0f0f0";
            }}
            alt={`${asset.name} logo`}
            className="w-6 h-6 mr-2"
          />

          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-gray-500">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(asset.price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PercentageChange value={asset.change1h} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PercentageChange value={asset.change24h} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PercentageChange value={asset.change7d} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatLargeNumber(asset.marketCap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatLargeNumber(asset.volume24h)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatSupply(asset.circulatingSupply)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Sparkline data={asset.sparkline} />
      </td>
    </tr>
  );
};

export default CryptoRow;
