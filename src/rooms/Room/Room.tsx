import { useState } from "react";
import "./Room.css";
import MediaSlider from "./MediaSlider";

export interface RoomProps {
    title: string;
    images: string[];
    description: string;
    price: number;
    facilities: {
        [key: string]: boolean;
    }
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
            <div className={`expand ${open ? "expanded" : ""}`}>
                <button onClick={toggle}>{open ? "-" : "+"}</button>
                <span>VIEW ROOM DETAILS</span>
                {open && <div className="details">
                    <div className="description">
                        <p>{props.description}</p>
                        <p>Facilities:</p>
                        <ul>
                                {Object.entries(props.facilities).map(
                                    ([facility, available]) =>
                                        available && (
                                            <li key={facility}>
                                                {facility
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/^./, (str) => str.toUpperCase())} 
                                            </li>
                                        )
                                )}
                            </ul>
                        <p>Price: {props.price} RON</p>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
}

export default Room;