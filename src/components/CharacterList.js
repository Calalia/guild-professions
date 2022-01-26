import React from "react";
import { connect } from "react-redux";
import { fetchCharactersAC } from "../ducks/characters";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import AddNewCharacterPage from "./AddNewCharacterPage";

function IndexPage(props) {
  const { fetchCharactersAC, characters, uiMap, updateUIMap } = props;
  React.useEffect(() => {
    fetchCharactersAC();
  }, []);
  return (
    <div>
      {uiMap.get("addNewCharacterOpen") ? <AddNewCharacterPage /> : ""}
      <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            console.log("addFunction triggered");
            updateUIMap("addNewCharacterOpen", true);
          },
          []
        )}
        listItems={characters}
      />
    </div>
  );
}
export default connect(
  (state) => ({
    characters: state.characters.get("characters"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchCharactersAC, updateUIMap }
)(IndexPage);
