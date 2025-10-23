import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginScreen.css'

const API_URL = 'https://api.samuelconra.com'

function LoginScreen () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setIsModalVisible(true);
                throw new Error("Invalid email or password.");
            }

            const data = await response.json();

            if (data) {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.reload();
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleSingup = () => {
        navigate('/signup');
    }

    return (
        <main>
            <section id='forms-container' className={isModalVisible ? 'forms-error' : ''}>
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

                <form onSubmit={handleLogin}>
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

                    <div className="signin-container">
                        <button type='submit'>Sign in</button>
                        <p>Don't have an account? <a onClick={handleSingup}>Sign up</a></p>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default LoginScreen;