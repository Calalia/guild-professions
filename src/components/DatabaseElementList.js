import React from "react";

function DataBaseElementList(props) {
  const { listItems, addFunction, deleteFunction, updateFunction, filter } =
    props;
  //console.log(listItems);
  return (
    <div>
      {addFunction ? <button onClick={addFunction}>Add new</button> : ""}
      <table>
        <thead>
          <tr>
            {listItems && listItems[0] ? (
              Object.entries(listItems[0])
                .filter(([key, value]) => key !== "id")
                .map(([key, value]) => (
                  <th key={key}>
                    <span>{key.toLocaleUpperCase()}</span>
                  </th>
                ))
            ) : (
              <th>No entries</th>
            )}
          </tr>
        </thead>
        <tbody>
          {listItems
            .filter((el) => {
              if (!filter) return true;
              return Object.entries(filter).reduce((pre, [key, value]) => {
                if (value !== null && el[key] !== value) return false;
                return pre;
              }, true);
            })
            .map((el) => (
              <tr className="databaseElementRow" key={el.id}>
                {Object.entries(el)
                  .filter(([key, value]) => key !== "id")
                  .map(([key, value]) => (
                    <td key={key}>
                      {typeof value === "object" ? (
                        <pre>{JSON.stringify(value, null, 2)}</pre>
                      ) : (
                        <span>{value}</span>
                      )}
                    </td>
                  ))}
                {updateFunction ? (
                  <td>
                    <button
                      onClick={() => {
                        updateFunction(JSON.parse(JSON.stringify(el)));
                      }}
                    >
                      edit &#x270E;
                    </button>
                  </td>
                ) : null}
                {deleteFunction ? (
                  <td>
                    <button
                      onClick={() => {
                        deleteFunction(el);
                      }}
                    >
                      delete &#x1F5D1;
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default DataBaseElementList;
