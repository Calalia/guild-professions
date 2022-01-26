import { Map, List } from "immutable";

const defaultState = Map({ recipes: new List() });

export const fetchRecipesAC = () => ({ type: "FETCH_RECIPES" });
export const saveRecipesAC = (data) => ({
  type: "SAVE_RECIPES",
  payload: data,
});

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_RECIPES":
      return state.update("recipes", (old) => List(payload));
    default:
      return state;
  }
}
