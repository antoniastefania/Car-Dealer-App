// import all images from assets/images directory
import img01 from "../all-images/cars-img/bmw-offer.png";
import img02 from "../all-images/cars-img/bugatti-offer.png";
import img03 from "../all-images/cars-img/cadillac-offer.png";
import img04 from "../all-images/cars-img/ferrari-offer.png";
import img05 from "../all-images/cars-img/lamborghini-offer.jpg";
import img06 from "../all-images/cars-img/mercedes-offer.png";
import img07 from "../all-images/cars-img/toyotaSupra-offer.png";
import img08 from "../all-images/cars-img/rollsRoyce-offer.png.jpg";

const carData = [
{
    id: 1,
    brand: "BMW",
    rating: 112,
    carName: "BMW M3",
    imgUrl: img01,
    model: "Model 3",
    price: 90000,
    speed: "0-100 km/h în 4.1 secunde",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    description:
    " Noul BMW M3 2024 combină puterea și performanța cu un design sportiv elegant. Dotat cu un motor de 3.0 litri twin-turbo, dezvoltă 473 CP, oferind o experiență de condus dinamică și plină de adrenalină. Interiorul luxos este echipat cu cele mai recente tehnologii, făcând fiecare călătorie confortabilă și plăcută.",
},

{
    id: 2,
    brand: "Bugatti",
    rating: 102,
    carName: "Bugatti Chiron Profilée",
    imgUrl: img02,
    model: "2024",
    price: 9792500,
    speed: "0-100 km/h în 2.5 secunde",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    description:
    " Bugatti Chiron Profilée 2024 este o mașină sport de lux, limitată, ce oferă o putere incredibilă de 1500 CP. Proiectată pentru performanță și eleganță, aceasta îmbină tehnologia avansată cu un design captivant. Cu un motor W16 de 8.0 litri, poate atinge viteze uimitoare, transformând fiecare călătorie într-o experiență de neuitat. Ideală pentru cei care apreciază excelența în inginerie și stil.",
},

{
    id: 3,
    brand: "Cadillac",
    rating: 132,
    carName: "Cadillac Escalade-V",
    imgUrl: img03,
    model: "2025",
    price: 150000,
    speed: "6.2 L V8",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    description:
    " Cadillac Escalade-V 2025 este un SUV de lux care combină puterea și stilul. Echipat cu un motor V8 de 6.2 litri, dezvoltă 682 CP, oferind o accelerare rapidă și o manevrabilitate excelentă. Interiorul său luxos include cele mai recente tehnologii de infotainment și confort, transformând fiecare călătorie într-o experiență plăcută. Este perfect pentru cei care doresc un vehicul cu performanțe superioare și un design impresionant.",
},

{
    id: 4,
    brand: "Ferrari",
    rating: 132,
    carName: "Ferrari 12 Cilindri",
    imgUrl: img04,
    model: "2024",
    price: 467550,
    speed: "7.0 L V12",
    gps: "GPS Navigation",
    seatType: "Sport seats",
    automatic: "Automatic",
    description:
    " Noul Ferrari 12 cilindri este un supercar cu un motor V12 care dezvoltă 820 CP. Acesta îmbină un design elegant cu tehnologie avansată, inclusiv aerodinamică activă și sisteme moderne de asistență. Mașina este disponibilă în două variante: coupe și cabriolet. Performanța sa impresionantă și stilul distinctiv îl fac un favorit printre pasionații de automobile de lux.",
},
{
    id: 5,
    brand: "Lamborghini",
    rating: 94,
    carName: "Lamborghini Urus Performante",
    imgUrl: img05,
    model: "2024",
    price: 321658,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Sport seats",
    automatic: "Automatic",
    description:
    " Lamborghini Urus Performante este un SUV de lux care combină performanța de top cu stilul extravagant. Cu un motor V8 puternic și un design aerodinamic, oferă o experiență de conducere excepțională. Interiorul este dotat cu scaune sport și tehnologie avansată, inclusiv sistem de navigație GPS, asigurând confort și funcționalitate pentru pasionații de automobile.",
},

{
    id: 6,
    brand: "Mercedes",
    rating: 119,
    carName: "Mercedes-AMG G 63",
    imgUrl: img06,
    model: "2024",
    price: 198770,
    speed: "7.5kmpl",
    gps: "GPS Navigation",
    seatType: " Leather seats",
    automatic: "Automatic",
    description:
    " Mercedes-AMG G 63 este un SUV de lux cu performanțe deosebite, având un motor V8 puternic și un design robust. Este echipat cu cele mai recente tehnologii, inclusiv un sistem avansat de navigație GPS. Interiorul spațios cu scaune din piele oferă confort și eleganță, făcând din G 63 o alegere ideală pentru cei care caută atât putere, cât și stil în călătoriile lor.",
},

{
    id: 7,
    brand: "Toyota",
    rating: 82,
    carName: "Toyota GR Supra",
    imgUrl: img07,
    model: "2023",
    price: 68000,
    speed: "10.5kmpl",
    gps: "GPS Navigation",
    seatType: "Sport seats",
    automatic: "Automatic",
    description:
    "Toyota Supra este un coupe sportiv emblematic, recunoscut pentru performanțele sale remarcabile și designul aerodinamic. Dotat cu un motor puternic și tehnologii moderne, Supra oferă o experiență de condus captivantă. Scaunele sport asigură confort și suport în timpul manevrelor rapide, iar sistemul de navigație GPS facilitează explorarea oricăror destinații. Este alegerea perfectă pentru pasionații de automobilism.",
},

{
    id: 8,
    brand: "Rolls Royce",
    rating: 52,
    carName: "Rolls Royce Spectre",
    imgUrl: img08,
    model: "2024",
    price: 413000,
    speed: "8.5kmpl",
    gps: "GPS Navigation",
    seatType: "Heated and Ventilated Seats",
    automatic: "Automatic",
    description:
    " Rolls Royce Spectre oferă o experiență de lux și rafinament, fiind echipat cu tehnologii de ultimă generație. Este dotat cu scaune încălzite și sistem de navigație GPS, asigurând confort și siguranță pe drum. Designul său elegant și performanțele remarcabile fac din Spectre o alegere de top pentru cei care caută excelență în fiecare detaliu.",
},
];

export default carData;