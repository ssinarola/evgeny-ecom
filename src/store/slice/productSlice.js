import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_API_URL } from "../../utils/endpoints";
import axios from '../../config/axios';

// Async actions
export const fetchProducts = createAsyncThunk("get/fetchProducts", async (params) => {
    // Fetch products
    const response = await axios.get(PRODUCTS_API_URL, { params });
    return response.data;
  }
);

const initialState = {
  productsList: {
    isLoading: false,
    isError: false,
    data: {},
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // normal reducer functions go here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
        state.productsList.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {    
      state.productsList.isLoading = false;
      state.productsList.data = payload.data;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
        state.productsList.isLoading = false;
    });
  },
});

export default productSlice.reducer;
