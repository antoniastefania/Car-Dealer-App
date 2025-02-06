import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/addcustomer.css';

const EditEmployee = () => {
    const { id } = useParams(); // Obține id-ul clientului din URL
    const [employee, setEmployee] = useState({
        nume: '',
        prenume: '',
        functie: '',
        parola: ''
    });
    const navigate = useNavigate();

    // Funcția pentru a prelua datele angajatului
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/view-employees`);
                const data = await response.json();
                const employeeToEdit = data.find(c => c.id_angajat === parseInt(id));
                if (employeeToEdit) {
                    setEmployee(employeeToEdit);
                }
            } catch (err) {
                console.error('Error fetching employee:', err);
            }
        };

        fetchEmployee();
    }, [id]);

    // Actualizează starea pentru fiecare câmp de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    // Salvează modificările clientului
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/edit-employee/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                alert('Angajat actualizat cu succes!');
                navigate('/view-employees'); // Redirecționează la lista de angajati
            } else {
                const errorData = await response.json();
                alert('Eroare la actualizare: ' + errorData.message);
            }
        } catch (err) {
            console.error('Error updating customer:', err);
            alert('A apărut o eroare la actualizarea angajatului.');
        }
    };

    return (
        <div className="add-customer-container">
            <h1>Editează Angajat</h1>
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

export default EditEmployee;
