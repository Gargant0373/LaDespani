import Footer from "../misc/Footer/Footer";
import BookingForm from "./BookingForm/BookingForm";
import "./Contact.css";
import ContactHeading from "./ContactHeading/ContactHeading";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { BUSINESS } from "../data/site";

function Contact() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="contact" lang={lang} />
        <section className="contact">
            <ContactHeading />
            <h1 className="visually-hidden">{c.contact.h1}</h1>
            <div className="container">
                <Reveal>
                    <div className="main">
                        <h2 className="title">{c.contact.title}</h2>
                        <p className="text">{c.contact.text}</p>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <BookingForm />
                </Reveal>
                <Reveal>
                    <div className="info">
                        <div className="line">{BUSINESS.streetAddress}, {BUSINESS.postalCode}</div>
                        <div className="line">{c.footer.address2}</div>
                        <div className="map">
                            <a href={BUSINESS.mapUrl} target="_blank" rel="noopener">{c.contact.viewMap}</a>
                        </div>
                        <br />
                        <div className="line">{c.contact.phone}: <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a></div>
                        <div className="line">{c.contact.email}: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></div>
                    </div>
                </Reveal>
            </div>
            <Footer />
        </section>
    </>;
}

export default Contact;
