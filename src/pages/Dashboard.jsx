import React from 'react';
import '../styles/dashboard.css';
import carsImage from '../assets/all-images/cars.jpg';
import registerImage from '../assets/all-images/register.jpg';
import adminImage from '../assets/all-images/admin.jpg';
import moneyImage from '../assets/all-images/money.png';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-sections">
                {/* Masini */}
                <section className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h2>Mașini</h2>
                            <img src={carsImage} alt="Masini" className="flip-card-image" />
                        </div>
                        <div className="flip-card-back">
                        <button className="buton" onClick={() => navigate('/view-cars')}>Vizualizare Mașini</button>
                            <button className="buton" onClick={() => navigate('/statistici-masini')}>Statistici Mașini</button>

                        </div>
                    </div>
                </section>

                {/* Clienti */}
                <section className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h2>Clienți</h2>
                            <img src={registerImage} alt="Clienti" className="flip-card-image" />
                        </div>
                        <div className="flip-card-back">
                        <button className="buton" onClick={() => navigate('/view-customers')}>Vizualizare Clienți</button>
                        <button className="buton" onClick={() => navigate('/statistici-clienti')}>Statistici Clienți</button>
                        </div>
                    </div>
                </section>

                {/* Angajati */}
                <section className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h2>Angajați</h2>
                            <img src={adminImage} alt="Angajati" className="flip-card-image" />
                        </div>
                        <div className="flip-card-back">
                            <button className="buton" onClick={() => navigate('/view-employees')}>Vizualizare Angajați</button>
                            <button className="buton" onClick={() => navigate('/statistici-angajati')}>Statistici Angajați</button>
                        </div>
                    </div>
                </section>

                {/* Vanzari */}
                <section className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h2>Vânzări</h2>
                            <img src={moneyImage} alt="Vanzari" className="flip-card-image" />
                        </div>
                        <div className="flip-card-back">
                            <button className="buton" onClick={() => navigate('/view-sales')}>Vizualizare Vânzări</button>
                            <button className="buton" onClick={() => navigate('/statistici-vanzari')}>Statistici Vânzări</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
