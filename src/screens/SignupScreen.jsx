import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginScreen.css'

function SignupScreen () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('RRHH Admin');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSingup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!response.ok) {
                setIsModalVisible(true);
                throw new Error("Server Error");
            }

            const data = await response.json();

            localStorage.setItem("user", JSON.stringify(data.user));
            navigate('/')
            window.location.reload();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <main>
            <section id='forms-container' className={isModalVisible ? 'forms-error': ''}>
                <div id="header">
                    <h1>Welcome Back</h1>
                    <h4>Please enter your details to sign in</h4>
                </div>

                {
                    isModalVisible && (
                        <div id="error-message">
                            <h4>{message}</h4>
                            <p>Please try again.</p>
                        </div>
                    )
                }

                <form onSubmit={handleSingup}>
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            name='name' 
                            placeholder='Your Name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            name='email' 
                            placeholder='my_email@gmail.com' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='your_secret_password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    <div className="input-container">
                        <label htmlFor="role">Role</label>
                        <select 
                            type="text" 
                            name='role' 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            required>
                            <option value="RRHH Admin">RRHH Admin</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <div className="signin-container">
                        <button type='submit'>Sign up</button>
                        <p>You already have an account? <a onClick={handleLogin}>Sign in</a></p>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default SignupScreen;