import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editsale.css'; 

const EditSale = () => {
    const { id } = useParams(); // Obține id-ul vânzării din URL
    const [sale, setSale] = useState({
        marca: '',
        model: '',
        nume_client: '',
        prenume_client: '',
        nume_angajat: '',
        prenume_angajat: '',
        data_vanzare: '',
        pret_final: ''
    });
    const navigate = useNavigate();

    // Funcția pentru a prelua datele vânzării
    useEffect(() => {
        const fetchSale = async () => {
            try {
                const response = await fetch(`http://localhost:5000/view-sales`);
                const data = await response.json();
                const saleToEdit = data.find(s => s.id_vanzare === parseInt(id));
                if (saleToEdit) {
                    setSale(saleToEdit);
                }
            } catch (err) {
                console.error('Error fetching sale:', err);
            }
        };

        fetchSale();
    }, [id]);

    // Actualizează starea pentru fiecare câmp de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    };

    // Salvează modificările vânzării
    const handleSave = async () => {
            try {
                const response = await fetch(`http://localhost:5000/edit-sale/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sale),
                });
        
                if (response.ok) {
                    alert('Vânzare actualizată cu succes!');
                    navigate('/view-sales'); // Redirecționează la lista de vânzări
                } else {
                    const errorData = await response.json();
                    alert('Eroare la actualizare: ' + errorData.message);
                }
            } catch (err) {
                console.error('Error updating sale:', err);
                alert('A apărut o eroare la actualizarea vânzării.');
            }
        };
        

    return (
        <div className="edit-sale-container">
            <h1>Editează Vânzare</h1>
            <form>
                <input
                    type="text"
                    name="marca"
                    placeholder="Marca"
                    value={sale.marca}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={sale.model}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="nume_client"
                    placeholder="Nume Client"
                    value={sale.nume_client}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="prenume_client"
                    placeholder="Prenume Client"
                    value={sale.prenume_client}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="nume_angajat"
                    placeholder="Nume Angajat"
                    value={sale.nume_angajat}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="prenume_angajat"
                    placeholder="Prenume Angajat"
                    value={sale.prenume_angajat}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="data_vanzare"
                    placeholder="Data Vânzării"
                    value={sale.data_vanzare}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="pret_final"
                    placeholder="Preț Final"
                    value={sale.pret_final}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleSave}>
                    Salvează
                </button>
            </form>
        </div>
    );
};

export default EditSale;
