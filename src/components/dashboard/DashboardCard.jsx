function DashboardCard ({ statistic, value, icon, color }) {
    return (
        <div className="dashboard-card">
            <div className="icon" style={{ backgroundColor: `${color || 'gray'}` }}>
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