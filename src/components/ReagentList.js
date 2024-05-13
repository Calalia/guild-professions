import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC, postReagentAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
//import items from "../assets/Items.json";
import DataBaseElementList from "./DatabaseElementList";
import DataBaseElementEditForm from "./DatabaseElementEditForm";
import Headerbar from "./Headerbar";

function ReagentList(props) {
  const { fetchReagentsAC, postReagentAC, reagents, uiMap, updateUIMap } =
    props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  var addSubmitFunction = React.useMemo(
    () => (element) => {
      postReagentAC(element);
      updateUIMap("addNewReagentOpen", false);
    },
    []
  );
  var addCancelFunction = React.useMemo(
    () => () => {
      updateUIMap("addNewReagentOpen", false);
    },
    []
  );
  var editSubmitFunction = React.useMemo(
    () => (element) => {
      patchCharacterAC(element);
      updateUIMap("editedCharacter", null);
    },
    []
  );
  var editCancelFunction = React.useMemo(
    () => () => {
      updateUIMap("editedCharacter", null);
    },
    []
  );
  return (
    <Headerbar>
      {uiMap.get("addNewReagentOpen") ? (
        <DataBaseElementEditForm
          editedElement={{ name: "", tags: "" }}
          submitFunction={addSubmitFunction}
          cancelFunction={addCancelFunction}
        />
      ) : (
        ""
      )}
      <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            updateUIMap("addNewReagentOpen", true);
          },
          []
        )}
        listItems={reagents}
      />
    </Headerbar>
  );
}
export default connect(
  (state) => ({
    reagents: state.reagents.get("reagents"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchReagentsAC, postReagentAC, updateUIMap }
)(ReagentList);
