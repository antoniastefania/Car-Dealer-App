
import React, { useEffect, useState } from 'react';
const StatisticiVanzari = () => {

        <div>
            <h1>Statistici Vanzari</h1>
            <p>Aici vei putea vedea statistici despre vanzari.</p>
        </div>


    const [masini, setMasini] = useState([]);
    
        useEffect(() => {
            // Fetch data from the backend API
            fetch('http://localhost:5000/api/masini-vandute')
                .then(response => response.json())
                .then(data => setMasini(data))
                .catch(error => console.error('Error fetching data: ', error));
        }, []);


        return (
            <div>
                <h1>Statistici Vânzări</h1>
                <p>Mașini vândute</p>
                <table>
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
            </div>
        );


};

export default StatisticiVanzari;
