import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Lock, Eye, EyeOff, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import "../styles/LoginPage.css";

function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { activate } = useAuth();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Invalid activation token");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error("Password must contain uppercase, lowercase, and numbers");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.promise(activate(token, password), {
      loading: "Activating account...",
      success: () => {
        navigate("/");
        return "Account activated successfully!";
      },
      error: (err) => {
        navigate("/login");
        return err.message || "Error activating account.";
      },
    });
  };

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    match: password && confirmPassword && password === confirmPassword,
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="header-icon success">
            <UserCheck size={27} />
          </div>

          <div className="header-text">
            <h1 className="header-title">Activate Your Account</h1>
            <p className="header-subtitle-name">{`Welcome ${name}! Set your password to get started`}</p>
            <p className="header-subtitle-email">{email}</p>
          </div>
        </div>

        {/* Activation Form */}
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input password-input"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="form-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Password Requirements Visualization */}
            <div className="requirements-box">
              <p className="requirements-title">Password requirements:</p>
              <ul className="requirements-list">
                <li className={`requirement-item ${checks.length ? "met" : ""}`}>
                  <div className="requirement-dot" /> At least 8 characters
                </li>
                <li className={`requirement-item ${checks.upper ? "met" : ""}`}>
                  <div className="requirement-dot" /> One uppercase letter
                </li>
                <li className={`requirement-item ${checks.lower ? "met" : ""}`}>
                  <div className="requirement-dot" /> One lowercase letter
                </li>
                <li className={`requirement-item ${checks.number ? "met" : ""}`}>
                  <div className="requirement-dot" /> One number
                </li>
                <li className={`requirement-item ${checks.match ? "met" : ""}`}>
                  <div className="requirement-dot" /> Passwords match
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn success">
              Activate Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ActivateAccountPage;
