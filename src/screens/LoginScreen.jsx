import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginScreen.css'

function LoginScreen () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalExiting, setIsModalExiting] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setIsModalVisible(true);

                setTimeout(() => {
                    setIsModalExiting(true);
                    setTimeout(() => {
                        setIsModalExiting(false);
                        setIsModalVisible(false);
                    }, 400);
                }, 3000);

                throw new Error("Credenciales inválidas");
            }

            const data = await response.json();

            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.reload();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleSingup = () => {
        navigate('/signup')
    }

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
                            placeholder='correo@gmail.com' 
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

            {
                isModalVisible && (
                    <section id='modal' className={ isModalExiting ? 'slide-out' : 'slide-in' }>
                        <i class="fa-solid fa-xmark" id='error-icon'></i>
                        <p>Invalid Credentials</p>
                    </section>
                )
            }
        </main>
    )
}

export default LoginScreen;