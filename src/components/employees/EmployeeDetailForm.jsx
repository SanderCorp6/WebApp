import { FiBriefcase, FiMail, FiDollarSign } from 'react-icons/fi';

import { FormInput, FormSelect } from '../ui/FormInput';
import { FormSection } from '../ui/FormSection';
import { EmployeeHeaderInfo } from './EmployeeHeaderInfo';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import EmployeeActionsBar from "./EmployeeActionsBar";

function EmployeeDetailForm({ 
    employee, 
    updateEmployee, 
    isUpdating, 
    positions, 
    departments, 
    employeesOptions 
}) {
    const {
        formData,
        isEditing,
        setIsEditing,
        handleInputChange,
        handleSave,
        handleCancel,
        handleToggleStatus
    } = useEmployeeForm(employee, updateEmployee);

    return (
        <>
            {/* Top Actions Bar */}
            <EmployeeActionsBar 
                isEditing={isEditing}
                isUpdating={isUpdating}
                status={employee.status}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
                onSave={handleSave}
                onToggleStatus={handleToggleStatus}
            />

            
            <div className="detail-container">
                <EmployeeHeaderInfo employee={employee} />

                {/* PERSONAL INFO */}
                <FormSection title="PERSONAL INFORMATION" icon={FiMail}>
                    <FormInput 
                        label="First Name" id="first_name" value={formData.first_name}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                    <FormInput 
                        label="Last Name" id="last_name" value={formData.last_name}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                    <FormInput 
                        className="cl-2" label="Email" id="email" type="email" value={formData.email}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                    <FormInput 
                        className="cl-2" label="Phone Number" id="phone_number" type="tel" value={formData.phone_number}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                    <FormInput 
                        className="cl-2" label="Address" id="address" value={formData.address}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                    <FormInput 
                        className="cl-2" label="Birth Date" id="birth_date" type="date" value={formData.birth_date}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating} 
                    />
                </FormSection>

                {/* EMPLOYMENT INFORMATION */}
                <FormSection title="EMPLOYMENT INFORMATION" icon={FiBriefcase}>
                    <FormSelect 
                        className="cl-2" label="Role" id="role" value={formData.role}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating}
                    >
                        <option value="Administrator">Administrator</option>
                        <option value="HR">HR</option>
                        <option value="Employee">Employee</option>
                    </FormSelect>
                    <FormSelect 
                        className="cl-2" label="Contract" id="contract_type" value={formData.contract_type}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating}
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Intern">Intern</option>
                    </FormSelect>
                                        
                    <FormSelect 
                        label="Position" id="position_id" value={formData.position_id}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating}
                    >
                        {positions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </FormSelect>
                    <FormSelect 
                        label="Department" id="department_id" value={formData.department_id}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating}
                    >
                        {departments.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </FormSelect>
                    <FormSelect 
                        label="Supervisor" id="supervisor_id" value={formData.supervisor_id}
                        onChange={handleInputChange} disabled={!isEditing || isUpdating}
                    >
                        <option value={""}>Without Supervisor</option>
                        {employeesOptions.map(({ id, full_name }) => <option key={id} value={id}>{full_name}</option>)}
                    </FormSelect>

                    <FormInput 
                        label="Hire Date" id="hire_date" type="date"
                        value={formData.hire_date} disabled 
                    />
                    {formData.termination_date && (
                        <FormInput 
                            label="Termination Date" id="termination_date" type="date"
                            value={formData.termination_date} disabled 
                        />
                    )}
                    
                    {formData.reentry_date && (
                        <FormInput 
                            label="Reentry Date" id="reentry_date" type="date"
                            value={formData.reentry_date} disabled 
                        />
                    )}
                </FormSection>

                <FormSection title="PAYROLL INFORMATION" icon={FiDollarSign}>

                </FormSection>
            </div>
        </>
    );
}

export default EmployeeDetailForm;