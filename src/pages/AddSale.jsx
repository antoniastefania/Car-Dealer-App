import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/addsale.css'; // Importăm fișierul CSS

const AddSale = () => {
    const [formData, setFormData] = useState({
        marca: '',
        model: '',
        numeClient: '',
        prenumeClient: '',
        numeAngajat: '',
        prenumeAngajat: '',
        dataVanzare: '',
        pretFinal: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/add-sale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Vânzare adăugată cu succes!');
                navigate('/view-sales'); // Redirecționăm înapoi la pagina ViewSales
            } else {
                alert('Eroare la adăugarea vânzării!');
            }
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    return (
        <div className="add-sale-container">
            <h1>Adaugă Vânzare</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleInputChange} required />
                <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleInputChange} required />
                <input type="text" name="numeClient" placeholder="Nume Client" value={formData.numeClient} onChange={handleInputChange} required />
                <input type="text" name="prenumeClient" placeholder="Prenume Client" value={formData.prenumeClient} onChange={handleInputChange} required />
                <input type="text" name="numeAngajat" placeholder="Nume Angajat" value={formData.numeAngajat} onChange={handleInputChange} required />
                <input type="text" name="prenumeAngajat" placeholder="Prenume Angajat" value={formData.prenumeAngajat} onChange={handleInputChange} required />
                <input type="date" name="dataVanzare" value={formData.dataVanzare} onChange={handleInputChange} required />
                <input type="number" name="pretFinal" placeholder="Preț Final" value={formData.pretFinal} onChange={handleInputChange} required />
                <button type="submit">Salvează</button>
            </form>
        </div>
    );
};

export default AddSale;
