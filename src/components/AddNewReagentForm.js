import React from "react";
import { connect } from "react-redux";
import { postReagentAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";

function AddNewReagentForm(props) {
  const { postReagentAC, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    updateUIMap("newReagentFormName", "");
  }, []);
  return (
    <div className={"modal"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postReagentAC({
            name: uiMap.get("newReagentFormName"),
            dlc: uiMap.get("newReagentFormDlc"),
          });
          updateUIMap("addNewReagentOpen", false);
        }}
      >
        <label>name</label>
        <input
          title="name"
          value={uiMap.get("newReagentFormName") || ""}
          onChange={(event) =>
            updateUIMap("newReagentFormName", event.target.value)
          }
        ></input>
        <br />
        <label>dlc</label>
        <input
          title="dlc"
          value={uiMap.get("newReagentFormDlc") || ""}
          onChange={(event) =>
            updateUIMap("newReagentFormDlc", event.target.value)
          }
        ></input>
        <br />
        <label>qualities</label>
        <input
          type="number"
          title="dlc"
          value={uiMap.get("newReagentFormQualities") || 0}
          onChange={(event) =>
            updateUIMap("newReagentFormQualities", event.target.value)
          }
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
export default connect((state) => ({ uiMap: state.ui.get("uiMap") }), {
  postReagentAC,
  updateUIMap,
})(AddNewReagentForm);
