import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import Room, { RoomProps } from "./Room/Room";
import "./Rooms.css";

const rooms: RoomProps[] = [
    {
        title: "Budget Room",
        images: ["room1_0.jpg", "room1_1.jpg", "room1_2.jpg"],
        description: "A budget room, pefect for a short stay. The room has a double bed and a private bathroom with a nice view of the garden.",
        price: 220,
        bathtub: false,
        shower: true,
        balcony: false
    },
    {
        title: "Standard Room",
        images: ["room2_0.jpg", "room2_1.jpg", "room2_2.jpg"],
        description: "A standard room, perfect for a couple. The room has a double bed, a private bathroom with a bathtub.",
        price: 300,
        bathtub: true,
        shower: true,
        balcony: false
    },
    {
        title: "Balcony Room",
        images: ["room3_0.jpg", "room3_1.jpg", "room3_2.jpg", "room3_3.jpg"],
        description: "A room with a balcony, perfect for a couple. The room has a double bed, a private bathroom with a shower.",
        price: 350,
        bathtub: true,
        shower: true,
        balcony: true
    }
]

function Rooms() {
    return <>
        <section className="rooms">
            <Header image={"rooms.jpg"} selected={2} />
            <div className="text">
                <div className="title">ROOMS</div>
                <div className="subtitle">Each of our bright, ligh-flooded rooms come with everything you could possibly need for a comfortable stay. And yes, comfort isn't our only objective, we also value good design, sleek contemporary furnishing complemented by the rich tones of nature's palette as visible from our rooms' garden-view windows and terraces.</div>
            </div>
            {rooms.map((room) => {
                return <Room {...room} />
            })}
            <Footer />
        </section>
    </>
}

export default Rooms;