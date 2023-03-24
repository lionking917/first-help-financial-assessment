import { AnyAction } from "@reduxjs/toolkit";

type AC = () => AnyAction & { type: string };
type AC2 = (...arg: any[]) => AnyAction & { type: string };

type Matchable = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC | AC2>; // Predicate function
};

export function withMatcher(actionCreator: AC): Matchable;
export function withMatcher(actionCreator: AC2): Matchable;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;


export function createAction<T extends string, P>(type: T, payload: P): any {
  return { type, payload };
}
