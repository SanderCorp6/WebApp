import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/LoginPage.css';

function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsModalVisible(false);
        setMessage('');

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setMessage(error.message || 'Invalid email or password.');
            setIsModalVisible(true);
        }
    };

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
                        <p>Don't have an account? <Link to={"/signup"} className='link'>Sign up</Link></p>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default LoginPage;