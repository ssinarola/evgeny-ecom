import { useSelector } from "react-redux";

export function useProducts() {
  const state = useSelector(({ products } = {}) => products);
  return state;
}