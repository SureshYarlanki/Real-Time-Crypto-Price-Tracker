import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assets: [],
  loading: false,
  error: null,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    fetchCryptoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCryptoSuccess: (state, action) => {
      state.loading = false;
      state.assets = action.payload;
    },
    fetchCryptoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCryptoPrices: (state, action) => {
      action.payload.forEach((update) => {
        const asset = state.assets.find((a) => a.id === update.id);
        if (asset) {
          Object.assign(asset, update);
        }
      });
    },
  },
});

export const {
  fetchCryptoStart,
  fetchCryptoSuccess,
  fetchCryptoFailure,
  updateCryptoPrices,
} = cryptoSlice.actions;

export const fetchCryptoData = () => async (dispatch) => {
  try {
    dispatch(fetchCryptoStart());
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,bnb,solana&order=market_cap_desc&sparkline=true"
    );

    
    console.log("API Response:", response.data);

    const formattedData = response.data.map((coin) => {
       
      let sparkline = [];
      if (coin.sparkline_in_7d && coin.sparkline_in_7d.price) {
        sparkline = coin.sparkline_in_7d.price;
      } else {

        sparkline = new Array(168).fill(coin.current_price);  
      }

      console.log(`${coin.name} Sparkline Data:`, sparkline);

      return {
        id: coin.id,
        rank: coin.market_cap_rank,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change1h: coin.price_change_percentage_1h_in_currency || 0,
        change24h: coin.price_change_percentage_24h_in_currency || 0,
        change7d: coin.price_change_percentage_7d_in_currency || 0,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        circulatingSupply: coin.circulating_supply,
        maxSupply: coin.max_supply,
        sparkline,  
      };
    });

    dispatch(fetchCryptoSuccess(formattedData));
  } catch (error) {
    dispatch(fetchCryptoFailure(error.message));
  }
};

export const simulatePriceUpdates = () => (dispatch, getState) => {
  const { assets } = getState().crypto;
  const updates = assets.map((asset) => {
    const changeFactor = 1 + (Math.random() * 0.02 - 0.01); // -1% to +1% change
    return {
      id: asset.id,
      price: asset.price * changeFactor,
      change1h: asset.change1h + (Math.random() * 0.2 - 0.1),
      change24h: asset.change24h + (Math.random() * 0.3 - 0.15),
      volume24h: asset.volume24h * (1 + (Math.random() * 0.2 - 0.1)),
    };
  });
  dispatch(updateCryptoPrices(updates));
};

export default cryptoSlice.reducer;
