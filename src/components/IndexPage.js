import React from "react";
import { connect } from "react-redux";
import { fetchCharactersAC } from "../ducks/characters";

function IndexPage(props) {
  const { fetchCharactersAC, characters } = props;
  React.useEffect(() => {
    fetchCharactersAC();
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      <p>Here is the App</p>
      <pre>{JSON.stringify(characters, null, 2)}</pre>
    </div>
  );
}
export default connect(
  (state) => ({ characters: state.characters.get("characters") }),
  { fetchCharactersAC }
)(IndexPage);
