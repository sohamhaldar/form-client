import NoEntry from "./noentry";
import { useState,useEffect } from "react";

const TableComponent = ({ data, onUpdate, onDelete,setRows }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const newCheckedRows = data.reduce((acc, row) => {
        acc[row._id] = true;
        return acc;
      }, {});
      setCheckedRows(newCheckedRows);
    } else {
      setCheckedRows(data.reduce((acc, row) => ({...acc, [row._id]: false }), {}))
    }
  };

  const handleRowCheckChange = (id) => {
    setCheckedRows((prevCheckedRows) => {
      const newValue =!prevCheckedRows[id];
      if (newValue) {
        const newRow = data.find((row) => row._id === id);
        return {...prevCheckedRows, [id]: true };
      } else {
        const newCheckedRows = {...prevCheckedRows };
        delete newCheckedRows[id];
        return newCheckedRows;
      }
    });
  };
  useEffect(() => {
    console.log(checkedRows);
    setRows(checkedRows);
  }, [checkedRows]);

  return (
    <div className="relative m-3 overflow-x-auto rounded-lg sm:rounded-lg">
      {data.length != 0? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Serial Number</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Hobbies</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-${index + 1}`}
                      type="checkbox"
                      checked={checkedRows[row._id]}
                      onChange={() => handleRowCheckChange(row._id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-table-${index + 1}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.phoneNumber}</td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.hobbies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoEntry />
      )}
    </div>
  );
};

export default TableComponent;