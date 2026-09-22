import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import BookingForm from "./BookingForm/BookingForm";
import "./Contact.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { BUSINESS } from "../data/site";

function Contact() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="contact" lang={lang} />
        <section className="contact">
            <Header title={c.contact.h1} showBook={false} />
            <div className="container">
                <Reveal>
                    <div className="main">
                        <h2 className="title">{c.contact.title}</h2>
                        <p className="text">{c.contact.text}</p>
                        {/* The fastest ways to reach the guesthouse come
                            before the form, not after it. */}
                        <div className="quick">
                            <a className="quick__call" href={`tel:${BUSINESS.telephone}`}>
                                <FaPhone aria-hidden="true" />
                                <span>
                                    <span className="quick__label">{c.contact.callNow}</span>
                                    <span className="quick__value">{BUSINESS.telephoneDisplay}</span>
                                </span>
                            </a>
                            <a className="quick__email" href={`mailto:${BUSINESS.email}`}>
                                <FaEnvelope aria-hidden="true" />
                                <span>
                                    <span className="quick__label">{c.contact.emailUs}</span>
                                    <span className="quick__value">{BUSINESS.email}</span>
                                </span>
                            </a>
                        </div>
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
                    </div>
                </Reveal>
            </div>
            <Footer />
        </section>
    </>;
}

export default Contact;
