import { Product } from "../products/products.types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
};

export type CartItem = Product & {
  quantity: number;
};