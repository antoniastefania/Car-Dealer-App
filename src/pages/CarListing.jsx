import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import CarItemDB from "../components/UI/CarItemDB"; // Importăm CarItemDB
 // Importăm CarItem
import carData from "../assets/data/carData";
import Slider from "react-slick"; // Importăm Slider pentru carusel

const CarListing = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [sortedCars, setSortedCars] = useState([]);
  const [dbCars, setDbCars] = useState([]); // Mașinile din baza de date

  // Preluăm mașinile din baza de date
  useEffect(() => {
    const fetchDbCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/view-cars");
        const data = await response.json();

        // Afișăm datele brute preluate din backend
        console.log("Date brute din baza de date:", data);

        // Prelucrăm datele pentru frontend
        const updatedDbCars = data.map((car) => ({
          ...car,
          imgUrl: `${car.url}`,
          carName: `${car.marca} ${car.model}`,
          model: `${car.an_fabricatie}`, // Adăugăm anul de fabricație
          automatic: 'Automată', // Adăugăm informații de transmisie
          speed: `${car.kilometraj} km`, // Adăugăm kilometrajul
          price: `${car.pret}`, // Adăugăm prețul
          images: car.fotografii, // Presupunem că există un câmp `fotografii` în backend care conține multiple imagini
        }));

        // Afișăm datele procesate
        console.log("Date procesate pentru frontend:", updatedDbCars);

        setDbCars(updatedDbCars); // Salvăm mașinile actualizate
      } catch (error) {
        console.error("Eroare la încărcarea mașinilor din baza de date:", error);
      }
    };

    fetchDbCars();
  }, []);

  // Actualizăm lista de mașini sortată
  useEffect(() => {
    let allCars = [...carData, ...dbCars]; // Îmbinăm mașinile hardcodate cu cele din DB
    if (sortOrder === 'low') {
      allCars.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      allCars.sort((a, b) => b.price - a.price);
    }
    setSortedCars(allCars);
  }, [sortOrder, dbCars]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i>Sort By
                </span>
                <select onChange={handleSortChange}>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>
            {sortedCars.map((item) => (
              // Folosim CarItemDB pentru mașinile din baza de date, și CarItem pentru cele hardcodate
              item.images && item.images.length > 0 ? (
                <Col lg="4" md="6" sm="12" key={item.id_masina || item.id}>
                  <div className="car-item">
                    <Slider
                      dots={true}
                      infinite={true}
                      autoplay={true}
                      speed={1000}
                      autoplaySpeed={2000}
                      slidesToShow={1}
                      slidesToScroll={1}
                    >
                      {item.images.map((img, index) => (
                        <div key={index}>
                          <img src={img.calea_fisierului} alt={`Car ${item.carName}`} className="w-100" />
                        </div>
                      ))}
                    </Slider>
                    <h5>{item.carName}</h5>
                    <p>{item.price}</p>
                  </div>
                </Col>
              ) : (
                <CarItemDB item={item} key={item.id_masina || item.id} />
              )
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
