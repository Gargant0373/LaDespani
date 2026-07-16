import Footer from "../misc/Footer/Footer";
import BookingForm from "./BookingForm/BookingForm";
import "./Contact.css";
import ContactHeading from "./ContactHeading/ContactHeading";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";

function Contact() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact LaDespani Guesthouse",
        "description": "Get in touch with LaDespani Guesthouse in Brasov for bookings and enquiries.",
        "publisher": {"@type": "Organization", "name": "LaDespani Guesthouse"},
        "url": "https://ladespani.ro/contact"
    };

    return <>
        <Seo title="Contact & Booking | LaDespani Motorcycle-Friendly Guesthouse Brasov" description="Book a room at LaDespani Guesthouse in Brasov: call, email, or use our booking form. Motorcycle riders welcome — secure indoor parking for your bike." canonical="https://ladespani.ro/contact" schema={schema} />
        <section className="contact">
            <ContactHeading />
            <div className="container">
                <Reveal>
                    <div className="main">
                        <div className="title">WE ARE HERE FOR YOU</div>
                        <div className="text">At LaDespani Guesthouse, we take our guests seriously. If you have any enquiries, complaints
                            or requests, please call us and we will get back to you as soon as possible. Travelling by motorcycle? Let us know and we'll have a spot in the indoor parking ready for your bike.</div>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <BookingForm />
                </Reveal>
                <Reveal>
                    <div className="info">
                        <div className="line">Mihai Viteazul 128, 500183</div>
                        <div className="line">Brasov, Romania</div>
                        <div className="map"><a href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8" target="_blank">View map →</a></div>
                        <br />
                        <div className="line">Phone: <a href="tel:+40721373747">+40721373747</a></div>
                        <div className="line">Email: <a href="mailto:anudani241@hotmail.com">anudani241@hotmail.com</a></div>
                    </div>
                </Reveal>
            </div>
            <Footer />
        </section>
    </>;
}

export default Contact;