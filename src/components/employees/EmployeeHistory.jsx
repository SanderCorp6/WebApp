import { RiHistoryFill } from "react-icons/ri";

function EmployeeHistory (history) {
    return (
        <section className={`forms-section cl-2`}>
            <header>
                <RiHistoryFill className='icon'/>
                <h2>EMPLOYEE HISTORY</h2>
            </header>

            <div className="history-container">
            </div>
        </section>
    )
}

export default EmployeeHistory;