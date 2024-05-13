import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import items from "../assets/Items.json";
import DataBaseElementList from "./DatabaseElementList";
import DataBaseElementEditForm from "./DatabaseElementEditForm";
import AddNewReagentForm from "./AddNewReagentForm";
import Headerbar from "./Headerbar";

function ReagentList(props) {
  const { fetchReagentsAC, reagents, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  var addSubmitFunction = React.useMemo(
    () => (element) => {
      console.log(element);
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
  { fetchReagentsAC, updateUIMap }
)(ReagentList);
