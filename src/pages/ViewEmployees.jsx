import React, { useState, useEffect } from 'react';
import '../styles/viewemployees.css';  // Importăm fișierul CSS
import { useNavigate } from 'react-router-dom';

const ViewEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Funcția pentru a încărca datele angajaților
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/view-employees'); // API-ul backend pentru a aduce datele
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Funcția pentru ștergerea unui angajat
    const deleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-employee/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                // Șterge angajatul din lista locală după ce a fost șters cu succes din backend
                setEmployees(employees.filter(employee => employee.id_angajat !== id));
                alert('Angajat șters cu succes!');
            } else {
                alert('Eroare la ștergerea angajatului: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('A apărut o eroare la ștergerea angajatului.');
        }
    };

    const handleEdit = () => {
        
    };


    const handleAdd = () => {
        navigate('/add-employee');
    };

    return (
        <div className="view-employees-container">
            <h1>Vizualizare Angajați</h1>
            <table>
                <thead>
                    <tr>
                    <th className="th-employees">ID Angajat</th>
                    <th className="th-employees">Nume</th>
                    <th className="th-employees">Prenume</th>
                    <th className="th-employees">Funcție</th>
                    <th className="th-employees">Parola</th>
                    <th className="th-employees">Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id_angajat}>
                            <td>{employee.id_angajat}</td>
                            <td>{employee.nume}</td>
                            <td>{employee.prenume}</td>
                            <td>{employee.functie}</td>
                            <td>{employee.parola}</td>
                            <td className="actions-employees">
                            <button
                                className="editt-btn"
                                onClick={() => navigate(`/edit-employee/${employee.id_angajat}`)}>
                                Editează
                            </button>
                                <button 
                                    className="deletee-btn" 
                                    onClick={() => deleteEmployee(employee.id_angajat)}
                                >
                                    Șterge
                                </button>
                                <button
                                        className="addd-btn"
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

export default ViewEmployees;
