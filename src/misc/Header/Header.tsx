import { useEffect, useState } from "react";
import "./Book.css";
import "./Header.css";
import "./Hero.css";
import "./Navbar.css";
import "./Scroll.css";
import { useI18n } from "../../i18n/LanguageContext";
import { NAV_PAGES, PageKey } from "../../i18n/config";
import LanguageSwitcher from "../LanguageSwitcher";

interface HeaderProps {
    image: string;
}

function Header(props: HeaderProps) {
    const { c, lang, path, page } = useI18n();

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
            backgroundImage: `url(/images/${props.image})`,
        }}>
            <nav className="navbar" aria-label={c.common.mainNav}>
                <a className="logo" href={path("home")}>
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </a>
                <div
                    id="primary-menu"
                    className={`menu ${isMenuOpen ? "open" : ""}`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) closeMenu();
                    }}
                >
                    {NAV_PAGES.map((key) => {
                        const navKey = key as Exclude<PageKey, "card">;
                        const label = c.nav[navKey];
                        const active = page === key;
                        return (
                            <a
                                className="item"
                                key={key}
                                href={path(key)}
                                onClick={closeMenu}
                                aria-current={active ? "page" : undefined}
                            >
                                {active ? <b>{label}</b> : label}
                            </a>
                        );
                    })}
                    <LanguageSwitcher onNavigate={closeMenu} />
                </div>
                <button
                    className={`hamburger ${isMenuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-menu"
                    aria-label={isMenuOpen ? c.common.closeMenu : c.common.openMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </nav>
            <div className="hero" role="banner">
                <span className="item">{c.hero.welcome}</span>
                <span className="item">LaDespani</span>
                <span className="item">{lang === "ro" ? "PENSIUNE" : "GUESTHOUSE"}</span>
                <span className="item">{c.hero.tagline}</span>
            </div>
            <a className="book" href={path("contact")}>
                <span className="text">{c.common.bookNow}</span>
            </a>
            <span className="scroll" onClick={() => scrollDown()}>
                <span className="text">{c.common.scroll}</span>
                <span className="icon">▼</span>
            </span>
        </header>
    </>;
}

export default Header;
