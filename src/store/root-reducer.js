import { combineReducers } from 'redux';

import { cardReducer } from './card/card.reducer';
import { cartReducer } from './cart/cart.reducer';
import { productsReducer } from './products/products.reducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  card: cardReducer,
  cart: cartReducer
});
