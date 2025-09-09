import "./DigitalCard.css";
import { Seo } from "../misc/Seo";

function DigitalCard() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Digital Contact Card - LaDespani Guesthouse",
        "description": "Quick contact and location information for LaDespani Guesthouse in Brasov, Romania.",
        "url": "https://ladespani.ro/card"
    };

    return <>
        <Seo title="Digital Card | LaDespani Guesthouse" description="Scan the QR code or copy contact details for LaDespani Guesthouse in Brasov, Romania." canonical="https://ladespani.ro/card" schema={schema} />
        <div className="digital-card">
            <nav className="navbar">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <a href="/">Visit Website</a>
            </nav>
            <div className="main-matter">
                <img src="./images/qr.png" alt="QR code linking to official website" />
                <div>
                    <div className="title">LaDespani Guesthouse</div>
                    <div className="text">
                        <a className="info" href="https://maps.app.goo.gl/q887QztzJ5WWVXck7" target="_blank">Mihai Viteazul 128</a>
                        <div className="info">Brasov, Romania, 500183</div>
                        <a className="info" href="tel:+40721373747">+40721373747</a>
                        <a className="info" href="mailto:anudani241@hotmail.com">anudani241@hotmail.com</a>
                    </div>
                </div>
            </div>
        </div >
    </>;
}

export default DigitalCard;