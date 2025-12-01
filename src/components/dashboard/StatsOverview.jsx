import DashboardCard from './DashboardCard';
import { LuUsersRound, LuUserRoundCheck, LuUserRoundX, LuBuilding2 } from "react-icons/lu";

function StatsOverview({ stats }) {
    const statsList = [
        { statistic: 'Total Employees', value: stats.totalEmployees || 0, icon: LuUsersRound, color: '#6f6f6f' },
        { statistic: 'Active', value: stats.activeEmployees || 0, icon: LuUserRoundCheck, color: '#49de80' },
        { statistic: 'Inactive', value: stats.inactiveEmployees || 0, icon: LuUserRoundX, color: '#f57070' },
        { statistic: 'Departments', value: stats.totalDepartments || 0, icon: LuBuilding2, color: '#5491dc' },
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