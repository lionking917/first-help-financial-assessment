import { AnyAction } from "redux"
import { setCardItems } from './card.action';
import { CardItem } from './card.types';

export type CardState = {
  cardItems: CardItem[]
}

const CARD_INITIAL_STATE: CardState = {
  cardItems: [],
};

export const cardReducer = (state = CARD_INITIAL_STATE, action: AnyAction) => {
  if (setCardItems.match(action)) {
    return {
      ...state,
      cardItems: action.payload,
    };
  }

  return state;
};
