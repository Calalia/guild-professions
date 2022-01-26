import { Map, List } from "immutable";

const defaultState = Map({ reagents: [] });

export const fetchReagentsAC = () => ({ type: "FETCH_REAGENTS" });
export const saveReagentsAC = (data) => ({
  type: "SAVE_REAGENTS",
  payload: data,
});
export const postReagentAC = (data) => ({
  type: "POST_REAGENT",
  payload: data,
});

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_REAGENTS":
      return state.update("reagents", (old) => payload);
    default:
      return state;
  }
}
