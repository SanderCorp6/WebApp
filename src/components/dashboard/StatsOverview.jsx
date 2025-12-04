import DashboardCard from "./DashboardCard";
import { UserCheck, UserX, Building2, Users } from "lucide-react";

function StatsOverview({ stats }) {
  const statsList = [
    { statistic: "Total Employees", value: stats.totalEmployees || 0, icon: Users, color: "#101828" },
    { statistic: "Active", value: stats.activeEmployees || 0, icon: UserCheck, color: "#10b981" },
    { statistic: "Inactive", value: stats.inactiveEmployees || 0, icon: UserX, color: "#ef4444" },
    { statistic: "Departments", value: stats.totalDepartments || 0, icon: Building2, color: "#3b82f6" },
  ];

  return (
    <div className="overview-section">
      {statsList.map((item) => (
        <DashboardCard
          key={item.statistic}
          statistic={item.statistic}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}
export default StatsOverview;
