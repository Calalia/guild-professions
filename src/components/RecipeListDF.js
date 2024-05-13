import React from "react";
import { connect } from "react-redux";
import { fetchRecipesAC } from "../ducks/recipes";
import { fetchReagentsAC } from "../ducks/reagents";
import { updateUIMap } from "../ducks/ui";
import Headerbar from "./Headerbar";

//inspiration amount floor(difficulty/2.85)
//silver skill floor(difficulty/1.67)

function RecipeListDF(props) {
  const {
    fetchRecipesAC,
    fetchReagentsAC,
    uiMap,
    updateUIMap,
    recipes,
    items,
  } = props;
  React.useEffect(() => {
    fetchRecipesAC();
    fetchReagentsAC();
  }, []);

  return (
    <Headerbar>
      {(recipes &&
        recipes.map((el) => {
          var cost = el.input.reduce((pre, cur) => {
            var item = items.find((e1) => e1.name === cur.name);
            if (!item) return 0;
            return Math.min.apply(Math, item.prices) * cur.quantity + pre;
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
    recipes: state.recipes.get("recipes"),
    prices: state.prices.get("prices"),
    items: state.reagents.get("reagents"),
  }),
  { fetchRecipesAC, fetchReagentsAC, updateUIMap }
)(RecipeListDF);
