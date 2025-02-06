


import React from 'react'
import Slider from "react-slick"
import '../../styles/testimonial.css';

import ava01 from '../../assets/all-images/ava-1.jpg'
import ava02 from '../../assets/all-images/ava-2.jpg'
import ava03 from '../../assets/all-images/ava-3.jpg'
import ava04 from '../../assets/all-images/ava-4.jpg'


const Testimonial = () => {

        const settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            swipeToSlide: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
            {
                breakpoint: 991,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            ],
        };


        return <Slider {...settings}>

        <div className = 'testimonial py-4 px=3'>
            <p className='section__description'>
            Un dealer auto de încredere, cu servicii impecabile și un personal foarte bine pregătit.
            </p>
            <div className='mt-3 d-flex align-items-center gap-4'>
                <img src={ava01} alt="" className='w-25 h-25 rounded-2'/>
                <div>
                    <h6 className='mb-0 mt-3'> John Doe</h6>
                    <p className='section__description'>Client</p>

                </div>
            </div>
        </div>

        <div className = 'testimonial py-4 px=3'>
            <p className='section__description'>
            Recomand cu încredere acest dealer pentru selecția variată de mașini și pentru atenția acordată detaliilor.
            </p>
            <div className='mt-3 d-flex align-items-center gap-4'>
                <img src={ava02} alt="" className='w-25 h-25 rounded-2'/>
                <div>
                    <h6 className='mb-0 mt-3'> Anna Rey</h6>
                    <p className='section__description'>Client</p>

                </div>
            </div>
        </div>



        <div className = 'testimonial py-4 px=3'>
            <p className='section__description'>
            Mașina pe care am achiziționat-o a fost exact ce îmi doream, iar procesul de cumpărare a fost simplu și transparent.
            </p>
            <div className='mt-3 d-flex align-items-center gap-4'>
                <img src={ava03} alt="" className='w-25 h-25 rounded-2'/>
                <div>
                    <h6 className='mb-0 mt-3'> Robert Justin</h6>
                    <p className='section__description'>Client</p>

                </div>
            </div>
        </div>



        <div className = 'testimonial py-4 px=3'>
            <p className='section__description'>
            Serviciul de livrare a fost rapid și fără probleme, iar mașina arată exact ca în descriere!
            </p>
            <div className='mt-3 d-flex align-items-center gap-4'>
                <img src={ava04} alt="" className='w-25 h-25 rounded-2'/>
                <div>
                    <h6 className='mb-0 mt-3'> Jennifer Allan</h6>
                    <p className='section__description'>Client</p>

                </div>
            </div>
        </div>



        </Slider>
}

export default Testimonial;