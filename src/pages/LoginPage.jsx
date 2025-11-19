import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/LoginPage.css';
import toast from 'react-hot-toast';

function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        toast.promise(
            login(email, password),
            {
                loading: 'Signing in...',
                success: () => {
                    navigate('/');
                    return 'Welcome Back!';
                },
                error: (err) =>{
                    console.log(err);
                    return err.message || 'Error signing in.'
                } 
            }
        );
    };

    return (
        <main>
            <section id='forms-container'>
                <div id="header">
                    <h1>Welcome Back</h1>
                    <h4>Please enter your details to sign in</h4>
                </div>

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