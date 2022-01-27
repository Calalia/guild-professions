import React from "react";
import { connect } from "react-redux";
import { fetchRecipesAC } from "../ducks/recipes";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import AddNewReagentPage from "./AddNewReagentForm";

function RecipeList(props) {
  const { fetchRecipesAC, recipes, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchRecipesAC();
  }, []);
  return (
    <div>
      {uiMap.get("addNewRecipeOpen") ? <p>Add new Recipe</p> : ""}
      <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            updateUIMap("addNewRecipeOpen", true);
          },
          []
        )}
        listItems={recipes}
      />
    </div>
  );
}
export default connect(
  (state) => ({
    recipes: state.recipes.get("recipes"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchRecipesAC, updateUIMap }
)(RecipeList);
