import Footer from "../misc/Footer/Footer";
import BookingForm from "./BookingForm/BookingForm";
import "./Contact.css";
import ContactHeading from "./ContactHeading/ContactHeading";

function Contact() {
    return <>
        <section className="contact">
            <ContactHeading />
            <div className="container">
                <div className="main">
                    <div className="title">WE ARE HERE FOR YOU</div>
                    <div className="text">At LaDespani Guesthouse, we take our customers seriously. Do you have any enquiries, compaints
                        or requests, please call us and we will get back to you as soon as possible.</div>
                </div>
                <BookingForm />
                <div className="info">
                    <div className="line">Mihai Viteazul 128, 500183</div>
                    <div className="line">Brasov, Romania</div>
                    <div className="map"><a href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8" target="_blank">View map →</a></div>
                    <br />
                    <div className="line">Phone: <a href="tel:+40772269013">+40772269013</a></div>
                    <div className="line">Email: <a href="mailto:anudani241@hotmail.com">anudani241@hotmail.com</a></div>
                </div>
            </div>
            <Footer />
        </section>
    </>
}

export default Contact;