import axios from "../config/axios";
import { GET_ALL_ATTRIBUTE_BY_TYPE_URL, GET_ALL_ATTRIBUTE_TYPES_URL, PRODUCTS_API_URL } from "../utils/endpoints";

export const getProductById = async ({productId}) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.info("error =>", error);
    return error;
  }
};
