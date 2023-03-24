export enum CARD_ACTION_TYPES {
  SET_CARD_ITEMS = 'SET_CARD_ITEMS',
};

export type CardItem = {
  number: string,
  name: string,
  expiry: string,
  cvc: string,
  id: string
};