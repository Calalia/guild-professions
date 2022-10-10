import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import items from "../assets/Items.json";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentForm from "./AddNewReagentForm";
import Headerbar from "./Headerbar";

function ReagentList(props) {
  const { fetchReagentsAC, reagents, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  React.useEffect(() => {
    if (!uiMap.get("selectedItem") && reagents && reagents[0])
      updateUIMap("selectedItem", reagents[0]);
  }, [reagents]);

  return (
    <Headerbar>
      <div
        style={{
          position: "relative",
          width: "fit-content",
          blockSize: "fit-content",
        }}
      >
        {reagents.map((el) => (
          <div
            onClick={() => {
              updateUIMap("selectedItem", reagents[0]);
            }}
          >
            {el.name}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      ></div>
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
