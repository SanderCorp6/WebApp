import { useDepartments } from "../../hooks/useDepartments";
import { usePositions } from "../../hooks/usePositions";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Search, Plus } from "lucide-react";

const FilterButton = ({ value, filter, setFilter, color, defaultColor }) => {
  const isActive = filter === value;

  return (
    <button
      style={{
        backgroundColor: isActive && color,
        color: isActive && defaultColor,
        borderColor: isActive && color,
      }}
      onClick={() => setFilter(value)}
    >
      {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
    </button>
  );
};

function EmployeeToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentId,
  setDepartmentId,
  positionId,
  setPositionId,
  onAddClick,
}) {
  const { departments } = useDepartments();
  const { positions } = usePositions();

  const statusFilters = [
    { value: "All", color: "#101828" },
    { value: "Active", color: "#10b981" },
    { value: "Inactive", color: "#ef4444" },
  ];

  return (
    <div className="filters-section">
      <div className="creation-and-search">
        <div className="search-bar">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search employees by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={onAddClick}>
          <Plus size={13} /> Add Employee
        </button>
      </div>

      <div className="filters">
        <div className="filter-item">
          {/* status filters */}
          <label>Status:</label>
          {statusFilters.map(({ value, color }) => (
            <FilterButton
              key={value}
              value={value}
              setFilter={setStatusFilter}
              filter={statusFilter}
              color={color}
              defaultColor="white"
            />
          ))}
        </div>

        <div className="filter-item">
          {/* department filters */}
          <label>Department:</label>
          <select onChange={(e) => setDepartmentId(e.target.value)} value={departmentId}>
            <option value="">All</option>
            {departments.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {departmentId && <IoCloseCircleSharp onClick={() => setDepartmentId("")} className="reset-filter-btn" />}
        </div>

        <div className="filter-item">
          {/* position filters */}
          <label>Position:</label>
          <select onChange={(e) => setPositionId(e.target.value)} value={positionId}>
            <option value="">All</option>
            {positions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {positionId && <IoCloseCircleSharp onClick={() => setPositionId("")} className="reset-filter-btn" />}
        </div>
      </div>
    </div>
  );
}
export default EmployeeToolbar;
