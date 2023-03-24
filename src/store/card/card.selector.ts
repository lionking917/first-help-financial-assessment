import { createSelector } from 'reselect';

const selectCardReducer = (state: any) => state.card;

export const selectCardItems = createSelector(
  [selectCardReducer],
  (card) => card.cardItems
);
