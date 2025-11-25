import EmployeeRow from './EmployeeRow';

function EmployeeTable({ employees }) {
    if (employees.length === 0) {
        return <p>No employees with this filter</p>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Hire Date</th>
                        <th>Salary</th>
                        <th>Actions</th>
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