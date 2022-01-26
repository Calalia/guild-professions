import React from "react";
import { connect } from "react-redux";
import { postCharacterAC } from "../ducks/characters";
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
          postCharacterAC({ name: uiMap.get("newCharacterFormName") });
        }}
      >
        <input
          title="name"
          value={uiMap.get("newCharacterFormName") || ""}
          onChange={(event) =>
            updateUIMap("newCharacterFormName", event.target.value)
          }
        ></input>
      </form>
    </div>
  );
}
export default connect((state) => ({ uiMap: state.ui.get("uiMap") }), {
  postCharacterAC,
  updateUIMap,
})(AddNewCharacterPage);
