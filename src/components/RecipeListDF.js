import React from "react";
import { connect } from "react-redux";
import { fetchRecipesAC } from "../ducks/recipes";
import items from "../assets/Items.json";
import recipes from "../assets/Recipes.json";
import { updateUIMap } from "../ducks/ui";
import Headerbar from "./Headerbar";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentPage from "./AddNewReagentForm";

//inspiration amount floor(difficulty/2.85)
//silver skill floor(difficulty/1.67)

function RecipeListDF(props) {
  const { fetchRecipesAC, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchRecipesAC();
  }, []);

  return (
    <Headerbar>
      {/* <label>items</label>
      <textarea
        value={uiMap.get("dfItems")}
        onChange={(event) => updateUIMap("dfItems", event.target.value)}
      ></textarea>
      <br />
      <label>recipes</label>
      <textarea
        value={uiMap.get("dfRecipes")}
        onChange={(event) => updateUIMap("dfRecipes", event.target.value)}
      ></textarea>
      {uiMap.get("addNewRecipeOpen") ? <p>Add new Recipe</p> : ""} */}
      {/* <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            updateUIMap("addNewRecipeOpen", true);
          },
          []
        )}
        listItems={recipes}
      /> */}
      {(recipes &&
        recipes.map((el) => {
          var cost = el.input.reduce((pre, cur) => {
            var item = items.find((e1) => e1.name === cur.name);
            if (!item) return 0;
            return item.prices[0] * cur.quantity + pre;
          }, 0);
          var pay = el.output.reduce((pre, cur) => {
            var item = items.find((e1) => e1.name === cur.name);
            if (!item) return 0;
            return item.prices[0] * cur.quantity + pre;
          }, 0);
          return (
            <div
              key={el.name}
              style={{
                backgroundColor: cost < pay ? "lightgreen" : "red",
                border: "3px solid black",
                margin: "3px",
                padding: "3px",
              }}
            >
              {"name: " + el.name}
              <br /> {"cost: " + cost}
              <br /> {"pay: " + pay}
            </div>
          );
        })) || <pre>Invalid json</pre>}
    </Headerbar>
  );
}
export default connect(
  (state) => ({
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchRecipesAC, updateUIMap }
)(RecipeListDF);
