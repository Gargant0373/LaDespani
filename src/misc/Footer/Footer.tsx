import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
    return <>
        <footer className="footer">
            <div className="triangle"></div>
            <div className="content">
                <div className="column">
                    <div className="title">LaDespani</div>
                    <div className="subtitle">GUESTHOUSE</div>
                    <div className="text pad">Mihai Viteazul 128</div>
                    <div className="text">Brasov, Romania</div>
                </div>
                <div className="column">
                    <a className="text2">About Us</a>
                    <a className="text2">Contact</a>
                    <a className="text2">Terms and Conditions</a>
                </div>
                <div className="column">
                    <a className="text2"><FaFacebookF /> Facebook</a>
                    <a className="text2"><FaInstagram /> Instagram</a>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;