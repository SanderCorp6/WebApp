import { useState } from 'react';
import toast from 'react-hot-toast';

const mapEmployeeToForm = (employee) => ({
    first_name: employee.first_name || '',
    last_name: employee.last_name || '',
    email: employee.email || '',
    phone_number: employee.phone_number || '',
    address: employee.address || '',
    birth_date: employee.birth_date?.split('T')[0] || '',

    role: employee.role || '',
    position_id: employee.position_id || '',
    department_id: employee.department_id || '',
    contract_type: employee.contract_type || '',
    supervisor_id: employee.supervisor_id || '',
    hire_date: employee.hire_date?.split('T')[0] || '',
    termination_date: employee.termination_date?.split('T')[0] || null,
    reentry_date: employee.reentry_date?.split('T')[0] || null,
    
    salary: employee.salary || 0,
    payroll_key: employee.payroll_key || '',
    periodicity: employee.periodicity || '',
    cost_center: employee.cost_center || '',

    vacation_days_total: employee.vacation_days_total || 0,
    vacation_days_taken: employee.vacation_days_taken || 0,
});

export const useEmployeeForm = (employee, updateEmployee) => {
    const [formData, setFormData] = useState(() => mapEmployeeToForm(employee));
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setFormData(mapEmployeeToForm(employee));
        setIsEditing(false);
    };

    const handleSave = async () => {
        const emptyFields = Object.keys(formData).filter(key => {
            if (key === 'supervisor_id' || key === 'termination_date' || 
                key === 'reentry_date' || key === 'vacation_days_total' ||
                key === 'vacation_days_taken') {
                return false;
            }
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
            console.error(error);
        }
    };

    const handleToggleStatus = async () => {
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

    return {
        formData,
        isEditing,
        setIsEditing,
        handleInputChange,
        handleSave,
        handleCancel,
        handleToggleStatus
    };
};