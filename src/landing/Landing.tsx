import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import LandingCard from "./Content/LandingCard";
import "./Landing.css";
import Testimonials from "./Testimonials/Testimonials";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";

function Landing() {
    const { c, lang, path } = useI18n();

    return <>
        <Seo page="home" lang={lang} />
        <Header image="landing1.webp" />
        <Reveal>
            <h1 className="motto">{c.home.h1}</h1>
        </Reveal>
        <Reveal delay={0.05}>
            <p className="intro">{c.home.intro}</p>
        </Reveal>
        {c.home.cards.map((item) => (
            <Reveal key={item.title}>
                <LandingCard
                    title={item.title}
                    content={item.content}
                    image={item.image}
                    link={path(item.page)}
                />
            </Reveal>
        ))}
        <Testimonials />
        <Footer />
    </>
}

export default Landing;
