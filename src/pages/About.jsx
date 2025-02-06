

import React from 'react'


import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import AboutSection from '../components/UI/AboutSection';
import {Container, Row,Col} from'reactstrap'
import BecomeDriverSection from '../components/UI/BecomeDriverSection';


import driveImg from '../assets/all-images/drive.jpg'
import OurMembers from '../components/UI/OurMembers';
import '../styles/about.css';


const About = () => {
    return <Helmet title = 'About'>
        <CommonSection title='About Us'/>
        <AboutSection aboutClass='aboutPage'/>

        <section className = 'about__page-section'>
            <Container>
                <Row>
                    <Col lg = '6' md='6' sm='12'>
                        <div className = 'about__page-img'>
                                <img src = {driveImg} alt = " " className = "w-100 rounded-3"/>
                        </div>
                    </Col>


                    <Col lg = '6' md='6' sm='12'>
                        <div className = "about__page-content">
                            <h2 className = "section__title">We are commited to provide safe ride solutions

                            </h2>

                            <p className= "section__Description">
                            Suntem dedicați să oferim o experiență unică în achiziționarea de mașini. Cu o gamă largă de mărci și modele de mașini noi și second-hand, ne străduim să răspundem nevoilor și preferințelor fiecărui client. Indiferent dacă ești în căutarea unui SUV de familie, a unei mașini sport sau a unei opțiuni economice, la noi vei găsi întotdeauna ce ai nevoie.

Fiecare mașină este selectată cu grijă pentru a asigura calitate și performanță, iar echipa noastră de experți este mereu pregătită să îți ofere sfaturi personalizate. Ne dorim ca fiecare client să plece de pe site-ul nostru cu încrederea că a făcut alegerea potrivită. Explorează lista noastră extinsă de mașini și lasă-ne să te ajutăm să găsești vehiculul perfect pentru tine!



                            </p>

                            <p className= "section__Description">
                            credem că achiziționarea unei mașini nu este doar o tranzacție, ci o investiție importantă. De aceea, ne asigurăm că procesul de selecție este simplu și transparent, oferindu-ți informații detaliate despre fiecare vehicul. În plus, oferim opțiuni de finanțare flexibile și un serviciu excelent de asistență clienți, pentru ca tu să te simți susținut în fiecare pas al călătoriei tale de cumpărare. Fiecare mașină din oferta noastră este inspectată cu atenție, pentru a îți oferi siguranța și confortul de care ai nevoie. La noi, vei găsi nu doar un vehicul, ci partenerul perfect pentru călătoriile tale viitoare.

                            </p>


                            <div className = "d-flex align-items-center gap-3 mt-4">
                                <span className = 'fs-4'>
                                <i class="ri-phone-line"></i>
                                </span>
                                <div>
                                    <h6 className = 'section__subtitle'>Need Any Help?</h6>
                                    <h4>+00123456789</h4>
                                </div>
                            </div>

                        </div>
                    </Col>
                
                </Row>
            </Container>
        </section>

        <BecomeDriverSection/>
        <section>
            <Container>
                <Row>
                    <Col lg = '12' className = 'mb-5 text-center'>
                        <h6 className = 'section__subtitle'>Experts</h6>
                        <h2 className = 'section__title '>Our Members </h2>
                    </Col>
                    <OurMembers/>
                </Row>
            </Container>
        </section>
    </Helmet>
};

export default About;