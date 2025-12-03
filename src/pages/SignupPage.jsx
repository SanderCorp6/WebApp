import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import "../styles/LoginPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Administrator");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    toast.promise(signup(name, email, password, role), {
      loading: "Signing up...",
      success: () => {
        navigate("/");
        return "Successfully signed up!";
      },
      error: (err) => err.message || "Error signing up.",
    });
  };

  return (
    <main>
      <section id="forms-container">
        <div id="header">
          <h1>Welcome to Sander</h1>
          <h4>Please enter your details to sign up</h4>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="my_email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="your_secret_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="role">Role</label>
            <select type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Administrator">Administrator</option>
              <option value="RRHH">RRHH</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="signin-container">
            <button type="submit">Sign up</button>
            <p>
              You already have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignupPage;
