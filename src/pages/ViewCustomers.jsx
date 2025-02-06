import React, { useState, useEffect } from 'react';
import '../styles/viewcustomers.css';
import { useNavigate } from 'react-router-dom';

const ViewCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    // Funcția pentru a încărca datele clienților
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:5000/view-customers');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // Funcția pentru ștergerea unui client
    const deleteCustomer = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-customer/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                // Șterge clientul din lista locală după ce a fost șters cu succes din backend
                setCustomers(customers.filter(customer => customer.id_client !== id));
                alert('Client șters cu succes!');
            } else {
                alert('Eroare la ștergerea clientului: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('A apărut o eroare la ștergerea clientului.');
        }
    };

    const handleEdit = () => {
    };
        

    const handleAdd = () => {
        navigate('/add-customer');
    };

    return (
        <div className="view-customers-container">
            <h1>Vizualizare Clienți</h1>
            <table>
                <thead>
                    <tr>
                        <th className="th-customers">ID Client</th>
                        <th className="th-customers">Nume</th>
                        <th className="th-customers">Prenume</th>
                        <th className="th-customers">Telefon</th>
                        <th className="th-customers">Email</th>
                        <th className="th-customers">Adresă</th>
                        <th className="th-customers">Parola</th>
                        <th className="th-customers">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id_client}>
                            <td>{customer.id_client}</td>
                            <td>{customer.nume}</td>
                            <td>{customer.prenume}</td>
                            <td>{customer.telefon}</td>
                            <td>{customer.email}</td>
                            <td>{customer.adresa}</td>
                            <td>{customer.parola}</td>
                            <td className="actions">
                            <button
                                className="edit-btnn"
                                onClick={() => navigate(`/edit-customer/${customer.id_client}`)}>
                                Editează
                            </button>

                                <button 
                                    className="delete-btnn" 
                                    onClick={() => deleteCustomer(customer.id_client)}
                                >
                                    Șterge
                                </button>
                                <button
                                        className="add-btnn"
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

export default ViewCustomers;
