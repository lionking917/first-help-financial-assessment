export enum PRODUCTS_ACTION_TYPES {
  FETCH_PRODUCTS_START = "products/FETCH_PRODUCTS_START",
  FETCH_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILED = "products/FETCH_PRODUCTS_FAILED",
};

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};
