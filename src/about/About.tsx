import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./About.css";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";

function About() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About LaDespani Guesthouse",
        "description": "Learn about the LaDespani mixed Estonian Romanian family and the story behind the guesthouse.",
        "publisher": {
            "@type": "Organization",
            "name": "LaDespani Guesthouse"
        }
    };

    return <>
        <Seo title="About Us | LaDespani Motorcycle-Friendly Guesthouse Brasov" description="Meet the family behind LaDespani Guesthouse in Brasov: world travellers who settled down in 2007 and have been hosting guests and motorcycle riders ever since." canonical="https://ladespani.ro/about" schema={schema} />
    <Header image={"about.webp"} selected={5} />
        <section className="about">
            <Reveal>
            <div className="title">
                ABOUT US
            </div>
            </Reveal>
            <Reveal delay={0.1}>
            <div className="subtitle">
                We are a mixed Estonian Romanian family. After 15 years of traveling
                around the world, in 2007, we decided that it is time to settle down. We
                thought of starting to give back to fellow travelers the kindness we had
                received on our journeys. So we opened our guesthouse and are running it
                ever since. This place saw our kids grow up, it has brought us a lot of
                new friends and grown very deep into our hearts. Having spent so
                many years on the road ourselves, we have a soft spot for
                motorcycle travellers: riders touring the Carpathians have always
                found a safe place for their bikes and a warm welcome here. We speak Romanian,
                English, German, Italian, Spanish, French, Estonian, Russian, Finnish
                and with a little help from AI actually every language. Come to us, we
                welcome You!
            </div>
            </Reveal>
            <Reveal delay={0.15}>
            <img src="./images/about2.webp" alt="family picture" />
            </Reveal>
        </section>
        <Footer />
    </>;
}

export default About;