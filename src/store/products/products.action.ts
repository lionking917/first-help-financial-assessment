import { PRODUCTS_ACTION_TYPES, Product } from "./products.types";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type FetchProductsStart =
  Action<PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START>;
export type FetchProductsSuccess = ActionWithPayload<
PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
Product[]
>;
export type FetchProductsFailed = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED,
  Error
>;

export const fetchProductsStart = withMatcher(
  (): FetchProductsStart =>
    createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START)
);

export const fetchProductsSuccess = withMatcher(
  (productsArray: Product[]): FetchProductsSuccess =>
    createAction(
      PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
      productsArray
    )
);

export const fetchProductsFailure = withMatcher(
  (error: Error): FetchProductsFailed =>
    createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, error)
);
