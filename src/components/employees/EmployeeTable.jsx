import EmployeeRow from "./EmployeeRow";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function EmployeeTable({ employees, sortBy, sortDir, onSort }) {
  if (employees.length === 0) {
    return <p>No employees with this filter</p>;
  }

  const columns = [
    { label: "NAME", key: "name" },
    { label: "POSITION", key: "position" },
    { label: "DEPARTMENT", key: "department" },
    { label: "STATUS", key: "status" },
    { label: "HIRE DATE", key: "date" },
    { label: "SALARY", key: "salary" },
    { label: "ACTIONS", key: null },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.label}
                onClick={() => col.key && onSort(col.key)}
                style={{ cursor: col.key ? "pointer" : "default", userSelect: "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {col.label}
                  {sortBy === col.key && (sortDir === "ASC" ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
