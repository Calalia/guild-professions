import React from "react";
import { connect } from "react-redux";
import { postReagentAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";

function AddNewReagentPage(props) {
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
            price: uiMap.get("newReagentFormPrice"),
          });
        }}
      >
        <input
          title="name"
          value={uiMap.get("newReagentFormName") || ""}
          onChange={(event) =>
            updateUIMap("newReagentFormName", event.target.value)
          }
        ></input>
        <input
          type="number"
          title="price"
          value={uiMap.get("newReagentFormPrice") || ""}
          onChange={(event) =>
            updateUIMap("newReagentFormPrice", event.target.value)
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
})(AddNewReagentPage);
