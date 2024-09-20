import "./DigitalCard.css";

function DigitalCard() {
    return <>
        <div className="digital-card">
            <nav className="navbar">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <a href="#">Visit Website</a>
            </nav>
            <div className="main-matter">
                <img src="./images/qr.png" alt="qr" />
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
    </>
}

export default DigitalCard;