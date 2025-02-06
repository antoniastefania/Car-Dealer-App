import React, { useState, useEffect } from 'react';
import '../styles/viewcars.css';
import { useNavigate } from 'react-router-dom';

const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [error, setError] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');
    const [marci, setMarci] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:5000/view-cars');
                const data = await response.json();

                if (response.ok) {
                    setCars(data);
                    setFilteredCars(data);  // Inițial, afișează toate mașinile
                } else {
                    setError('Nu s-au putut încărca mașinile.');
                }
            } catch (error) {
                setError('Nu s-a putut conecta la server. Încearcă mai târziu.');
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const fetchMarci = async () => {
            try {
                const response = await fetch('http://localhost:5000/marci'); // Endpoint pentru marci
                const data = await response.json();

                if (response.ok) {
                    setMarci(data);  // Setează lista de mărci disponibile
                } else {
                    setError('Nu s-au putut încărca mărcile.');
                }
            } catch (error) {
                setError('Nu s-a putut conecta la server pentru mărci.');
            }
        };

        fetchMarci();
    }, []);

    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setSelectedMarca(selectedMarca);

        // Filtrează mașinile pe baza mărcii selectate
        if (selectedMarca) {
            setFilteredCars(cars.filter(car => car.marca === selectedMarca));
        } else {
            setFilteredCars(cars); // Dacă nu este selectată nicio marcă, afișează toate mașinile
        }
    };

    const handleDelete = async (carId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-car/${carId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCars(cars.filter(car => car.id_masina !== carId));
                setFilteredCars(filteredCars.filter(car => car.id_masina !== carId));  // Actualizează și lista filtrată
            } else {
                setError('Nu s-a putut șterge mașina.');
            }
        } catch (error) {
            setError('Eroare la ștergerea mașinii.');
        }
    };

    const handleAdd = () => {
        navigate('/add-car');
    };

    return (
        <div className="view-cars-container">
            <h2>Mașini</h2>
            {error && <div className="error-message">{error}</div>}
    
            {/* Filtrare pe stânga */}
            <div className="filter-container">
                <label htmlFor="marca-select">Filtrează după marcă: </label>
                <select id="marca-select" value={selectedMarca} onChange={handleMarcaChange}>
                    <option value="">Toate mărcile</option>
                    {marci.map((marca) => (
                        <option key={marca.id_marca} value={marca.denumire}>
                            {marca.denumire}
                        </option>
                    ))}
                </select>
            </div>
    
            <table>
                <thead>
                    <tr>
                        <th className="th-cars">ID Mașină</th>
                        <th className="th-cars">Marcă</th>
                        <th className="th-cars">Model</th>
                        <th className="th-cars">An Fabricație</th>
                        <th className="th-cars">Preț</th>
                        <th className="th-cars">Kilometraj</th>
                        <th className="th-cars">Status</th>
                        <th className="th-cars">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                            <tr key={car.id_masina}>
                                <td>{car.id_masina}</td>
                                <td>{car.marca}</td>
                                <td>{car.model}</td>
                                <td>{car.an_fabricatie}</td>
                                <td>{car.pret}</td>
                                <td>{car.kilometraj}</td>
                                <td>{car.status}</td>
                                <td className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/edit-car/${car.id_masina}`)}
                                    >
                                        Editează
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(car.id_masina)}
                                    >
                                        Șterge
                                    </button>
                                    <button
                                        className="add-btn"
                                        onClick={handleAdd}
                                    >
                                        Adaugă
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Nu există mașini disponibile pentru această marcă.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
    
};

export default ViewCars;
