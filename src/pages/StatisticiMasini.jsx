import React, { useEffect, useState } from 'react';
import '../styles/statistici-masini.css';
import { FaTrophy } from 'react-icons/fa';
const StatisticiMasini = () => {
    const [populara, setPopulara] = useState(null);

    useEffect(() => {
        // Fetch data from the backend API
        fetch('http://localhost:5000/api/masina-populara')
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setPopulara(data[0]); // Presupunem că interogarea returnează un singur rezultat
                }
            })
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const [masini, setMasini] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        fetch('http://localhost:5000/api/masini-disponibile')
            .then(response => response.json())
            .then(data => setMasini(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h1>Statistici Mașini</h1>
            <p>Mașini disponibile</p>
            <table className="masini-table">
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Model</th>
                        <th>An Fabricatie</th>
                        <th>Preț</th>
                        <th>Kilometraj</th>
                    </tr>
                </thead>
                <tbody>
                    {masini.map(masina => (
                        <tr key={masina.id_masina}>
                            <td>{masina.Marca}</td>
                            <td>{masina.Model}</td>
                            <td>{masina.an_fabricatie}</td>
                            <td>{masina.pret}</td>
                            <td>{masina.kilometraj}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>Marca cea mai vândută</p>
            {populara ? (
                <table className="populara-table">
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Total Vânzări</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="client-name-with-icon">
                                <FaTrophy/>
                                {populara.Marca}
                                </div>
                            </td>
                            <td>{populara.TotalVanzari}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Încărcare...</p>
            )}
        </div>
    );
};

export default StatisticiMasini;
