import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { CardItem, CARD_ACTION_TYPES } from './card.types';

const addCardItem = (cardItems: CardItem[], cardToAdd: CardItem) => {
  return [...cardItems, { ...cardToAdd }];
};

const removeCardItem = (cardItems: CardItem[], cardItemToRemove: CardItem) => {
  return cardItems.filter((cardItem) => cardItem.id !== cardItemToRemove.id);
};

const updateCardItem = (cardItems: CardItem[], cardItemToUpdate: CardItem) => {
  const index = cardItems.findIndex(cardItem => cardItem.id === cardItemToUpdate.id)

  if (index !== -1) {
    cardItems[index] = cardItemToUpdate
  }

  return cardItems
};

export type SetCardItems = ActionWithPayload<
  CARD_ACTION_TYPES.SET_CARD_ITEMS,
  CardItem[]
>;

export const setCardItems = withMatcher(
  (cardItems: CardItem[]): SetCardItems =>
    createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, cardItems)
);

export const addItemToCard = (cardItems: CardItem[], cardToAdd: CardItem) => {
  const newCardItems = addCardItem(cardItems, cardToAdd);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};

export const removeItemFromCard = (cardItems: CardItem[], cardToRemove: CardItem) => {
  const newCardItems = removeCardItem(cardItems, cardToRemove);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};

export const updateItemFromCard = (cardItems: CardItem[], cardToUpdate: CardItem) => {
  const newCardItems = updateCardItem(cardItems, cardToUpdate);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};
