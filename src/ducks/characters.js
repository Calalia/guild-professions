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
export const deleteCharacterAC = (data) => ({
  type: "DELETE_CHARACTER",
  payload: data,
});
export const patchCharacterAC = (data) => ({
  type: "PATCH_CHARACTER",
  payload: data,
});

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SAVE_CHARACTERS":
      return state.update("characters", (old) => {
        //console.log(payload);
        if (typeof payload == "string") return [];
        return payload;
      });
    default:
      return state;
  }
}
