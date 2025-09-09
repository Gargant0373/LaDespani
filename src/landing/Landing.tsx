import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import LandingCard from "./Content/LandingCard";
import "./Landing.css";
import Testimonials from "./Testimonials/Testimonials";
import { Seo } from "../misc/Seo";

function Landing() {

    const content = [
        { title: "Cozy and clean", content: "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.", image: "content1.jpg" , link: "#rooms"},
        { title: "Leave your worries at home!", content: "We’ve created a year-round oasis for you to enjoy in every season. From the moment you step into the garden, the air feels cooler in summer, cozier in winter, and nature surrounds you in vibrant shades of green, no matter the time of year.", image: "content2.jpg", link: "#facility" },
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": "LaDespani Guesthouse",
        "url": "https://ladespani.ro/",
        "description": "Guesthouse in Brasov, Romania offering cozy rooms and facilities.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mihai Viteazul 128",
            "addressLocality": "Brasov",
            "addressCountry": "RO"
        }
    };

    return <>
        <Seo title="LaDespani Guesthouse | Cozy Accommodation in Brasov" description="Guesthouse in Brasov with comfortable rooms, friendly atmosphere, and modern facilities since 2007." canonical="https://ladespani.ro/" schema={schema} />
        <Header image="landing1.jpg" selected={0} />
        <div className="motto">Motorcycle friendly guesthouse, parking possible as well!</div>
        {content.map((item) => {
            return <LandingCard key={item.title} title={item.title} content={item.content} image={item.image} link={item.link}/>
        })}
        <Testimonials />
        <Footer />
    </>
}

export default Landing;