import React from "react";
import { connect } from "react-redux";
import { fetchCharactersAC } from "../ducks/characters";
import { updateUIMap } from "../ducks/ui";

function IndexPage(props) {
  const { updateUiMap, recipe, uiMap } = props;

  return (
    <div>
      <div>
        <label>Name</label>
        <span>{recipe.name}</span>
      </div>
      <div>
        <label>Inputs</label>
        {}
      </div>
    </div>
  );
}
export default connect(
  (state, ownprops) => ({
    recipe: state.recipes
      .get("recipes")
      .find((el) => el._id === ownprops.match.params.id),
    uiMap: state.ui.get("uiMap"),
  }),
  { updateUIMap }
)(IndexPage);
