import { Map, List } from "immutable";

const defaultState = Map({ loading: [], uiMap: Map() });

export function updateUIMap(key, value) {
  return { type: "UPDATE_UI_MAP", payload: { key, value } };
}
export default function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_UI_MAP":
      return state.update("uiMap", (old) =>
        old.update(payload.key, (oldValue) => payload.value)
      );
    default:
      return state;
  }
}
