import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import items from "../assets/Items.json";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentForm from "./AddNewReagentForm";

function ReagentList(props) {
  const { fetchReagentsAC, reagents, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  return (
    <div>
      {uiMap.get("addNewReagentOpen") ? <AddNewReagentForm /> : ""}
      <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            updateUIMap("addNewReagentOpen", true);
          },
          []
        )}
        listItems={reagents}
      />
    </div>
  );
}
export default connect(
  (state) => ({
    reagents: state.reagents.get("reagents"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchReagentsAC, updateUIMap }
)(ReagentList);
