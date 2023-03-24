import { AnyAction } from "redux"
import {  fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "./products.action";
import {  Product } from "./products.types";

export type ProductsState = {
  products: Product[],
  isLoading: boolean,
  error: Error | null
}

export const PRODUCTS_INITIAL_STATE: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productsReducer = (
  state = PRODUCTS_INITIAL_STATE,
  action = {} as AnyAction
) => {

  if(fetchProductsStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if(fetchProductsSuccess.match(action)) {
    return { ...state, isLoading: false, products: action.payload };
  }

  if(fetchProductsFailure.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }

  return state
};
