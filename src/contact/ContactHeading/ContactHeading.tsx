import "./ContactHeading.css";

function ContactHeading() {
    return <>
        <nav className="contact-heading">
            <div className="container">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <div className="menu"> 
                    <a className="item" href={window.location.hostname === 'localhost' ? '/' : '/LaDespani/'}>Go back</a>
                </div>
            </div>
            <div className="heading">CONTACT-US</div>
        </nav>
    </>
}

export default ContactHeading;