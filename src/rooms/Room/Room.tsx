import "./Room.css";
import MediaSlider from "./MediaSlider";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ShowerIcon from "@mui/icons-material/Shower";
import BalconyIcon from "@mui/icons-material/Balcony";
import WcIcon from '@mui/icons-material/Wc';
import TvIcon from '@mui/icons-material/Tv';
import LockIcon from '@mui/icons-material/Lock';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import { SvgIconComponent } from "@mui/icons-material";

export interface RoomProps {
    title: string;
    images: string[];
    description: string;
    price: number;
    facilities: {
        [key: string]: boolean;
    }
}

type FacilityMeta = {
    icon: SvgIconComponent;
    label: string;
};

const facilityMeta: { [key: string]: FacilityMeta } = {
    privateBathroom: { icon: WcIcon, label: "Private bathroom" },
    bathtub: { icon: BathtubIcon, label: "Bathtub" },
    shower: { icon: ShowerIcon, label: "Shower" },
    balcony: { icon: BalconyIcon, label: "Balcony" },
    safeDeposit: { icon: LockIcon, label: "Safe deposit" },
    TV: { icon: TvIcon, label: "TV" },
    towels: { icon: DryCleaningIcon, label: "Towels" },
};

function Room(props: RoomProps) {
    return (
        <article className="room">
            <div className="media">
                <MediaSlider images={props.images} alt={props.title} />
            </div>
            <div className="content">
                <h3 className="name">{props.title}</h3>
                <p className="description">{props.description}</p>
                <ul className="amenities">
                    {Object.entries(props.facilities).map(([facility, available]) => {
                        const meta = facilityMeta[facility];
                        if (!available || !meta) return null;
                        const Icon = meta.icon;
                        return (
                            <li key={facility} className="amenity">
                                <Icon className="icon" />
                                <span>{meta.label}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="booking">
                    <div className="price">
                        {props.price} RON<span className="per-night"> / night</span>
                    </div>
                    <button className="book-room" onClick={() => window.location.href = "/contact"}>
                        BOOK NOW
                    </button>
                </div>
            </div>
        </article>
    );
}

export default Room;
