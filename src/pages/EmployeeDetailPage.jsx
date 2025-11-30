import '../styles/EmployeeDetailPage.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployee';
import PageHeader from '../components/PageHeader';
import { IoArrowBack } from "react-icons/io5";
import { FiSidebar, FiMail, FiSave } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { GoPencil } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import toast from 'react-hot-toast';
import { usePositions } from '../hooks/usePositions';
import { useDepartments } from '../hooks/useDepartments';
import { useEmployeeOptions } from '../hooks/useEmployeeOptions';


function EmployeeDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { employee, isLoading, isError, updateEmployee, isUpdating } = useEmployee(id);
    const { employeesOptions } = useEmployeeOptions();
    const { positions } = usePositions();
    const { departments } = useDepartments();
    const [isEditing, setIsEditing] = useState(false)
    const [status, setStatus] = useState('')
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        birth_date: '',
        
        role: '',
        position_id: '',
        department_id: '',
        contract_type: '',
        supervisor_id: '',
        hire_date: '',
        termination_date: '',
        reentry_date: '',
    });

    const fillFormData = () => {
        setFormData({
            first_name: employee.first_name || '',
            last_name: employee.last_name || '',
            email: employee.email || '',
            phone_number: employee.phone_number || '',
            address: employee.address || '',
            birth_date: employee.birth_date.split('T')[0]  || '',
            
            role: employee.role || '',
            position_id: employee.position_id || '',
            department_id: employee.department_id || '',
            contract_type: employee.contract_type || '',
            supervisor_id: employee.supervisor_id || '',
            hire_date: employee.hire_date.split('T')[0]  || '',
            termination_date: employee.termination_date ? employee.termination_date.split('T')[0] : '',
            reentry_date: employee.reentry_date ? employee.reentry_date.split('T')[0] : '',
        });
    }
    
    useEffect(() => {
        if (employee) {
            fillFormData();
            setStatus(employee.status);
        }
    }, [employee])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const emptyFields = Object.keys(formData).filter(key => {
            if (key === 'supervisor_id') return false; 
            return !formData[key]; 
        });

        if (emptyFields.length > 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        const hasChanges = Object.keys(formData).some(key => {
            let originalValue = employee[key];
            if (key === 'birth_date' && originalValue) {
                originalValue = originalValue.split('T')[0];
            }
            if (originalValue === null || originalValue === undefined) {
                originalValue = '';
            }
            return String(formData[key]) !== String(originalValue);
        });

        if (!hasChanges) {
            setIsEditing(false);
            return;
        }

        const payload = {
            ...formData,
            supervisor_id: formData.supervisor_id || null, 
        };

        try {
            await toast.promise(
                updateEmployee(payload),
                {
                    loading: 'Updating employee...',
                    success: `${formData.first_name} ${formData.last_name} successfully updated!`,
                    error: 'Error updating employee.',
                },
                {
                    position: 'bottom-right',
                    duration: 3000,
                    style: {
                        fontSize: '15px',
                    },
                    iconTheme: {
                        primary: '#000000ff',
                        secondary: '#FFFAEE',
                    },
                }
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving updates", error);
        }
    };

    const handleCancel = () => {
        if (employee) {
            fillFormData();
        }
        setIsEditing(false);
    };

    const handleToggleStatus = async () => {
        if (!employee) return;
        const newStatus = employee.status === "Active" ? "Inactive" : "Active";
        
        await toast.promise(
            updateEmployee({ ...employee, status: newStatus }),
            {
                loading: 'Updating employee...',
                success: `${formData.first_name} ${formData.last_name} is now ${newStatus}!`,
                error: 'Error updating employee.',
            },
            {
                position: 'bottom-right',
                duration: 3000,
                style: {
                    fontSize: '15px',
                },
                iconTheme: {
                    primary: '#000000ff',
                    secondary: '#FFFAEE',
                },
            }
        );
    };

    if (isLoading) return <div className="loading-container">Loading...</div>;
    if (isError) return <div className="error-message">Error loading employee details.</div>;
    if (!employee) return <div className="error-message">Employee not found.</div>;

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

            {/* Top Actions Bar */}
            <div className='top-actions'>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <IoArrowBack />
                </button>

                <div>
                    {
                        !isEditing ? (
                            <>
                                <button className='edit-btn' onClick={() => setIsEditing(true)}>
                                    <GoPencil className='icon' />
                                    <p>Edit</p>
                                </button>
                                <button className={`set-status-btn ${employee.status?.toLowerCase()}`} onClick={handleToggleStatus} disabled={isUpdating}>
                                    {`Set ${employee.status === "Active" ? "Inactive" : "Active" }`}
                                </button>
                            </>
                        ) : (
                            <>
                                <button className='cancel-btn' onClick={handleCancel}>
                                    <MdOutlineClose className='icon' />
                                    <p>Cancel</p>
                                </button>

                                <button 
                                    className='save-btn'
                                    onClick={handleSave}
                                    disabled={isUpdating} >
                                    <FiSave className='icon' />
                                    <p>{isUpdating ? 'Saving...' : 'Save Changes'}</p>
                                </button>
                            </>
                        )
                    }

                </div>
            </div>

            <div className="detail-container">
                {/* EMPLOYEE HEADER */}
                <section className="employee-header cl-2">
                    <div className="employee-image">
                        {
                            employee.image_url ?
                            <img src={employee.image_url} alt={`${employee.full_name}`} /> 
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
                <section className="personal-info forms-section">
                    <header>
                        <FiMail className='icon'/>
                        <h2>PERSONAL INFORMATION</h2>
                    </header>
                    <div className="forms-container">
                        <div className="form-input">
                            <label htmlFor="first_name">First Name</label>
                            <input 
                                id='first_name'
                                type="text" 
                                placeholder='First Name'
                                name='first_name' 
                                value={formData.first_name}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="last_name">Last Name</label>
                            <input 
                                id='last_name'
                                type="text" 
                                placeholder='Last Name'
                                name='last_name' 
                                value={formData.last_name}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                        <div className="form-input cl-2">
                            <label htmlFor="email">Email</label>
                            <input 
                                id='email'
                                type="email" 
                                placeholder='employee@gmail.com'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                        <div className="form-input cl-2">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input 
                                id='phone_number'
                                type="tel" 
                                placeholder='+52 477 123 4567'
                                name='phone_number'
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                        <div className="form-input cl-2">
                            <label htmlFor="address">Address</label>
                            <input 
                                id='address'
                                type="text" 
                                placeholder='Street, City, State, Zip Code'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                        <div className="form-input cl-2">
                            <label htmlFor="birth_date">Birth Date</label>
                            <input 
                                id='birth_date'
                                type="date" 
                                name='birth_date'
                                value={formData.birth_date}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} />
                        </div>
                    </div>
                </section>

                {/* EMPLOYMENT INFORMATION */}
                <section className="employment-info forms-section">
                    <header>
                        <FiMail className='icon'/>
                        <h2>EMPLOYMENT INFORMATION</h2>
                    </header>
                    <div className="forms-container">
                        <div className="form-input cl-2">
                            <label htmlFor="role">Role</label>
                            <select 
                                id="role" 
                                name="role" 
                                value={formData.role}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} >
                                <option value="Administrator">Administrator</option>
                                <option value="HR">HR</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>
                        <div className="form-input cl-2">
                            <label htmlFor="contract_type">Contract</label>
                            <select 
                                id="contract_type" 
                                name="contract_type" 
                                value={formData.contract_type}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="position_id">Position</label>
                            <select 
                                id="position_id" 
                                name="position_id" 
                                value={formData.position_id}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} >
                                {
                                    positions.map(({ id, name }) => 
                                        <option key={id} value={id}>{name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="department_id">Department</label>
                            <select 
                                id="department_id" 
                                name="department_id" 
                                value={formData.department_id}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} >
                                {
                                    departments.map(({ id, name }) => 
                                        <option key={id} value={id}>{name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="supervisor_id">Supervisor</label>
                            <select 
                                id="supervisor_id" 
                                name="supervisor_id" 
                                value={formData.supervisor_id}
                                onChange={handleInputChange}
                                disabled={!isEditing || isUpdating} >
                                <option value={""}>Without Supervisor</option>
                                {
                                    employeesOptions.map(({ id, full_name }) => 
                                        <option key={id} value={id}>{full_name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="hire_date">Hire Date</label>
                            <input 
                                id='hire_date'
                                type="date" 
                                name='hire_date'
                                value={formData.hire_date}
                                disabled />
                        </div>
                        {
                            formData.termination_date && (
                                <div className="form-input">
                                    <label htmlFor="termination_date">Termination Date</label>
                                    <input 
                                        id='termination_date'
                                        type="date" 
                                        name='termination_date'
                                        value={formData.termination_date}
                                        disabled />
                                </div>
                            )
                        }
                        {
                            formData.reentry_date && (
                                <div className="form-input">
                                    <label htmlFor="reentry_date">Reentry Date</label>
                                    <input 
                                        id='reentry_date'
                                        type="date" 
                                        name='reentry_date'
                                        value={formData.reentry_date}
                                        disabled />
                                </div>
                            )
                        }
                    </div>
                </section>
                <section className="payroll-info"></section>
                <section className="vacation-info"></section>
                <section className="history-info cl-2"></section>
            </div>
        </div>
    );
}

export default EmployeeDetailPage;