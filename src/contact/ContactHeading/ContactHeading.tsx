import "./ContactHeading.css";
import { useI18n } from "../../i18n/LanguageContext";
import LanguageSwitcher from "../../misc/LanguageSwitcher";

function ContactHeading() {
    const { c, path } = useI18n();

    return <>
        <nav className="contact-heading" aria-label={c.common.mainNav}>
            <div className="container">
                <a className="logo" href={path("home")}>
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </a>
                <div className="menu">
                    <a className="item" href={path("home")}>{c.common.goBack}</a>
                    <LanguageSwitcher />
                </div>
            </div>
            <div className="heading">{c.contact.heading}</div>
        </nav>
    </>
}

export default ContactHeading;
