import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  fetchCryptoData,
  simulatePriceUpdates,
} from "../../features/crypto/cryptoSlice";
import CryptoRow from "./CryptoRow";

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { assets, loading, error } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());

    const interval = setInterval(() => {
      dispatch(simulatePriceUpdates());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">1h %</th>
              <th className="px-6 py-3 text-left">24h %</th>
              <th className="px-6 py-3 text-left">7d %</th>
              <th className="px-6 py-3 text-left">Market Cap</th>
              <th className="px-6 py-3 text-left">Volume (24h)</th>
              <th className="px-6 py-3 text-left">Circulating Supply</th>
              <th className="px-6 py-3 text-left">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => (
              <CryptoRow key={asset.id} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
