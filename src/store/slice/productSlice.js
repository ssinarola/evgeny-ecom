import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_API_URL } from "../../utils/endpoints";
import axios from '../../config/axios';
import { toast } from "react-toastify";

// Async actions
export const fetchProducts = createAsyncThunk("get/fetchProducts", async (params) => {
    // Fetch products
    const response = await axios.get(PRODUCTS_API_URL, { params });
    return response.data;
  }
);

export const addProducts = createAsyncThunk("add/addProducts", async ({body, resetForm}) => {  
    // Create product
    const response = await axios.post(PRODUCTS_API_URL, { ...body });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk("update/updateProducts", async ({productId, body}) => {
    // Update product
    const response = await axios.put(`${PRODUCTS_API_URL}/${productId}`, { ...body });
    return response.data;
  }
);

const initialState = {
  productsList: {
    isLoading: false,
    isError: false,
    data: {},
  },
  createAndUpdateProduct: {
    isLoading: false,
    isError: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // normal reducer functions go here
  },
  extraReducers: (builder) => {
    // Case for product listing
    builder.addCase(fetchProducts.pending, (state, action) => {
        state.productsList.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {    
      state.productsList.isLoading = false;
      state.productsList.data = payload.data;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
        state.productsList.isLoading = false;
        state.productsList.isError = true;
    });

  // Case for Create/Update product 
    builder.addCase(addProducts.pending, (state, action) => { 
        state.createAndUpdateProduct.isLoading = true;
    });
    builder.addCase(addProducts.fulfilled, (state, {meta}) => {    
      state.createAndUpdateProduct.isLoading = false;
      meta.arg.resetForm();
      toast.success("Product created Successfully!");
    });
    builder.addCase(addProducts.rejected, (state, action) => {
        state.createAndUpdateProduct.isLoading = false;
        state.createAndUpdateProduct.isError = true;
    });

    builder.addCase(updateProduct.pending, (state, action) => { 
        state.createAndUpdateProduct.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {    
      state.createAndUpdateProduct.isLoading = false;
      toast.success("Product updated Successfully!");
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
        state.createAndUpdateProduct.isLoading = false;
        state.createAndUpdateProduct.isError = true;
    });
  },
});

export default productSlice.reducer;
