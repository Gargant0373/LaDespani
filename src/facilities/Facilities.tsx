import Testimonials from "../landing/Testimonials/Testimonials";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./Facilities.css";
import Facility from "./Facility/Facility";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";

const facilities = [
    { title: "Secure Indoor Parking", image: "parking.webp" },
    { title: "Ping pong", image: "pingpong.webp" },
    { title: "Grill", image: "grill.webp" },
    { title: "Trampoline", image: "trampoline.webp" },
    { title: "Kitchen", image: "kitchen.webp" },
    { title: "Laundry", image: "laundry.webp" },
    { title: "Safe Locker", image: "safe.webp" },
];

function Facilities() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Facilities at LaDespani Guesthouse",
        "itemListElement": facilities.map((f, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": f.title
        }))
    };

    return <>
        <Seo title="Facilities & Secure Motorcycle Parking | LaDespani Guesthouse Brasov" description="Facilities at LaDespani in Brasov: secure indoor parking for motorcycles and cars, guest kitchen, laundry, grill, trampoline, ping pong and safe lockers." canonical="https://ladespani.ro/facility" schema={schema} />
    <Header image="facilities.webp" selected={1} />
        <section className="facilities">
            <Reveal>
                <div className="text">
                    <div className="title">FACILITIES</div>
                    <div className="subtitle">We want your stay at our cozy guesthouse to be truly special. With thoughtful attention to every detail, we ensure you feel right at home. Riders get a proper welcome too: your motorcycle spends the night under a roof in our secure indoor parking, and the laundry is there when your gear needs a wash after a long day on the Carpathian passes. Enjoy beautiful views, a warm atmosphere, and friendly service that makes your visit unforgettable.</div>
                </div>
            </Reveal>
            {facilities.map((facility) => {
                return <Reveal key={facility.title}><Facility title={facility.title} image={facility.image} /></Reveal>;
            })}
            <Testimonials />
            <Footer />
        </section>
    </>;
}

export default Facilities;
