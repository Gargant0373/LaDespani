import { useState } from "react";
import "./Book.css";
import "./Header.css";
import "./Hero.css";
import "./Navbar.css";
import "./Scroll.css";

interface HeaderProps {
    image: string;
    selected: number;
}

function Header(props: HeaderProps) {
    const menuItems = [
        { title: "Home", link: "/" },
        { title: "Facilities", link: "/facility" },
        { title: "Rooms", link: "/rooms" },
        { title: "Gallery", link: "/gallery" },
        { title: "Contact", link: "/contact" },
        { title: "About", link: "/about" }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return <>
        <header className="header" style={{
            backgroundImage: "url(images/" + props.image + ")",
        }}>
            <nav className="navbar" aria-label="Main navigation">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <div className={`menu ${isMenuOpen ? "open" : ""}`}> 
                    {menuItems.map((item, index) => (
                        <a className="item" key={item.title} href={item.link} aria-current={props.selected === index ? 'page' : undefined}>
                            {props.selected === index ? <b>{item.title}</b> : item.title}
                        </a>
                    ))}
                </div>
                <button className="hamburger" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle navigation menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </nav>
            <div className="hero" role="banner">
                <span className="item">WELCOME TO</span>
                <span className="item">LaDespani</span>
                <span className="item">GUESTHOUSE</span>
                <span className="item">Accomodating people in Brasov since 2007</span>
            </div>
            <button className="book" onClick={() => window.location.href = "/contact"}>
                <span className="icon">🏠︎</span>
                <span className="text">BOOK NOW</span>
            </button>
            <span className="scroll" onClick={() => scrollDown()}>
                <span className="text">Scroll</span>
                <span className="icon">▼</span>
            </span>
        </header>
    </>;
}

export default Header;