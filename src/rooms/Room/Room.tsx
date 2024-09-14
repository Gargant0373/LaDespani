import { useState } from "react";
import "./Room.css";

interface RoomProps {
    title: string;
    images: string[];
    description: string;
    price: number;
    bathtub: boolean;
    shower: boolean;
    balcony: boolean;
    // private bathroom: true, DA CLAU?
}

function Room() {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return <>

    </>
}

export default Room;