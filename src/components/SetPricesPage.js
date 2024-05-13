import React from "react";
import { connect } from "react-redux";
import { fetchReagentsAC, putReagentAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import items from "../assets/Items.json";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentForm from "./AddNewReagentForm";
import Headerbar from "./Headerbar";

function ReagentList(props) {
  const { fetchReagentsAC, putReagentAC, reagents, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchReagentsAC();
  }, []);
  React.useEffect(() => {
    if (!uiMap.get("selectedItem") && reagents && reagents[0])
      updateUIMap("selectedItem", reagents[0]);
  }, [reagents]);
  React.useEffect(() => {
    if (!uiMap.get("selectedItem")) return;
    for (let i = 0; i < uiMap.get("selectedItem").qualities; i++) {
      updateUIMap("PricesToSet" + i, uiMap.get("selectedItem").prices[i] || 0);
    }
  }, [uiMap.get("selectedItem")]);

  const priceSelects = (amount) => {
    var rows = [];
    for (let i = 0; i < amount; i++) {
      rows.push(
        <div key={i}>
          <label>price {i}</label>
          <input
            value={uiMap.get("PricesToSet" + i) || 0}
            onChange={(e) => updateUIMap("PricesToSet" + i, e.target.value)}
          ></input>
        </div>
      );
    }
    return rows;
  };
  return (
    <Headerbar>
      <div
        style={{
          height: "85vh",
          display: "flex",
          flexFlow: "row",
        }}
      >
        <div
          style={{
            height: "",
            overflowY: "auto",
          }}
        >
          {reagents.map((el) => (
            <div
              key={el._id}
              style={
                uiMap.get("selectedItem") &&
                uiMap.get("selectedItem")._id === el._id
                  ? { backgroundColor: "green" }
                  : {}
              }
              onClick={() => {
                updateUIMap("selectedItem", el);
              }}
            >
              {el.name}
            </div>
          ))}
        </div>
        <div
          style={{
            float: "left",
          }}
        >
          <pre>{JSON.stringify(uiMap.get("selectedItem"), null, 2)}</pre>
          {uiMap.get("selectedItem") ? (
            uiMap.get("selectedItem").qualities == 1 ? (
              <div>
                <label>price</label>
                <input
                  value={uiMap.get("PricesToSet0") || 0}
                  onChange={(e) => updateUIMap("PricesToSet0", e.target.value)}
                ></input>
              </div>
            ) : (
              priceSelects(uiMap.get("selectedItem").qualities)
            )
          ) : (
            ""
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              var item = uiMap.get("selectedItem");
              for (let i = 0; i < item.qualities; i++) {
                item.prices[i] = parseFloat(uiMap.get("PricesToSet" + i)) || 0;
              }
              putReagentAC(item);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Headerbar>
  );
}
export default connect(
  (state) => ({
    reagents: state.reagents.get("reagents"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchReagentsAC, putReagentAC, updateUIMap }
)(ReagentList);
