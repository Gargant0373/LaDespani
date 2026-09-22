import { useEffect, useState } from "react";
import "./Book.css";
import "./Header.css";
import "./Hero.css";
import "./Navbar.css";
import "./Scroll.css";
import { useI18n } from "../../i18n/LanguageContext";
import { NAV_PAGES, PageKey } from "../../i18n/config";
import { BUSINESS, HERO_IMAGES } from "../../data/site";
import { imageAttrs } from "../images";
import LanguageSwitcher from "../LanguageSwitcher";

interface HeaderProps {
    /**
     * Page title, rendered as the page's <h1> inside the hero. When omitted
     * the hero shows the homepage welcome block instead.
     */
    title?: string;
    /** Hide the booking button, e.g. on the contact page itself. */
    showBook?: boolean;
}

/** Scroll distance after which the navbar gets a solid background. */
const SCROLLED_AT = 24;

function Header({ title, showBook = true }: HeaderProps) {
    const { c, lang, path, page } = useI18n();

    // Pages without a hero photo (contact) get a plain navy band, so the
    // phone number and the form come first.
    const image = HERO_IMAGES[page];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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
        const header = document.querySelector<HTMLElement>(".header");
        window.scrollTo({
            top: header ? header.offsetHeight : window.innerHeight,
            behavior: "smooth",
        });
    };

    const variant = title ? "header--page" : "header--home";
    const bg = image ? imageAttrs(image) : null;

    return <>
        <header className={`header ${variant} ${image ? "" : "header--band"}`}>
            {bg && (
                <img
                    className="header__bg"
                    src={bg.src}
                    srcSet={bg.srcSet}
                    sizes="100vw"
                    width={bg.width}
                    height={bg.height}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                />
            )}
            <nav
                className={`navbar ${scrolled ? "is-scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
                aria-label={c.common.mainNav}
            >
                <div className="navbar__inner">
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
                        {/* Phone-only: the two actions a guest actually wants
                            from the menu, without hunting through pages. */}
                        <div className="menu__cta">
                            <a className="menu__cta-book" href={path("contact")} onClick={closeMenu}>
                                {c.common.bookNow}
                            </a>
                            <a className="menu__cta-call" href={`tel:${BUSINESS.telephone}`}>
                                {c.common.call} {BUSINESS.telephoneDisplay}
                            </a>
                        </div>
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
                </div>
            </nav>
            <div className="hero">
                {title ? (
                    <>
                        <span className="eyebrow">{c.common.brand}</span>
                        <h1 className="page-title">{title}</h1>
                    </>
                ) : (
                    <>
                        <span className="item">{c.hero.welcome}</span>
                        <span className="item">LaDespani</span>
                        <span className="item">{lang === "ro" ? "PENSIUNE" : "GUESTHOUSE"}</span>
                        <span className="item">{c.hero.tagline}</span>
                    </>
                )}
                {showBook && (
                    <a className="book" href={path("contact")}>
                        <span className="text">{c.common.bookNow}</span>
                    </a>
                )}
            </div>
            {!title && (
                <button type="button" className="scroll" onClick={scrollDown}>
                    <span className="text">{c.common.scroll}</span>
                    <span className="icon" aria-hidden="true">▼</span>
                </button>
            )}
        </header>
    </>;
}

export default Header;
