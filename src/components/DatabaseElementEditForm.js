import React from "react";
import { connect } from "react-redux";
import { updateUIMap } from "../ducks/ui";

function DataBaseElementEditForm(props) {
  const {
    editedElement,
    submitFunction,
    cancelFunction,
    uiMap,
    updateUIMap,
    valuesKey = "DataBaseElementEditFormValues",
  } = props;
  React.useEffect(() => {
    updateUIMap(valuesKey, JSON.parse(JSON.stringify(editedElement)));
  }, [editedElement]);

  return (
    <div>
      {submitFunction && uiMap.get(valuesKey) ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitFunction(JSON.parse(JSON.stringify(uiMap.get(valuesKey))));
          }}
        >
          {/* <header>{"Edit id:" + editedElement.id}</header> */}
          {Object.entries(uiMap.get(valuesKey))
            .filter(([key, value]) => key !== "id")
            .map(([key, value]) => (
              <div key={key}>
                <label>{key}</label>
                <br />
                <input
                  name={key}
                  value={value !== null ? value : ""}
                  onChange={(event) => {
                    updateUIMap(valuesKey, {
                      ...uiMap.get(valuesKey),
                      [event.target.name]: event.target.value,
                    });
                  }}
                ></input>
              </div>
            ))}
          <input value="save" type="submit"></input>
          <button onClick={cancelFunction}>cancel</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
export default connect(
  (state) => ({
    uiMap: state.ui.get("uiMap"),
  }),
  { updateUIMap }
)(DataBaseElementEditForm);
