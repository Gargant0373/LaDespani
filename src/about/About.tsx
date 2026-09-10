import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./About.css";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";

function About() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="about" lang={lang} />
        <Header image="about.webp" />
        <section className="about">
            <Reveal>
                <h1 className="title">{c.about.h1}</h1>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="subtitle">{c.about.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
                <img src="/images/about2.webp" alt={c.about.imageAlt} loading="lazy" decoding="async" />
            </Reveal>
        </section>
        <Footer />
    </>;
}

export default About;
