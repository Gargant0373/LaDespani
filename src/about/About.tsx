import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./About.css";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { imageAttrs } from "../misc/images";

function About() {
    const { c, lang } = useI18n();
    const img = imageAttrs("about2.webp");

    return <>
        <Seo page="about" lang={lang} />
        <Header title={c.about.h1} />
        <section className="about">
            <Reveal>
                <p className="subtitle">{c.about.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
                <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(max-width: 991px) calc(100vw - 40px), 80vw"
                    width={img.width}
                    height={img.height}
                    alt={c.about.imageAlt}
                    loading="lazy"
                    decoding="async"
                />
            </Reveal>
        </section>
        <Footer />
    </>;
}

export default About;
