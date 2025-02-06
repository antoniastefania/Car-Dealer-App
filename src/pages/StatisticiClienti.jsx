import React, { useState, useEffect } from 'react';
import '../styles/statistici-clienti.css';
import { FaTrophy } from 'react-icons/fa'; // Iconița pentru "Top 1"

const StatisticiClienti = () => {
    const [clientStats, setClientStats] = useState([]);
    const [highSpendingClients, setHighSpendingClients] = useState([]);
    const [error, setError] = useState('');
    const [celeMaiMulte, setCeleMaiMulte] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchClientStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/client-stats');
                const data = await response.json();

                if (response.ok) {
                    setClientStats(data);
                } else {
                    setError('Nu s-au putut încărca datele.');
                }
            } catch (error) {
                setError('Nu s-a putut conecta la server. Încearcă mai târziu.');
            }
        };

        fetchClientStats();
    }, []);

    useEffect(() => {
        const fetchHighSpendingClients = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/statistici-clienti');
                const data = await response.json();

                if (response.ok) {
                    setHighSpendingClients(data);
                } else {
                    setError('Nu s-au putut încărca datele pentru clienții care au cheltuit mai mult.');
                }
            } catch (error) {
                setError('Nu s-a putut conecta la server pentru datele suplimentare.');
            }
        };

        fetchHighSpendingClients();
    }, []);

    useEffect(() => {
        const fetchCeleMaiMulte = async () => {
            try {
                const response = await fetch('http://localhost:5000/clientul-cu-cele-mai-multe-achizitii');
                const data = await response.json();

                if (response.ok) {
                    setCeleMaiMulte(data);
                } else {
                    setError('Nu s-au putut încărca datele.');
                }
            } catch (error) {
                setError('Nu s-a putut conecta la server. Încearcă mai târziu.');
            }
        };

        fetchCeleMaiMulte();
    }, []);

    const filteredClients = highSpendingClients.filter(client => {
        const fullName = `${client.nume} ${client.prenume}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="centered-content">
            <h1>Statistici Clienți</h1>
            {error && <div className="error-message">{error}</div>}

            <h2>Clienții care au cumpărat cele mai scumpe mașini</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nume Client</th>
                        <th>Prenume Client</th>
                        <th>Marca Mașinii</th>
                        <th>Modelul Mașinii</th>
                        <th>Preț Final</th>
                    </tr>
                </thead>
                <tbody>
                    {clientStats.length > 0 ? (
                        clientStats.map((client, index) => (
                            <tr key={index}>
                                <td>{client.nume_client}</td>
                                <td>{client.prenume_client}</td>
                                <td>{client.marca}</td>
                                <td>{client.model}</td>
                                <td>{client.pret_final}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nu există date pentru clienții care au cumpărat cele mai scumpe mașini.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Clienții care au cheltuit mai mult decât media prețurilor</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Căutare client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nume Client</th>
                        <th>Prenume Client</th>
                        <th>Marca Mașinii</th>
                        <th>Modelul Mașinii</th>
                        <th>Media Prețurilor</th>
                        <th>Preț Final</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map((client, index) => (
                            <tr key={index}>
                                <td>{client.nume}</td>
                                <td>{client.prenume}</td>
                                <td>{client.marca}</td>
                                <td>{client.model}</td>
                                <td>{client.media_preturilor}</td>
                                <td>{client.pret_final}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Nu există date pentru clienții care au cheltuit mai mult decât media.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            
            {/* Tabelul cu clientul cu cele mai multe achiziții */}
            <h2>Clientul cu cele mai multe achiziții</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            
                                
                                Nume Client
                           
                        </th>
                        <th>Prenume Client</th>
                        <th>Total Achiziții</th>
                    </tr>
                </thead>
                <tbody>
                    {celeMaiMulte.length > 0 ? (
                        celeMaiMulte.map((client, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="client-name-with-icon">
                                        <FaTrophy/>
                                        {client.nume}
                                    </div>
                                </td>
                                <td>{client.prenume}</td>
                                <td>{client.TotalVanzari}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nu există date pentru clientul cu cele mai multe achiziții.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticiClienti;
