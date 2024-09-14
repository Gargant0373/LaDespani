import { useState } from "react";
import "./Room.css";
import MediaSlider from "./MediaSlider";

export interface RoomProps {
    title: string;
    images: string[];
    description: string;
    price: number;
    bathtub: boolean;
    shower: boolean;
    balcony: boolean;
    // private bathroom: true, DA CLAU?
}

function Room(props: RoomProps) {
    const [open, setOpen] = useState(false);
    
    const toggle = () => {
        setOpen(!open);
    }

    return <>
        <div className="room">
            <MediaSlider images={props.images} />
            <div className="strip">{props.title}</div>
            <div className="expand">
                <button onClick={toggle}>+</button>
                {!open && <span>VIEW ROOM DETAILS</span>}
                {open && <div className="details">
                    <div className="description">
                        <p>{props.description}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
}

export default Room;