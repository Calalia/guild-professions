import React from "react";
import { connect } from "react-redux";
import {
  deleteCharacterAC,
  fetchCharactersAC,
  patchCharacterAC,
} from "../ducks/characters";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import DataBaseElementEditForm from "./DatabaseElementEditForm";
import AddNewCharacterPage from "./AddNewCharacterPage";

function CharacterPage(props) {
  const {
    fetchCharactersAC,
    deleteCharacterAC,
    patchCharacterAC,
    characters,
    uiMap,
    updateUIMap,
  } = props;
  React.useEffect(() => {
    fetchCharactersAC();
  }, []);
  var submitFunction = React.useMemo(
    () => (element) => {
      patchCharacterAC(element);
      updateUIMap("editedCharacter", null);
    },
    []
  );
  var cancelFunction = React.useMemo(
    () => () => {
      updateUIMap("editedCharacter", null);
    },
    []
  );
  return (
    <div>
      {uiMap.get("editedCharacter") ? (
        <DataBaseElementEditForm
          editedElement={uiMap.get("editedCharacter")}
          submitFunction={submitFunction}
          cancelFunction={cancelFunction}
        ></DataBaseElementEditForm>
      ) : (
        ""
      )}
      {uiMap.get("addNewCharacterOpen") ? <AddNewCharacterPage /> : ""}
      <DataBaseElementList
        addFunction={React.useMemo(
          () => (event) => {
            console.log("addFunction triggered");
            updateUIMap("addNewCharacterOpen", true);
          },
          []
        )}
        updateFunction={React.useMemo(
          () => (element) => {
            //console.log("addFunction triggered");
            updateUIMap("editedCharacter", element);
          },
          []
        )}
        listItems={characters}
        deleteFunction={(char) => {
          deleteCharacterAC(char);
        }}
      />
    </div>
  );
}
export default connect(
  (state) => ({
    characters: state.characters.get("characters"),
    uiMap: state.ui.get("uiMap"),
  }),
  { fetchCharactersAC, deleteCharacterAC, patchCharacterAC, updateUIMap }
)(CharacterPage);
