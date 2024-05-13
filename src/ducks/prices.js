import { Map, List } from "immutable";

const defaultState = Map({ prices: [] });

export const saveReagentsAC = (data) => ({
  type: "SAVE_PRICES",
  payload: data,
});

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_PRICES":
      return state.update("prices", (old) => payload);
    default:
      return state;
  }
}
