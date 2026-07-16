import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import LandingCard from "./Content/LandingCard";
import "./Landing.css";
import Testimonials from "./Testimonials/Testimonials";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";

function Landing() {

    const content = [
        { title: "Bikers, you've found your base", content: "Brasov sits in the heart of Romania's best riding country: the Transfagarasan, the Transalpina and the winding passes of the Carpathians are all within a day's ride. At LaDespani your motorcycle sleeps under a roof in our secure indoor parking, your gear dries in our laundry, and your evenings wind down in the garden by the grill. We've been welcoming riders from all over Europe since 2007.", image: "parking.webp", link: "/facility" },
        { title: "Cozy and clean", content: "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.", image: "content1.webp", link: "/rooms" },
        { title: "Leave your worries at home!", content: "We've created a year-round oasis for you to enjoy in every season. From the moment you step into the garden, the air feels cooler in summer, cozier in winter, and nature surrounds you in vibrant shades of green, no matter the time of year.", image: "content2.webp", link: "/facility" },
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "@id": "https://ladespani.ro/#guesthouse",
        "name": "LaDespani Guesthouse",
        "url": "https://ladespani.ro/",
        "image": "https://ladespani.ro/images/landing1.jpg",
        "description": "Motorcycle-friendly guesthouse in Brasov, Romania with secure indoor parking for motorcycles and cars, cozy rooms with private bathrooms, garden, kitchen and laundry. Welcoming travellers and riders since 2007.",
        "telephone": "+40721373747",
        "email": "anudani241@hotmail.com",
        "foundingDate": "2007",
        "priceRange": "200-250 RON",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mihai Viteazul 128",
            "addressLocality": "Brasov",
            "postalCode": "500183",
            "addressCountry": "RO"
        },
        "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Secure indoor motorcycle parking", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Indoor car parking", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Guest kitchen", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Laundry", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Garden with grill / BBQ", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Safe deposit locker", "value": true }
        ],
        "sameAs": [
            "https://www.facebook.com/ladespani.guesthouse/",
            "https://www.instagram.com/ladespaniguesthouse/"
        ]
    };

    return <>
        <Seo title="Motorcycle-Friendly Guesthouse in Brasov, Romania | LaDespani" description="LaDespani is a motorcycle-friendly guesthouse in Brasov with secure indoor parking for your bike, cozy rooms, and a family welcome since 2007. Your base for the Transfagarasan and the Carpathians." canonical="https://ladespani.ro/" schema={schema} />
        <Header image="landing1.webp" selected={0} />
        <Reveal><h1 className="motto">A motorcycle-friendly guesthouse in Brasov — secure indoor parking for your bike, with room for cars too!</h1></Reveal>
        {content.map((item) => {
            return <Reveal key={item.title}><LandingCard title={item.title} content={item.content} image={item.image} link={item.link} /></Reveal>
        })}
        <Testimonials />
        <Footer />
    </>
}

export default Landing;