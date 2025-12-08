import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, Users } from "lucide-react";
import toast from "react-hot-toast";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.promise(login(email, password), {
      loading: "Signing in...",
      success: () => {
        navigate("/");
        return "Welcome Back!";
      },
      error: (err) => {
        return err.message || "Error signing in.";
      },
    });
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="header-icon">
            <Users size={27} />
          </div>

          <div className="header-text">
            <h1 className="header-title">Welcome to HR Sander</h1>
            <p className="header-subtitle">Sign in to manage your account</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={16} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

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

            {/* Remember Me & Forgot Password */}
            {/* <div className="form-footer">
              <div className="checkbox-group">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>

              <button type="button" className="forgot-password-link">
                Forgot password?
              </button>
            </div> */}

            <button type="submit" className="submit-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
