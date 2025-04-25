
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
  }),
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: () => `coins/markets?vs_currency=usd`,
    }),
  }),
});

export const { useGetMarketsQuery } = cryptoApi;
