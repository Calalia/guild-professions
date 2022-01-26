import React from "react";

function DataBaseElementList(props) {
  const { listItems, addFunction } = props;
  return (
    <div>
      <table>
        <thead>
          <tr>
            {listItems && listItems[0] ? (
              Object.entries(listItems[0])
                .filter(([key, value]) => key !== "_id")
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
          {listItems.map((el) => (
            <tr className="databaseElementRow" key={el._id}>
              {Object.entries(el)
                .filter(([key, value]) => key !== "_id")
                .map(([key, value]) => (
                  <td key={key}>
                    <span>{value}</span>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      {addFunction ? <button onClick={addFunction}>Add new</button> : ""}
    </div>
  );
}
export default DataBaseElementList;
