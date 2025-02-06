import React, { useState, useEffect } from 'react';
import '../styles/viewsales.css';  // Importăm fișierul CSS
import { useNavigate } from 'react-router-dom';
const ViewSales = () => {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    // Funcția pentru a încărca datele vânzărilor
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:5000/view-sales'); // API-ul backend pentru a aduce datele
                const data = await response.json();
                setSales(data);
            } catch (error) {
                console.error('Error fetching Sales:', error);
            }
        };
        fetchSales();
    }, []);

    const handleEdit = () => {
        
    };

    const handleDelete = async (saleId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-sale/${saleId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                alert('Vânzarea a fost ștearsă cu succes!');
                setSales((prevSales) => prevSales.filter((sale) => sale.id_vanzare !== saleId)); // Actualizăm lista locală de vânzări
            } else {
                alert('A apărut o eroare la ștergerea vânzării.');
            }
        } catch (error) {
            console.error('Error deleting sale:', error);
            alert('A apărut o eroare. Verificați backend-ul.');
        }
    };
    
        

    const handleAdd = () => {
        navigate('/add-sale');
    };

    return (
        <div className="view-sales-container">
            <h1>Vizualizare Vânzări</h1>
            <table>
                <thead>
                    <tr>
                        <th className="th-sales">ID Vânzare</th>
                        <th className="th-sales">Mașină</th>
                        <th className="th-sales">Client</th>
                        <th className="th-sales">Angajat</th>
                        <th className="th-sales">Data vânzării</th>
                        <th className="th-sales">Preț Final</th>
                        <th className="th-sales">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id_vanzare}>
                            <td>{sale.id_vanzare}</td>
                            <td>{sale.marca} {sale.model}</td>
                            <td>{sale.nume_client} {sale.prenume_client}</td>
                            <td>{sale.nume_angajat} {sale.prenume_angajat}</td>
                            <td>{sale.data_vanzare.split('T')[0]}</td>
                            <td>{sale.pret_final}</td>
                            <td className="actions-sales">
                            <button
                                className="editt-btnn"
                                onClick={() => navigate(`/edit-sale/${sale.id_vanzare}`)}>
                                Editează
                            </button>
                                    <button
                                        className="deletee-btnn"
                                        onClick={() => handleDelete(sale.id_vanzare)}
                                    >
                                        Șterge
                                    </button>

                                    <button
                                        className="addd-btnn"
                                        onClick={handleAdd}>
                                        Adaugă
                                    </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewSales;
