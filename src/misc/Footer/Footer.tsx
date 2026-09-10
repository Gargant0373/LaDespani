import { useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import TermsModal from "../../contact/TermsModal/TermsModal";
import { useI18n } from "../../i18n/LanguageContext";
import { BUSINESS } from "../../data/site";

function Footer() {
    const { c, path } = useI18n();
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);

    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);

    return <>
        <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
        <footer className="footer">
            <div className="triangle"></div>
            <div className="content">
                <div className="column">
                    <div className="title">LaDespani</div>
                    <div className="subtitle">GUESTHOUSE</div>
                    <div className="text pad">{c.footer.address1}</div>
                    <div className="text">{c.footer.address2}</div>
                </div>
                <div className="column">
                    <a className="text2" href={BUSINESS.mapUrl} target="_blank" rel="noopener">{c.footer.findUs}</a>
                    <a className="text2" href={path("contact")}>{c.footer.contact}</a>
                    <button className="text2 as-link" type="button" onClick={openTermsModal}>{c.footer.terms}</button>
                </div>
                <div className="column">
                    <a className="text2" href={BUSINESS.facebook} target="_blank" rel="noopener"><FaFacebookF /> Facebook</a>
                    <a className="text2" href={BUSINESS.instagram} target="_blank" rel="noopener"><FaInstagram /> Instagram</a>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;
