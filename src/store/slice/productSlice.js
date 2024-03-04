import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PRODUCTS_API_URL } from '../../utils/endpoints';
import axios from '../../config/axios';

const responseData = {
  "traceId": "65e59bc270a32bd39124022c6ea22499",
  "data": {
      "results": [
          {
              "productId": "69628d9b-f94e-4a45-b5e3-4be7d9012162",
              "storeId": "0f3e43ce-0a1b-4a15-a85d-aad6b5fc780f",
              "categoryId": "20",
              "thumbnail": "456456zmcjbbhs",
              "video": "546546fdfdfdb",
              "maker": "Maker Name",
              "productionYear": "2000",
              "type": "DIGITAL",
              "customizable": true,
              "customizableComment": "Additional comments",
              "shipmentTimeInDays": "1-3",
              "processingTimeInDays": "5-7",
              "returnExchangePolicyId": "Return and Exchange Policy",
              "shippingPrice": 10.99,
              "status": "DRAFT",
              "variants": [
                  {
                      "productId": "69628d9b-f94e-4a45-b5e3-4be7d9012162",
                      "productVariantId": "ffb3c983-3cbf-44dc-8dc7-4865aae5ae33",
                      "title": "variants",
                      "description": "name of variants",
                      "domesticPrice": 12.99,
                      "globalPrice": 10,
                      "sku": "sku",
                      "quantity": "5",
                      "attributes": [
                          {
                              "productAttributeId": "1ab7c203-0d37-439d-909d-3e3d4b2cf16c",
                              "variantId": "ffb3c983-3cbf-44dc-8dc7-4865aae5ae33",
                              "attributeId": "3",
                              "attributeValue": "FDJ654564SBDKJBSD"
                          },
                          {
                              "productAttributeId": "5f1808bb-b451-45bc-80ab-6a42a64cfdd8",
                              "variantId": "ffb3c983-3cbf-44dc-8dc7-4865aae5ae33",
                              "attributeId": "33",
                              "attributeValueId": "50"
                          },
                          {
                              "productAttributeId": "bc0bf454-c49f-490d-a34e-2905014092cb",
                              "variantId": "ffb3c983-3cbf-44dc-8dc7-4865aae5ae33",
                              "attributeId": "33",
                              "attributeValueId": "52"
                          },
                          {
                              "productAttributeId": "13382180-713a-4494-b6fe-cca6aa65c466",
                              "variantId": "ffb3c983-3cbf-44dc-8dc7-4865aae5ae33",
                              "attributeId": "33",
                              "attributeValueId": "55"
                          }
                      ]
                  }
              ],
              "listingImages": [
                  "5674788612",
                  "56747886154"
              ],
              "productTags": [
                  "fkf",
                  "ddf",
                  "fsdds",
                  "dfsddsf"
              ]
          },
          {
              "productId": "ce281731-11eb-466c-9617-801a3a180529",
              "storeId": "store_id_value",
              "categoryId": "28",
              "thumbnail": "456456zmcjbbhs",
              "video": "546546fdfdfdb",
              "maker": "Maker Name",
              "productionYear": "2000",
              "type": "DIGITAL",
              "customizable": true,
              "customizableComment": "Additional comments",
              "shipmentTimeInDays": "1-3",
              "processingTimeInDays": "5-7",
              "returnExchangePolicyId": "Return and Exchange Policy",
              "shippingPrice": 10.99,
              "status": "DRAFT",
              "variants": [
                  {
                      "productId": "ce281731-11eb-466c-9617-801a3a180529",
                      "productVariantId": "60601476-228d-425d-a7d7-5c9d7876b868",
                      "title": "variants",
                      "description": "name of variants",
                      "domesticPrice": 12.99,
                      "globalPrice": 10,
                      "sku": "sku",
                      "quantity": "5",
                      "attributes": [
                          {
                              "productAttributeId": "a78c7da6-40a2-4a70-928d-c5b66002d818",
                              "variantId": "60601476-228d-425d-a7d7-5c9d7876b868",
                              "attributeId": "3",
                              "attributeValue": "FDJ654564SBDKJBSD"
                          },
                          {
                              "productAttributeId": "e606ba42-37c5-4188-b235-ea012a84bd52",
                              "variantId": "60601476-228d-425d-a7d7-5c9d7876b868",
                              "attributeId": "33",
                              "attributeValueId": "50"
                          },
                          {
                              "productAttributeId": "262985b7-8520-470a-8ed9-2a9f43925a24",
                              "variantId": "60601476-228d-425d-a7d7-5c9d7876b868",
                              "attributeId": "33",
                              "attributeValueId": "52"
                          },
                          {
                              "productAttributeId": "c9be6bd4-6db9-49be-8d71-12224e2476b3",
                              "variantId": "60601476-228d-425d-a7d7-5c9d7876b868",
                              "attributeId": "33",
                              "attributeValueId": "55"
                          }
                      ]
                  },
                  {
                      "productId": "ce281731-11eb-466c-9617-801a3a180529",
                      "productVariantId": "7465657b-475b-44c2-b74b-1c4a7c80b263",
                      "title": "variants",
                      "description": "name of variants",
                      "domesticPrice": 12.99,
                      "globalPrice": 10,
                      "sku": "sku",
                      "quantity": "5",
                      "attributes": [
                          {
                              "productAttributeId": "38ab8361-6797-41c8-bf46-4c83c8194e26",
                              "variantId": "7465657b-475b-44c2-b74b-1c4a7c80b263",
                              "attributeId": "3",
                              "attributeValue": "FDJ654564SBDKJBSD"
                          },
                          {
                              "productAttributeId": "2bb6f91f-8a0e-4f1c-b825-7c9157e052c2",
                              "variantId": "7465657b-475b-44c2-b74b-1c4a7c80b263",
                              "attributeId": "33",
                              "attributeValueId": "50"
                          },
                          {
                              "productAttributeId": "18da0118-88de-4846-ac47-084f7c6d764f",
                              "variantId": "7465657b-475b-44c2-b74b-1c4a7c80b263",
                              "attributeId": "33",
                              "attributeValueId": "52"
                          },
                          {
                              "productAttributeId": "3060c142-adae-4789-8926-3c18164ca749",
                              "variantId": "7465657b-475b-44c2-b74b-1c4a7c80b263",
                              "attributeId": "33",
                              "attributeValueId": "55"
                          }
                      ]
                  }
              ],
              "listingImages": [
                  "5674788612",
                  "56747886154"
              ],
              "productTags": [
                  "fkf",
                  "ddf",
                  "fsdds",
                  "dfsddsf"
              ]
          }
      ],
      "offset": 0,
      "total": 5
  }
}
// Async actions start
export const fetchProducts = createAsyncThunk('get/fetchProducts', async (params) => {
    const response = await axios.get(PRODUCTS_API_URL,{params});    
    return response.data
  },
)
// Async actions end


const initialState = {
  // initial state 
  productsList: {
    isLoading: false,
    isError: false,
    data: [],
  }
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // normal reducer functions go here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
})

// export const { increment, decrement, incrementByAmount } = productSlice.actions
export default productSlice.reducer