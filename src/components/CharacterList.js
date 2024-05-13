import React from "react";
import { connect } from "react-redux";
import {
  deleteCharacterAC,
  fetchCharactersAC,
  patchCharacterAC,
  postCharacterAC,
} from "../ducks/characters";
import { updateUIMap } from "../ducks/ui";
import DataBaseElementList from "./DatabaseElementList";
import DataBaseElementEditForm from "./DatabaseElementEditForm";
import AddNewCharacterPage from "./AddNewCharacterPage";
import Headerbar from "./Headerbar";

function CharacterPage(props) {
  const {
    fetchCharactersAC,
    deleteCharacterAC,
    patchCharacterAC,
    postCharacterAC,
    characters,
    uiMap,
    updateUIMap,
  } = props;
  React.useEffect(() => {
    fetchCharactersAC();
  }, []);
  var addSubmitFunction = React.useMemo(
    () => (element) => {
      postCharacterAC(element);
      updateUIMap("addNewCharacterOpen", false);
    },
    []
  );
  var addCancelFunction = React.useMemo(
    () => () => {
      updateUIMap("addNewCharacterOpen", false);
    },
    []
  );
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
    <Headerbar>
      {uiMap.get("editedCharacter") ? (
        <DataBaseElementEditForm
          editedElement={uiMap.get("editedCharacter")}
          submitFunction={submitFunction}
          cancelFunction={cancelFunction}
        />
      ) : (
        ""
      )}
      {uiMap.get("addNewCharacterOpen") ? (
        <div>
          <h3>Adding new Character</h3>
          <DataBaseElementEditForm
            editedElement={{
              charname: "",
              chargroup: null,
              profession1: null,
              profession2: null,
              p1_level: null,
              p2_level: null,
              c_level: null,
            }}
            submitFunction={addSubmitFunction}
            cancelFunction={addCancelFunction}
          />
        </div>
      ) : (
        ""
      )}
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
    </Headerbar>
  );
}
export default connect(
  (state) => ({
    characters: state.characters.get("characters"),
    uiMap: state.ui.get("uiMap"),
  }),
  {
    fetchCharactersAC,
    deleteCharacterAC,
    postCharacterAC,
    patchCharacterAC,
    updateUIMap,
  }
)(CharacterPage);
