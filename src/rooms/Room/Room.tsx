import { useState } from "react";
import "./Room.css";

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

    const getPath = (ix: number) => {
        return "images/" + props.images[ix];
    }

    const toggle = () => {
        setOpen(!open);
    }

    return <>
        <div className="room">
            <img className="present" src={getPath(0)} alt={props.title} />
            <div className="strip">{props.title}</div>
            <div className="expand">
                <button onClick={toggle}>+</button>
                <span>VIEW ROOM DETAILS</span>
                {open && <div className="details">
                    <div className="description">
                        <h1>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
}

export default Room;