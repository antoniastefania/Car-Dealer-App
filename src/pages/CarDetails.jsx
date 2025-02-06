import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import carData from "../assets/data/carData";
import "../styles/cardetails.css";

const CarDetails = () => {
  const { slug } = useParams();
  const [cars, setCars] = useState([]); // Lista combinată de mașini
  const [singleCarItem, setSingleCarItem] = useState(null); // Mașina selectată

  // Preluarea datelor din backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/view-cars");
        const dbCars = await response.json();

        // Prelucrăm datele pentru frontend
        const updatedDbCars = dbCars.map((car) => ({
          ...car,
          imgUrl: `${car.url}`,
          carName: `${car.marca} ${car.model}`,
          model: `${car.an_fabricatie}`,
          automatic: "Automată",
          speed: `${car.kilometraj} km`,
          price: `${car.pret}`,
          description: `${car.descriere}`,
          rating: 5, // Valoare implicită pentru rating
          gps: `${car.status}`, // Exemplu de câmp implicit
          seatType: "Standard", // Exemplu de câmp implicit
          brand: `${car.marca}`, // Marca mașinii
        }));

        // Combinăm mașinile din frontend cu cele din backend
        setCars([...updatedDbCars, ...carData]);
      } catch (error) {
        console.error("Eroare la încărcarea mașinilor:", error);
      }
    };

    fetchCars();
  }, []);

  // Găsim mașina specifică pe baza slug-ului
  useEffect(() => {
    const car = cars.find((item) => item.carName === slug);
    setSingleCarItem(car);
  }, [slug, cars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  // Dacă nu există mașina, afișăm un mesaj de eroare
  if (!singleCarItem) {
    return <h2>Car not found</h2>;
  }

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={singleCarItem.imgUrl}
                alt={singleCarItem.carName}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.carName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {singleCarItem.price} €
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {singleCarItem.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.seatType}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
