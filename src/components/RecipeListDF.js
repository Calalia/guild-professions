import React from "react";
import { connect } from "react-redux";
import { fetchRecipesAC } from "../ducks/recipes";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentPage from "./AddNewReagentForm";

function RecipeListDF(props) {
  const { fetchRecipesAC, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchRecipesAC();
    updateUIMap(
      "dfItems",
      '[{"name":"bloom","qualities":3,"price":4.5},{"name":"potion","qualities":3,"price":20.0},{"name":"flask","qualities":3,"price":1.0}]'
    );
    updateUIMap(
      "dfRecipes",
      '[{"name":"makePotion1","difficulty":100,"input":[{"name":"bloom","quantity":2},{"name":"flask","quantity":5}],"output":[{"name":"potion","quantity":5}]}]'
    );
  }, []);

  var recipes;
  var items;
  try {
    recipes = JSON.parse(uiMap.get("dfRecipes"));
    items = JSON.parse(uiMap.get("dfItems"));
    console.log(items);
  } catch {
    recipes = false;
    items = false;
  }
  return (
    <div>
      <label>items</label>
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
      {uiMap.get("addNewRecipeOpen") ? <p>Add new Recipe</p> : ""}
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
            console.log(item);
            return item.price * cur.quantity + pre;
          }, 0);
          var pay = el.output.reduce((pre, cur) => {
            var item = items.find((e1) => e1.name === cur.name);
            console.log(item);
            return item.price * cur.quantity + pre;
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
    </div>
  );
}
export default connect(
  (state) => ({
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchRecipesAC, updateUIMap }
)(RecipeListDF);
