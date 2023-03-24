import { createSelector } from "reselect";
import { ProductsState } from "./products.reducer";

const selectProductReducer = (state: any): ProductsState => state.products;

export const selectProducts = createSelector(
  [selectProductReducer],
  (productsSlice) => {
    return productsSlice.products;
  }
);

export const selectProductsIsLoading = createSelector(
  [selectProductReducer],
  (productsSlice) => productsSlice.isLoading
)
