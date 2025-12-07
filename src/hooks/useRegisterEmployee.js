import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerEmployee } from "../api/employeeService";

export const useRegisterEmployee = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",
    phone_number: "",
    address: "",
    position_id: "1",
    department_id: "1",
    role: "Employee",
    contract_type: "Full-time",
    supervisor_id: null,
    vacation_days_total: 20,
    salary: "",
    periodicity: "Monthly",
    cost_center: "CC-PROD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const register = async () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "address",
      "birth_date",
      "position_id",
      "department_id",
      "role",
      "contract_type",
      "vacation_days_total",
      "salary",
      "periodicity",
      "cost_center",
    ];

    const missingField = requiredFields.find((field) => !formData[field]);
    if (missingField) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerEmployee(formData);
      toast.success("Employee registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error registering employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    register,
    isSubmitting,
  };
};
