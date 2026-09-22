import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import Room from "./Room/Room";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { ROOMS } from "../data/site";

function Rooms() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="rooms" lang={lang} />
        <Header title={c.rooms.h1} />
        <section className="rooms">
            <Reveal>
                <div className="page-intro">
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
