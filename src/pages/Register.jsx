import React, { useState } from 'react';
import '../styles/register.css';
import registerImage from '../assets/all-images/registerImage.jpg';

const Register = () => {
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [email, setEmail] = useState('');
    const [adresa, setAdresa] = useState('');
    const [parola, setParola] = useState('');
    const [confirmParola, setConfirmParola] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [error, setError] = useState('');

    const validatePasswordStrength = (password) => {
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        const mediumPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (strongPassword.test(password)) return 'strong';
        if (mediumPassword.test(password)) return 'medium';
        return 'weak';
    };

    const handlePasswordChange = (password) => {
        setParola(password);
        setPasswordStrength(validatePasswordStrength(password));
    };

    const isEmailValid = (email) => {
        return email.endsWith('@gmail.com') || email.endsWith('@yahoo.com');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!isEmailValid(email)) {
            setError('Email-ul trebuie să fie @gmail.com sau @yahoo.com.');
            return;
        }

        if (passwordStrength === 'weak') {
            setError('Parola este prea slabă. Introdu o parolă medie sau puternică.');
            return;
        }

        if (parola !== confirmParola) {
            setError('Parolele nu coincid.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nume, prenume, telefon, email, adresa, parola }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = '/login'; // Redirecționare la login
            } else {
                setError(data.message || "Eroare la înregistrare.");
            }
        } catch (error) {
            setError("Nu s-a putut conecta la server. Încearcă mai târziu.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-image">
                    <img src={registerImage} alt="Register" />
                </div>
                <div className="register-box">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        {error && <div className="error-message">{error}</div>}
                        <input type="text" placeholder="Nume" value={nume} onChange={(e) => setNume(e.target.value)} required />
                        <input type="text" placeholder="Prenume" value={prenume} onChange={(e) => setPrenume(e.target.value)} required />
                        <input type="text" placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="text" placeholder="Adresă" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
                        <input 
                            type="password" 
                            placeholder="Parolă" 
                            value={parola} 
                            onChange={(e) => handlePasswordChange(e.target.value)} 
                            required 
                        />
                        <div className="password-strength">
                            <div 
                                className={`strength-bar ${passwordStrength}`} 
                                title={passwordStrength === 'strong' ? 'Puternică' : passwordStrength === 'medium' ? 'Medie' : 'Slabă'}
                            ></div>
                        </div>
                        <input 
                            type="password" 
                            placeholder="Confirmare parolă" 
                            value={confirmParola} 
                            onChange={(e) => setConfirmParola(e.target.value)} 
                            required 
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
