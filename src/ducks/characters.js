import { Map, List } from "immutable";

const defaultState = Map({ characters: [] });

export const fetchCharactersAC = () => ({ type: "FETCH_CHARACTERS" });
export const saveCharactersAC = (data) => ({
  type: "SAVE_CHARACTERS",
  payload: data,
});
export const postCharacterAC = (data) => ({
  type: "POST_CHARACTER",
  payload: data,
});

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_CHARACTERS":
      return state.update("characters", (old) => payload);
    default:
      return state;
  }
}
