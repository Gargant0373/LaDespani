import { useState } from "react";
import "./Room.css";
import MediaSlider from "./MediaSlider";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ShowerIcon from "@mui/icons-material/Shower";
import BalconyIcon from "@mui/icons-material/Balcony";
import WcIcon from '@mui/icons-material/Wc';
import TvIcon from '@mui/icons-material/Tv';
import LockIcon from '@mui/icons-material/Lock';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface RoomProps {
    title: string;
    images: string[];
    description: string;
    price: number;
    facilities: {
        [key: string]: boolean;
    }
}

const facilityIcons: { [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> } = {
    bathtub: BathtubIcon,
    shower: ShowerIcon,
    balcony: BalconyIcon,
    privateBathroom: WcIcon,
    TV: TvIcon,
    safeDeposit: LockIcon,
    towels: DryCleaningIcon
};

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
                <div className="details">
                <span>VIEW ROOM DETAILS</span>
                {open && 
                    <div className="description">
                        <p>{props.description}</p>
                        <p>Facilities:</p>
                        <ul>
                                {Object.entries(props.facilities).map(
                                    ([facility, available]) =>
                                        {
                                            if (available) {
                                                const IconComponent = facilityIcons[facility];
                                                return (
                                                    <li key={facility} className="facility-item">
                                                        <IconComponent className="facility-icon" />
                                                        <span>
                                                            {facility
                                                                .replace(/([A-Z])/g, " $1") // Add space before capital letters (e.g., privateBathroom -> Private Bathroom)
                                                                .replace(/^./, (str) => str.toUpperCase())} {/* Capitalize first letter */}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        }
                                )}
                            </ul>
                        <p>Price: {props.price} RON</p>
                    </div>
                }
                </div>
            </div>
        </div>
    </>
}

export default Room;