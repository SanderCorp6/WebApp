import { ArrowLeft, User, Mail, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeRegisterPage.css";
import { FormInput, FormSelect } from "../components/ui/FormInput";
import { usePositions } from "../hooks/usePositions";
import { useDepartments } from "../hooks/useDepartments";
import { useEmployeeOptions } from "../hooks/useEmployeeOptions";
import { useRegisterEmployee } from "../hooks/useRegisterEmployee";

const SectionHeader = ({ title, icon: Icon }) => {
  return (
    <div className="section-header">
      <div className="icon-container">
        <Icon size={15} color="#364153" />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

function EmployeeRegisterPage() {
  const navigate = useNavigate();

  const { positions } = usePositions();
  const { departments } = useDepartments();
  const { employeesOptions } = useEmployeeOptions();

  const { formData, handleChange, register, isSubmitting } = useRegisterEmployee();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="employee-register-page">
      <div className="main-content">
        <div className="page-header">
          <button onClick={handleCancel}>
            <ArrowLeft size={18} color="#364153" />
          </button>

          <div className="page-info">
            <h1>Add New Employee</h1>
            <p>Fill in the employee information below</p>
          </div>
        </div>

        <div className="employee-form-section personal-info">
          <SectionHeader title={"Personal Information"} icon={User} />

          <div className="forms-container">
            <FormInput
              label="First Name"
              id="first_name"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <FormInput
              label="Last Name"
              id="last_name"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <FormInput
              label="Date of Birth"
              id="birth_date"
              placeholder="Enter last name"
              type="date"
              className={"cl-2"}
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="employee-form-section contact-info border-t">
          <SectionHeader title={"Contact Information"} icon={Mail} />

          <div className="forms-container">
            <FormInput
              label="Email Address"
              id="email"
              placeholder="email@company.com"
              className={"cl-2"}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              label="Phone Number"
              id="phone_number"
              placeholder="+52 477-000-0000"
              className={"cl-2"}
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <FormInput
              label="Address"
              id="address"
              placeholder="Enter full address"
              type="text"
              className={"cl-2"}
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="employee-form-section employment-info border-t">
          <SectionHeader title={"Employment Details"} icon={Briefcase} />

          <div className="forms-container">
            <FormSelect label="Position" id="position_id" value={formData.position_id} onChange={handleChange}>
              {positions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormSelect>
            <FormSelect label="Department" id="department_id" value={formData.department_id} onChange={handleChange}>
              {departments.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormSelect>
            <FormSelect label="Role" id="role" value={formData.role} onChange={handleChange}>
              <option value="Administrator">Administrator</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </FormSelect>
            <FormSelect label="Supervisor" id="supervisor_id" value={formData.supervisor_id} onChange={handleChange}>
              <option value="">Select Supervisor</option>
              {employeesOptions.map(({ id, full_name }) => (
                <option key={id} value={id}>
                  {full_name}
                </option>
              ))}
            </FormSelect>
            <FormSelect label="Contract" id="contract_type" value={formData.contract_type} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Intern">Intern</option>
            </FormSelect>
            <FormInput
              label="Vacation Days (Annual)"
              id="vacation_days_total"
              type="number"
              value={formData.vacation_days_total}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="employee-form-section employment-info border-t">
          <SectionHeader title={"Compensation & Payroll"} icon={DollarSign} />

          <div className="forms-container">
            <FormInput
              label="Salary"
              id="salary"
              type="number"
              placeholder="$0.00"
              value={formData.salary}
              onChange={handleChange}
            />

            <FormSelect label="Periodicity" id="periodicity" value={formData.periodicity} onChange={handleChange}>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </FormSelect>

            <FormSelect label="Cost Center" id="cost_center" value={formData.cost_center} onChange={handleChange}>
              <option value="CC-DES">CC-DES</option>
              <option value="CC-PROD">CC-PROD</option>
              <option value="CC-ADM">CC-ADM</option>
              <option value="CC-DES">CC-DES</option>
            </FormSelect>
          </div>
        </div>
      </div>

      <footer>
        <p>
          <span>*</span> Required Fields
        </p>

        <div className="actions">
          <button className="cancel-employee-btn" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button className="add-employee-btn" onClick={register} disabled={isSubmitting}>
            Add Employee
          </button>
        </div>
      </footer>
    </div>
  );
}

export default EmployeeRegisterPage;
