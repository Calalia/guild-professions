import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentPage from "./AddNewReagentPage";

function IndexPage(props) {
  const { fetchReagentsAC, reagents, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  return (
    <div>
      {uiMap.get("addNewReagentOpen") ? <AddNewReagentPage /> : ""}
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
)(IndexPage);
