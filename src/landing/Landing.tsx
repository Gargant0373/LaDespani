import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import LandingCard from "./Content/LandingCard";
import "./Landing.css";
import Testimonials from "./Testimonials/Testimonials";

function Landing() {

    const content = [
        { title: "Cozy and clean", content: "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.", image: "content1.jpg" , link: "#rooms"},
        { title: "Leave your worries at home!", content: "We love relaxing and created an oasis for you to spend hot summer days at.From the moment you walk in the garden the temperature drops and everything turns green.", image: "content2.jpg", link: "#facility" },
    ]

    return <>
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