import '../styles/EmployeeDetailPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployee';
import PageHeader from '../components/PageHeader';
import { IoArrowBack } from "react-icons/io5";
import { FiSidebar, FiMail } from 'react-icons/fi';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { GoPencil } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";



function EmployeeDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { employee, isLoading, isError } = useEmployee(id);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [status, setStatus] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (employee) {
            setFirstName(employee.first_name);
            setLastName(employee.last_name);
            setStatus(employee.status)
        }
    }, [employee])

    if (isLoading) return <div className="loading-container">Loading...</div>;
    if (isError) return <div className="error-message">Error loading employee details.</div>;

    return (
        <div className="employee-detail-page">
            {/* <PageHeader title={`Employee > ${employee.full_name}`} /> */}
            <div id="view-info">
                <FiSidebar 
                    id="sidebar-icon" 
                    // onClick={toggleSidebar} 
                />
                <div className="header-content">
                    <p>Home</p>
                    <IoIosArrowForward className="arrow-icon" />
                    <p onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>Employees</p>
                    <IoIosArrowForward className="arrow-icon" />
                    <p className="page-title">{employee.full_name}</p>
                </div>
            </div>

            <div className='top-actions'>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <IoArrowBack />
                </button>

                <div>
                    {
                        !isEditing ?
                            <>
                                <button className='edit-btn' onClick={() => setIsEditing(true)}>
                                    <GoPencil className='icon' />
                                    <p>Edit</p>
                                </button>
                                <button className={`set-status-btn ${status.toLowerCase()}`} onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}>
                                    {`Set ${status === "Active" ? "Inactive" : "Active" }`}
                                </button>
                            </>
                        :
                            <button className='cancel-btn' onClick={() => setIsEditing(false)}>
                                <MdOutlineClose className='icon' />
                                <p>Cancel</p>
                            </button>
                    }

                </div>
            </div>

            <div className="detail-container">
                {/* EMPLOYEE HEADER */}
                <section className="employee-header cl-2">
                    <div className="employee-image">
                        {
                            employee.image_url ?
                            <img src={employee.image_url} alt="employee-image" /> 
                            :
                            `${employee.first_name?.charAt(0)}${employee.last_name?.charAt(0)}`
                        }
                    </div>

                    <div className="main-info">
                        <h1>{employee.full_name}</h1>
                        <p className='position'>{employee.position_name} | {employee.role}</p>
                        <div>
                            <p className={`status-tag ${status.toLowerCase()}`}>{status}</p>
                            <p>{`Employee ID: #${employee.id}`}</p>
                        </div>
                    </div>
                </section>

                {/* PERSONAL INFO */}
                <section className="personal-info">
                    <header>
                        <FiMail className='icon'/>
                        <h2>PERSONAL INFORMATION</h2>
                    </header>
                    <div className="forms-container">
                        <div className="form-input">
                            <label htmlFor="first-name">First Name</label>
                            <input 
                                type="text" 
                                placeholder='First Name'
                                name='first-name' 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={!isEditing} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="last-name">Last Name</label>
                            <input 
                                type="text" 
                                placeholder='Last Name'
                                name='last-name' 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={!isEditing} />
                        </div>
                    </div>
                </section>
                <section className="employment-info"></section>
                <section className="payroll-info"></section>
                <section className="vacation-info"></section>
                <section className="history-info cl-2"></section>
            </div>
        </div>
    );
}

export default EmployeeDetailPage;