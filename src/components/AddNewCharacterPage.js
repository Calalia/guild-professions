import React from "react";
import { connect } from "react-redux";
import { postCharacterAC, deleteCharacterAC } from "../ducks/characters";
import { updateUIMap } from "../ducks/ui";

function AddNewCharacterPage(props) {
  const { postCharacterAC, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    updateUIMap("newCharacterFormName", "");
  }, []);
  return (
    <div className={"modal"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postCharacterAC({ charname: uiMap.get("newCharacterFormName") });
        }}
      >
        <input
          title="name"
          value={uiMap.get("newCharacterFormName") || ""}
          onChange={(event) =>
            updateUIMap("newCharacterFormName", event.target.value)
          }
        ></input>
        <button type="Submit">add</button>
      </form>
    </div>
  );
}
export default connect((state) => ({ uiMap: state.ui.get("uiMap") }), {
  postCharacterAC,
  deleteCharacterAC,
  updateUIMap,
})(AddNewCharacterPage);
