import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import Room, { RoomProps } from "./Room/Room";
import "./Rooms.css";
import { Seo } from "../misc/Seo";
import Reveal from "../misc/Reveal";

const rooms: RoomProps[] = [
    {
        title: "Budget Room",
    images: ["room1_0.webp", "room1_1.webp", "room1_2.webp"],
        description: "A budget room, perfect for a short stay. The room has a double bed and a private bathroom with a nice view of the garden.",
        price: 200,
        facilities : {
            privateBathroom: true,
            bathtub: false,
            shower: true,
            balcony: false,
            safeDeposit: true, 
            TV: true,
            towels: true
        }
    },
    {
        title: "Standard Room 1",
    images: ["room2_0.webp", "room2_1.webp", "room2_2.webp"],
        description: "A standard room, perfect for a couple. The room has a double bed, a private bathroom with a bathtub.",
        price: 250,
        facilities : {
            privateBathroom: true,
            bathtub: true,
            shower: true,
            balcony: false,
            safeDeposit: true, 
            TV: true,
            towels: true
        }
    },
    {
        title: "Standard Room 2",
    images: ["room5_0.webp", "room5_1.webp", "room5_2.webp"],
        description: "A standard room, perfect for a couple. The room has a double bed, a private bathroom with a bathtub.",
        price: 250,
        facilities : {
            privateBathroom: true,
            bathtub: true,
            shower: true,
            balcony: false,
            safeDeposit: true, 
            TV: true,
            towels: true
        }
    },
    {
        title: "Balcony Room 1",
    images: ["room3_0.webp", "room3_1.webp", "room3_2.webp", "room3_3.webp"],
        description: "A room with a balcony, perfect for a couple. The room has a double bed, a private bathroom with a shower.",
        price: 250,
        facilities : {
            privateBathroom: true,
            bathtub: true,
            shower: true,
            balcony: true,
            safeDeposit: true, 
            TV: true,
            towels: true
        }
    },
    {
        title: "Balcony Room 2",
    images: ["room4_0.webp", "room4_1.webp", "room4_2.webp", "room4_3.webp"],
        description: "A room with a balcony, perfect for a couple. The room has a double bed, a private bathroom with a shower.",
        price: 250,
        facilities : {
            privateBathroom: true,
            bathtub: true,
            shower: true,
            balcony: true,
            safeDeposit: true, 
            TV: true,
            towels: true
        }
    }
]

function Rooms() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Rooms at LaDespani Guesthouse",
        "hasPart": rooms.map(r => ({
            "@type": "Accommodation",
            "name": r.title,
            "description": r.description
        }))
    };

    return <>
        <Seo title="Rooms | LaDespani Motorcycle-Friendly Guesthouse Brasov" description="Comfortable guest rooms at LaDespani in Brasov: budget, standard, and balcony options with private bathrooms. Bikers welcome — secure indoor motorcycle parking included." canonical="https://ladespani.ro/rooms" schema={schema} />
    <Header image={"rooms.webp"} selected={2} />
        <section className="rooms">
            <Reveal>
                <div className="text">
                    <div className="title">ROOMS</div>
                    <div className="subtitle">Each of our bright, light-flooded rooms comes with everything you could possibly need for a comfortable stay. And yes, comfort isn't our only objective: we also value good design, with sleek contemporary furnishing complemented by the rich tones of nature's palette, visible from our rooms' garden-view windows and terraces. Arriving on two wheels? Every room booking includes secure indoor parking for your motorcycle.</div>
                </div>
            </Reveal>
            {rooms.map((room) => {
                return <Reveal key={room.title}><Room {...room} /></Reveal>;
            })}
            <Footer />
        </section>
    </>;
}

export default Rooms;