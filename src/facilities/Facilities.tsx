import Testimonials from "../landing/Testimonials/Testimonials";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./Facilities.css";
import Facility from "./Facility/Facility";
import { Seo } from "../misc/Seo";

const facilities = [
    { title: "Indoor Parking", image: "parking.webp" },
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
        <Seo title="Facilities | LaDespani Guesthouse" description="Explore facilities at LaDespani: indoor parking, kitchen, laundry, grill, trampoline, ping pong and more for a comfortable stay." canonical="https://ladespani.ro/facility" schema={schema} />
    <Header image="facilities.webp" selected={1} />
        <section className="facilities">
            <div className="text">
                <div className="title">FACILITIES</div>
                <div className="subtitle">We want your stay at our cozy guesthouse to be truly special. With thoughtful attention to every detail, we ensure you feel right at home. Enjoy beautiful views, a warm atmosphere, and friendly service that makes your visit unforgettable.</div>
            </div>
            {facilities.map((facility) => {
                return <Facility key={facility.title} title={facility.title} image={facility.image} />;
            })}
            <Testimonials />
            <Footer />
        </section>
    </>;
}

export default Facilities;
