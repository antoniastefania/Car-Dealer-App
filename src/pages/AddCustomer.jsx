import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/addcustomer.css';

const AddCustomer = () => {
    const [customer, setCustomer] = useState({
        nume: '',
        prenume: '',
        telefon: '',
        email: '',
        adresa: '',
        parola: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/add-customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });

            if (response.ok) {
                alert('Client adăugat cu succes!');
                navigate('/view-customers'); // Redirecționează către pagina de vizualizare a clienților
            } else {
                const errorData = await response.json();
                alert('Eroare la adăugare: ' + errorData.message);
            }
        } catch (err) {
            console.error('Error adding customer:', err);
            alert('A apărut o eroare la adăugarea clientului.');
        }
    };

    return (
        <div className="add-customer-container">
            <h1>Adaugă Client</h1>
            <form>
                <input
                    type="text"
                    name="nume"
                    placeholder="Nume"
                    value={customer.nume}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="prenume"
                    placeholder="Prenume"
                    value={customer.prenume}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="telefon"
                    placeholder="Telefon"
                    value={customer.telefon}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="adresa"
                    placeholder="Adresă"
                    value={customer.adresa}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="parola"
                    placeholder="Parolă"
                    value={customer.parola}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleSave}>
                    Salvează
                </button>
            </form>
        </div>
    );
};

export default AddCustomer;
