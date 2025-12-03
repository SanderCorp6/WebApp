function DashboardCard({ statistic, value, icon: Icon, color }) {
  return (
    <div className="dashboard-card">
      <div className="icon" style={{ backgroundColor: `${color || "gray"}` }}>
        {Icon && <Icon />}
      </div>
      <div className="details">
        <p className="statistic">{statistic}</p>
        <h2 className="value">{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;
