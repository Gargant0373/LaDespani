import "./Book.css";
import "./Header.css";
import "./Hero.css";
import "./Navbar.css";
import "./Scroll.css";

function Header() {
    const menuItems = [
        { title: "Home", link: "/" },
        { title: "Facilities", link: "/facilities" },
        { title: "Rooms", link: "/rooms" },
        { title: "Contact", link: "/contact" }
    ]

    return <>
        <header className="header" style={{
            backgroundImage: "url(images/landing1.jpg)",
        }}>
            <nav className="navbar">
                <div className="logo">
                    <div className="title">LADESPANI</div>
                    <div className="subtitle">GUESTHOUSE</div>
                </div>
                <div className="menu">
                    {menuItems.map((item) => {
                        return <a className="item" key={item.title} href={item.link}>{item.title}</a>
                    })}
                </div>
            </nav>
            <div className="hero">
                <span className="item">WELCOME TO</span>
                <span className="item">LaDespani</span>
                <span className="item">GUESTHOUSE</span>
                <span className="item">Accomodating people in Brasov since 2007</span>
            </div>
            <button className="book">
                <span className="icon">🏠︎</span>
                <span className="text">BOOK NOW</span>
            </button>
            <span className="scroll">
                <span className="text">Scroll</span>
                <span className="icon">▼</span>
            </span>
        </header>
    </>
}

export default Header;