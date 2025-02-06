import React, { useEffect, useState } from 'react';
import '../styles/statistici-angajati.css'; 
const StatisticiAngajati = () => {
    const [angajati, setAngajati] = useState([]);
    const [angajatiCuVanzariMari, setAngajatiCuVanzariMari] = useState([]);

    // Încarcă angajații obișnuiți
    useEffect(() => {
        fetch('http://localhost:5000/api/angajatii-care-au-vandut')
            .then(response => response.json())
            .then(data => {
                console.log('Angajați și vânzări: ', data);
                setAngajati(data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    // Încarcă angajații care au vândut doar mașini cu preț mai mare decât media
    useEffect(() => {
        fetch('http://localhost:5000/api/angajatii-care-au-vandut-mai-mult-decat-media')
            .then(response => response.json())
            .then(data => {
                console.log('Angajați care au vândut mașini mai scumpe decât media: ', data);
                setAngajatiCuVanzariMari(data);
            })
            .catch(error => console.error('Error fetching data pentru angajații cu vânzări mari: ', error));
    }, []);

    return (
        <div>
            <h1>Statistici Angajați</h1>
            <p class="paragraph">Statistici despre angajații care au realizat vânzări.</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Total Vânzări</th>
                    </tr>
                </thead>
                <tbody>
                    {angajati.map(angajat => (
                        <tr key={`${angajat.nume}-${angajat.prenume}`}>
                            <td>{angajat.nume}</td>
                            <td>{angajat.prenume}</td>
                            <td>{angajat.TotalVanzari}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Tabelul cu angajații care au vândut doar mașini cu preț mai mare decât media */}
            <h2 class="paragraph">Angajații care au vândut doar mașini cu preț mai mare decât media</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Marca</th>
                        <th>Model</th>
                        <th>Media prețurilor</th>
                        <th>Preț final</th>
                    </tr>
                </thead>
                <tbody>
                    {angajatiCuVanzariMari.map(angajat => (
                        <tr key={`${angajat.nume}-${angajat.prenume}`}>
                            <td>{angajat.nume}</td>
                            <td>{angajat.prenume}</td>
                            <td>{angajat.marca}</td>
                            <td>{angajat.model}</td>
                            <td>{angajat.MediaPreturilor}</td>
                            <td>{angajat.pret_final}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticiAngajati;
