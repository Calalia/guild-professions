import React from "react";
import { useHistory } from "react-router-dom";

function Headerbar(props) {
  const history = useHistory();
  return (
    <div>
      <div style={{ margin: "10px", backgroundColor: "lightgray" }}>
        <h1>Header</h1>
        <button
          onClick={(e) => {
            history.push("/reagents");
          }}
        >
          Items
        </button>
        <button
          onClick={(e) => {
            history.push("/recipes");
          }}
        >
          Recipes
        </button>
        <button
          onClick={(e) => {
            history.push("/prices");
          }}
        >
          Prices
        </button>
      </div>
      {props.children}
    </div>
  );
}

export default Headerbar;
