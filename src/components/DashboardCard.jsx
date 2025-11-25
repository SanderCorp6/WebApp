function DashboardCard ({ statistic, value, icon }) {
    const colors = {
        'Total Employees': '#6f6f6f',
        'Active': '#49de80',
        'Inactive': '#f57070',
        'Departments': '#5491dc'
    };

    return (
        <div className="dashboard-card">
            <div className="icon" style={{ backgroundColor: `${colors[statistic] || 'gray'}` }}>
                { icon }
            </div>
            <div className="details">
                <p className="statistic">{ statistic }</p>
                <h2 className="value">{ value }</h2>
            </div>
        </div>
    )
}

export default DashboardCard;