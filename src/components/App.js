import React from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import IndexPage from "./IndexPage";
import CharacterList from "./CharacterList";
import ReagentList from "./ReagentList";
import RecipeList from "./RecipeList";
import RecipeListDF from "./RecipeListDF";
import RecipePage from "./RecipePage";
import NinniPage from "./Ninnipage";

function App(props) {
  return (
    <div>
      <Switch>
        <Route path={"/characters"} component={CharacterList} />
        <Route path={"/reagents"} component={ReagentList} />
        <Route path={"/recipes"} component={RecipeListDF} />
        <Route path={"/recipes/:id"} component={RecipePage} />
        <Route path={"/ninni"} component={NinniPage} />
        <Route path={"/"} component={IndexPage} exact />
      </Switch>
    </div>
  );
}
export default connect((state) => {
  return {
    loading: state.ui.get("loading"),
  };
}, {})(App);
