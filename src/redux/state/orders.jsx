import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const initialState = {
  cart: [],
  currency: "USD",
  status: "idle",
  error: null,
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
      console.log("action.payload:", action.payload);
      state.currency = action.payload;
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

export const { addToCart, removeFromCart, clearCart, loadCurrency } =
  orderSlice.actions;

export default orderSlice.reducer;
