import { ArrowLeft, User, Mail, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeRegisterPage.css";
import { FormInput, FormSelect } from "../components/ui/FormInput";
import { usePositions } from "../hooks/usePositions";
import { useDepartments } from "../hooks/useDepartments";

function EmployeeRegisterPage() {
  const navigate = useNavigate();
  const { positions } = usePositions();
  const { departments } = useDepartments();

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
          <div className="section-header">
            <div className="icon-container">
              <User size={15} color="#364153" />
            </div>
            <h2>Personal Information</h2>
          </div>

          <div className="forms-container">
            <FormInput label="First Name" id="first_name" placeholder="Enter first name" />
            <FormInput label="Last Name" id="last_name" placeholder="Enter last name" />
            <FormInput
              label="Date of Birth"
              id="birth_date"
              placeholder="Enter last name"
              type="date"
              className={"cl-2"}
            />
          </div>
        </div>

        <div className="employee-form-section contact-info border-t">
          <div className="section-header">
            <div className="icon-container">
              <Mail size={15} color="#364153" />
            </div>
            <h2>Contact Information</h2>
          </div>

          <div className="forms-container">
            <FormInput
              label="Email Address"
              id="email"
              placeholder="email@company.com"
              className={"cl-2"}
              type="email"
            />
            <FormInput
              label="Phone Number"
              id="phone_number"
              placeholder="+52 477-000-0000"
              className={"cl-2"}
              type="tel"
            />
            <FormInput label="Address" id="address" placeholder="Enter full address" type="text" className={"cl-2"} />
          </div>
        </div>

        <div className="employee-form-section employment-info border-t">
          <div className="section-header">
            <div className="icon-container">
              <Briefcase size={15} color="#364153" />
            </div>
            <h2>Employment Details</h2>
          </div>

          <div className="forms-container">
            <FormSelect label="Position" id="position_id">
              {positions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormSelect>
            <FormSelect label="Department" id="department_id">
              {departments.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormSelect>
            <FormSelect label="Role" id="role">
              <option value="Administrator">Administrator</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </FormSelect>
            <FormSelect label="Contract" id="contract_type">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Intern">Intern</option>
            </FormSelect>
            <FormInput label="Vacation Days (Annual)" id="vacation_days_total" type="number" value={20} />
          </div>
        </div>

        <div className="employee-form-section employment-info border-t">
          <div className="section-header">
            <div className="icon-container">
              <DollarSign size={15} color="#364153" />
            </div>
            <h2>Compensation & Payroll</h2>
          </div>

          <div className="forms-container">
            <FormInput label="Salary" id="salary" type="number" placeholder="$0.00" />

            <FormSelect label="Periodicity" id="periodicity">
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </FormSelect>

            <FormSelect label="Cost Center" id="cost_center">
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
          <button className="cancel-employee-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="add-employee-btn">Add Employee</button>
        </div>
      </footer>
    </div>
  );
}

export default EmployeeRegisterPage;
