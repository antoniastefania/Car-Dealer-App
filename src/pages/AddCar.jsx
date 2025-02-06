import React, { useState } from "react";
import '../styles/addcar.css'; // Importă stilurile pentru AddCar
import AddCarImage from '../assets/all-images/purple_lamborghini.jpg';

const AddCar = () => {
    const [marca, setMarca] = useState("");
    const [model, setModel] = useState("");
    const [anFabricatie, setAnFabricatie] = useState("");
    const [pret, setPret] = useState("");
    const [kilometraj, setKilometraj] = useState("");
    const [descriere, setDescriere] = useState("");
    const [fotografii, setFotografii] = useState(""); // Câmp text pentru căi
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const carData = {
            marca,
            model,
            anFabricatie,
            pret,
            kilometraj,
            descriere,
            fotografii, // Transmitem șirul complet
        };

        try {
            const response = await fetch("http://localhost:5000/add-car", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(carData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setMarca("");
                setModel("");
                setAnFabricatie("");
                setPret("");
                setKilometraj("");
                setDescriere("");
                setFotografii(""); // Resetăm câmpul
            } else {
                setMessage(data.message || "A apărut o eroare.");
            }
        } catch (error) {
            setMessage("Eroare la conectarea la server. Încercați din nou.");
            console.error("Eroare:", error);
        }
    };

    return (
        <div className="addcar-container">
            <div className="addcar-content">
                <div className="addcar-image">
                    <img src={AddCarImage} alt="Add Car" />
                </div>
                <div className="addcar-box">
                    <h2>Adaugă o mașină</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
                        <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
                        <input type="number" placeholder="An fabricație" value={anFabricatie} onChange={(e) => setAnFabricatie(e.target.value)} />
                        <input type="number" placeholder="Preț" value={pret} onChange={(e) => setPret(e.target.value)} />
                        <input type="number" placeholder="Kilometraj" value={kilometraj} onChange={(e) => setKilometraj(e.target.value)} />
                        <textarea placeholder="Descriere" value={descriere} onChange={(e) => setDescriere(e.target.value)}></textarea>
                        <input
                            type="text"
                            placeholder="Introduceți URL-urile imaginilor separate prin virgulă"
                            value={fotografii}
                            onChange={(e) => setFotografii(e.target.value)}
                        />
                        <button type="submit">Adaugă mașină</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddCar;


