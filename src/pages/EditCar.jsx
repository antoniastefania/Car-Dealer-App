import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editcar.css';  // Importă fișierul CSS

const EditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState({
    marca: '',
    model: '',
    an_fabricatie: '',
    pret: '',
    kilometraj: '',
    status: '',
    descriere: '',
    url: ''
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-car/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/view-brands');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:5000/view-models');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchCarData();
    fetchBrands();
    fetchModels();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/edit-car/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Mașina a fost actualizată cu succes!');
        navigate('/view-cars');
      } else {
        alert('Eroare la actualizarea mașinii: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('A apărut o eroare la actualizarea mașinii.');
    }
  };

  return (
    <div className="edit-car-container">
      <h1>Editare Mașină</h1>
      <form onSubmit={handleSubmit}>
        <label>Marca:</label>
        <input
        type ="text"
          value={car.marca} disabled
          onChange={(e) => setCar({ ...car, marca: e.target.value })}
        />

        <label>Model:</label>
        <input
        type="text"
          value={car.model} disabled
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          />
      
    

        <label>An Fabricatie:</label>
        <input
          type="number"
          value={car.an_fabricatie}
          onChange={(e) => setCar({ ...car, an_fabricatie: e.target.value })}
        />

        <label>Preț:</label>
        <input
          type="number"
          value={car.pret}
          onChange={(e) => setCar({ ...car, pret: e.target.value })}
        />

        <label>Kilometraj:</label>
        <input
          type="number"
          value={car.kilometraj}
          onChange={(e) => setCar({ ...car, kilometraj: e.target.value })}
        />

        <label>Status:</label>
        <input
          type="text"
          value={car.status}
          onChange={(e) => setCar({ ...car, status: e.target.value })}
        />

        <label>Descriere:</label>
        <textarea
          value={car.descriere}
          onChange={(e) => setCar({ ...car, descriere: e.target.value })}
        />

        <label>URL Imagine:</label>
        <input
          type="text"
          value={car.url}
          onChange={(e) => setCar({ ...car, url: e.target.value })}
        />

        <button type="submit">Salvează modificările</button>
      </form>
    </div>
  );
};

export default EditCar;
