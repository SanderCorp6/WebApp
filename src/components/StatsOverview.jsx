import DashboardCard from './DashboardCard';
import { LuUsersRound, LuUserRoundCheck, LuUserRoundX, LuBuilding2 } from "react-icons/lu";

function StatsOverview({ stats }) {
    const statsList = [
        { statistic: 'Total Employees', value: stats.totalEmployees || 0, icon: <LuUsersRound /> },
        { statistic: 'Active', value: stats.activeEmployees || 0, icon: <LuUserRoundCheck /> },
        { statistic: 'Inactive', value: stats.inactiveEmployees || 0, icon: <LuUserRoundX /> },
        { statistic: 'Departments', value: stats.totalDepartments || 0, icon: <LuBuilding2 /> },
    ];

    return (
        <div className="overview-section">
            {statsList.map((item) => (
                <DashboardCard
                    key={item.statistic}
                    statistic={item.statistic}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
        </div>
    );
}
export default StatsOverview;