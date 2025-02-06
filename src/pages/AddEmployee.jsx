import React, { useState } from 'react';
import '../styles/addemployee.css'; // Asigură-te că stilurile sunt definite în acest fișier
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
            nume: '',
            prenume: '',
            functie: '',
            parola: ''
        });
        const navigate = useNavigate();
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setEmployee({ ...employee, [name]: value });
        };
    
        const handleSave = async () => {
            try {
                const response = await fetch('http://localhost:5000/add-employee', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employee),
                });
    
                if (response.ok) {
                    alert('Angajat adăugat cu succes!');
                    navigate('/view-employees'); // Redirecționează către pagina de vizualizare a clienților
                } else {
                    const errorData = await response.json();
                    alert('Eroare la adăugare: ' + errorData.message);
                }
            } catch (err) {
                console.error('Error adding employee:', err);
                alert('A apărut o eroare la adăugarea angajatului.');
            }
        };

        return (
            <div className="add-employee-container">
                <h1>Adaugă Angajat</h1>
                <form>
                    <input
                        type="text"
                        name="nume"
                        placeholder="Nume"
                        value={employee.nume}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="prenume"
                        placeholder="Prenume"
                        value={employee.prenume}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="functie"
                        placeholder="Functie"
                        value={employee.functie}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="parola"
                        placeholder="Parolă"
                        value={employee.parola}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={handleSave}>
                        Salvează
                    </button>
                </form>
            </div>
        );
};

export default AddEmployee;
