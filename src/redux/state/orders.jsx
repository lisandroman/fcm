import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const initialState = {
  cart: [],
  currency: "USD",
  status: "idle",
  error: null,
  IDFinalToForm: [],
  coinsFinalToForm: [],
  platformFinalToForm: [],
  priceFinalToForm: [],
  // priceInForm: {
  //   orderID: "orderID",
  //   pricePaid: "pricePaid",
  //   checkPlat: "checkPlat",
  // },
};
export const fetchData = createAsyncThunk("orders/fetchData", async () => {
  let response = await getDocs(collection(db, "test"));
  return response.docs.map((doc) => doc.data());
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload });
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    loadCurrency: (state, action) => {
      state.currency = action.payload;
    },
    IDFinalToForm: (state, action) => {
      state.IDFinalToForm = action.payload;
    },
    coinsFinalToForm: (state, action) => {
      state.coinsFinalToForm = action.payload;
    },
    platformFinalToForm: (state, action) => {
      state.platformFinalToForm = action.payload;
    },
    priceFinalToForm: (state, action) => {
      state.priceFinalToForm = action.payload;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = state.cart.concat(action.payload);
      })

      .addCase(fetchData.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
export const allData = (state) => state.orders.cart;
export const getDataStatus = (state) => state.orders.status;
export const getDataErrors = (state) => state.orders.error;
export const getCurrency = (state) => state.orders.currency;

export const getLatestOrderID = (state) => state.orders.IDFinalToForm;
export const getLatestCoins = (state) => state.orders.coinsFinalToForm;
export const getLatestPlatform = (state) => state.orders.platformFinalToForm;
export const getLatestPrice = (state) => state.orders.priceFinalToForm;

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCurrency,
  IDFinalToForm,
  coinsFinalToForm,
  platformFinalToForm,
  priceFinalToForm,
} = orderSlice.actions;

export default orderSlice.reducer;
