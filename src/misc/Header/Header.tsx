import { useEffect, useState } from "react";
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

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isMenuOpen) return;

        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };
        const desktop = window.matchMedia("(min-width: 992px)");
        const onDesktop = (event: MediaQueryListEvent) => {
            if (event.matches) closeMenu();
        };

        window.addEventListener("keydown", onKeyDown);
        desktop.addEventListener("change", onDesktop);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
            desktop.removeEventListener("change", onDesktop);
        };
    }, [isMenuOpen]);

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
                <div
                    id="primary-menu"
                    className={`menu ${isMenuOpen ? "open" : ""}`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) closeMenu();
                    }}
                >
                    {menuItems.map((item, index) => (
                        <a className="item" key={item.title} href={item.link} onClick={closeMenu} aria-current={props.selected === index ? 'page' : undefined}>
                            {props.selected === index ? <b>{item.title}</b> : item.title}
                        </a>
                    ))}
                </div>
                <button
                    className={`hamburger ${isMenuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-menu"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </nav>
            <div className="hero" role="banner">
                <span className="item">WELCOME TO</span>
                <span className="item">LaDespani</span>
                <span className="item">GUESTHOUSE</span>
                <span className="item">Hosting travellers &amp; riders in Brasov since 2007</span>
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