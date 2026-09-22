import Testimonials from "../landing/Testimonials/Testimonials";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import Facility from "./Facility/Facility";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";
import { useI18n } from "../i18n/LanguageContext";
import { FACILITIES } from "../data/site";

function Facilities() {
    const { c, lang } = useI18n();

    return <>
        <Seo page="facilities" lang={lang} />
        <Header title={c.facilities.h1} />
        <section className="facilities">
            <Reveal>
                <div className="page-intro">
                    <p className="subtitle">{c.facilities.intro}</p>
                </div>
            </Reveal>
            {FACILITIES.map((facility) => (
                <Reveal key={facility.key}>
                    <Facility title={c.facilities.items[facility.key]} image={facility.image} />
                </Reveal>
            ))}
            <Testimonials />
            <Footer />
        </section>
    </>;
}

export default Facilities;
