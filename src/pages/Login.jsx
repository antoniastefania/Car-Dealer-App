import React, { useState } from 'react';
import '../styles/login.css';
import loginImage from '../assets/all-images/login-image.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, parola }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = data.redirectTo; // Redirecționare către home/dashboard
            } else {
                setError(data.message || "Eroare la autentificare.");
            }
        } catch (error) {
            setError("Nu s-a putut conecta la server. Încearcă mai târziu.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        {error && <div className="error-message">{error}</div>}
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Parolă" value={parola} onChange={(e) => setParola(e.target.value)} required />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
