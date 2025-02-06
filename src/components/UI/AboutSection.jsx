


import React from 'react'
import { Container, Row,Col } from'reactstrap'
import '../../styles/about-section.css';
import aboutImg from '../../assets/all-images/cars-img/bmw-offer.png'

const AboutSection = ({aboutClass}) => {
    return ( <section className = 'about__section' style={aboutClass === 'aboutPage'
    ? {marginTop: '0px'} :
    {marginTop: '280px'}
    }>
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className= 'about__section-content'>
                    <h4 className="section__subtitle"> Despre noi</h4>
                    <h2 className="section__title">Ce ne face diferiți?</h2>
                    
                    <div className="about__section-item d-flex align-items-center">
                        <p className="section__DESCRIPTION d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Calitate Garantată
                        </p>

                        <p className="section__DESCRIPTION d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Servicii Personalizate
                        </p>


                    </div>


                    <div className="about__section-item d-flex align-items-center">
                        <p className="section__DESCRIPTION d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Oferte Competitive
                        </p>

                        <p className="section__DESCRIPTION d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Expertiza Noastră   
                        </p>


                    </div>


                    </div>
                    </Col>
                <Col lg='6' md='6'>
                <div className="about__img">
                <img src ={aboutImg}
                alt="" className="w-100"/>
                </div>
                </Col>
            </Row>
        </Container>
    </section>
    );
}

export default AboutSection