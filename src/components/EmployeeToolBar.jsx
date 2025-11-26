import { IoSearch } from "react-icons/io5";

const FilterButton = ({ value, filter, setFilter, color, defaultColor }) => {
    const isActive = filter === value;

    return (
        <button 
            className="filter-btn"
            style={{
                backgroundColor: isActive && color,
                color: isActive && defaultColor
            }}
            onClick={() => setFilter(value)} >
            {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </button>
    );
};


function EmployeeToolbar({ 
    searchTerm, setSearchTerm, 
    statusFilter, setStatusFilter, 
    sortBy, setSortBy, 
    onAddClick 
}) {
    const statusFilters = [
        { value: "All", color: "#6f6f6f" },
        { value: "Active", color: "#49de80" },
        { value: "Inactive", color: "#f57070" }
    ]

    const sortByOptions = [
        "name",
        "position",
        "department",
        "status",
        "date"
    ]

    return (
        <div className="filters-section">
            <div className="creation-and-search">
                <div className="search-bar">
                    <IoSearch className='icon'/>
                    <input 
                        type="text" 
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button onClick={onAddClick}>Add Employee</button>
            </div>

            <div className="filters">
                <div className="filter-item">
                    {/* status filters */}
                    <label>Status:</label>
                    {
                        statusFilters.map(({ value, color }) => 
                            <FilterButton 
                                key={value}
                                value={value}
                                setFilter={setStatusFilter}
                                filter={statusFilter}
                                color={color}
                                defaultColor="white" />
                        )
                    }
                </div>

                {/* sort by filters */}
                <div className="filter-item">
                    <label htmlFor="sortby-filter">Sort By:</label>
                    {
                        sortByOptions.map((value) => (
                            <FilterButton 
                                key={value}
                                value={value}
                                setFilter={setSortBy}
                                filter={sortBy}
                                color="#ebebeb"
                                defaultColor="black" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default EmployeeToolbar;