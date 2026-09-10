import "./DigitalCard.css";
import { Seo } from "../misc/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { BUSINESS } from "../data/site";

function DigitalCard() {
    const { c, lang, path } = useI18n();

    return <>
        <Seo page="card" lang={lang} />
        <div className="digital-card">
            <nav className="navbar">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <a href={path("home")}>{c.card.visitWebsite}</a>
            </nav>
            <div className="main-matter">
                <img src="/images/qr.webp" alt={c.card.qrAlt} />
                <div>
                    <div className="title">{BUSINESS.name}</div>
                    <div className="text">
                        <a className="info" href={BUSINESS.mapUrl} target="_blank" rel="noopener">{BUSINESS.streetAddress}</a>
                        <div className="info">{c.footer.address2}, {BUSINESS.postalCode}</div>
                        <a className="info" href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a>
                        <a className="info" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default DigitalCard;
