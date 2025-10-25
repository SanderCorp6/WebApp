import { FiSidebar } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import '../styles/EmployeesPage.css'


function EmployeesPages () {
    return (
        <div className="employees-page">
            <div id="view-info">
                <FiSidebar id="sidebar-icon"/>
                <p>Home / Employees</p>
            </div>

            <div className="employees-content">
                <h1>Employees</h1>

                <div className="overview">
                    <div className="card">
                        <div className="overview-content main-info">
                            <div><FaUsers className="overview-icon"/><h3>Total</h3></div>
                            <p>48</p>
                        </div>

                        <div className="divider"></div>

                        <div className="overview-content details">
                            <div><h3>Active</h3><p>30</p></div>
                            <div className="divider"></div>
                            <div><h3>Inactive</h3><p>18</p></div>
                        </div>
                    </div>
                </div>

                <div className="employees-table">
                    <div className="headers">
                        <h3 className="selected">Active<span>(30)</span></h3>
                        <h3>Inactive<span>(18)</span></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeesPages;