import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import Room from "./Room/Room";
import "./Rooms.css";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { ROOMS } from "../data/site";

function Rooms() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="rooms" lang={lang} />
        <Header image="rooms.webp" />
        <section className="rooms">
            <Reveal>
                <div className="text">
                    <h1 className="title">{c.rooms.h1}</h1>
                    <p className="subtitle">{c.rooms.intro}</p>
                </div>
            </Reveal>
            {ROOMS.map((room) => (
                <Reveal key={room.key}>
                    <Room data={room} />
                </Reveal>
            ))}
            <Footer />
        </section>
    </>;
}

export default Rooms;
