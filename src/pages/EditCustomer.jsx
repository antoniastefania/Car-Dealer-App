import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/addcustomer.css';

const EditCustomer = () => {
    const { id } = useParams(); // Obține id-ul clientului din URL
    const [customer, setCustomer] = useState({
        nume: '',
        prenume: '',
        telefon: '',
        email: '',
        adresa: '',
        parola: ''
    });
    const navigate = useNavigate();

    // Funcția pentru a prelua datele clientului
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:5000/view-customers`);
                const data = await response.json();
                const customerToEdit = data.find(c => c.id_client === parseInt(id));
                if (customerToEdit) {
                    setCustomer(customerToEdit);
                }
            } catch (err) {
                console.error('Error fetching customer:', err);
            }
        };

        fetchCustomer();
    }, [id]);

    // Actualizează starea pentru fiecare câmp de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    // Salvează modificările clientului
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/edit-customer/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });

            if (response.ok) {
                alert('Client actualizat cu succes!');
                navigate('/view-customers'); // Redirecționează la lista de clienți
            } else {
                const errorData = await response.json();
                alert('Eroare la actualizare: ' + errorData.message);
            }
        } catch (err) {
            console.error('Error updating customer:', err);
            alert('A apărut o eroare la actualizarea clientului.');
        }
    };

    return (
        <div className="add-customer-container">
            <h1>Editează Client</h1>
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

export default EditCustomer;
