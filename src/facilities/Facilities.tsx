import Testimonials from "../landing/Testimonials/Testimonials";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/header/Header";
import "./Facilities.css";
import Facility from "./Facility/Facility";

const facilities = [
    { title: "Indoor Parking", image: "parking.jpg" },
    { title: "Ping pong", image: "pingpong.jpg" },
    { title: "Grill", image: "grill.jpg" },
    { title: "Trampoline", image: "trampoline.jpg" },
    { title: "Kitchen", image: "kitchen.jpg" },
    { title: "Laundry", image: "laundry.jpg" },
]

function Facilities() {
    return <>
        <Header image="facilities.jpg" selected={1} />
        <section className="facilities">
            <div className="text">
                <div className="title">FACILITIES</div>
                <div className="subtitle">We want your stay at our cozy guesthouse to be truly special. With thoughtful attention to every detail, we ensure you feel right at home. Enjoy beautiful views, a warm atmosphere, and friendly service that makes your visit unforgettable.</div>
            </div>
            {facilities.map((facility) => {
                return <Facility title={facility.title} image={facility.image} />
            })}
            <Testimonials />
            <Footer />
        </section>
    </>
}

export default Facilities;
