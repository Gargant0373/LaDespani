import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./About.css";
import { Seo } from "../misc/Seo";

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
        <Seo title="About LaDespani Guesthouse" description="Meet the family behind LaDespani Guesthouse in Brasov and discover our story since 2007." canonical="https://ladespani.ro/about" schema={schema} />
        <Header image={"about.jpg"} selected={5} />
        <section className="about">
            <div className="title">
                ABOUT US
            </div>
            <div className="subtitle">
                We are a mixed Estonian Romanian family. After 15 years of traveling
                around the world, in 2007, we decided that it is time to settle down. We
                thought of starting to give back to fellow travelers the kindness we had
                received on our journeys. So we opened our guesthouse and are running it
                ever since. This place saw our kids grow up, it has brought us a lot of
                new friends and grown very deep into our hearts. We speak Romanian,
                English, German, Italian, Spanish, French, Estonian, Russian, Finnish
                and with a little help from AI actually every language. Come to us, we
                welcome You!
            </div>
            <img src="./images/about2.jpg" alt="family picture" />
        </section>
        <Footer />
    </>;
}

export default About;