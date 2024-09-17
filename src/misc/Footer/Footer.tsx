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
                    <a className="text2" href="https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8" target="_blank">Find Us</a>
                    <a className="text2" onClick={() => window.location.href = "#contact"}>Contact</a>
                    <a className="text2">Terms and Conditions</a>
                </div>
                <div className="column">
                    <a className="text2" href="https://www.facebook.com/ladespani.guesthouse/" target="_blank"><FaFacebookF /> Facebook</a>
                    <a className="text2" href="https://www.instagram.com/ladespaniguesthouse/" target="_blank"><FaInstagram /> Instagram</a>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;