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
import { RoomData } from "../../data/site";
import { useI18n } from "../../i18n/LanguageContext";

const facilityIcons: { [key: string]: SvgIconComponent } = {
    privateBathroom: WcIcon,
    bathtub: BathtubIcon,
    shower: ShowerIcon,
    balcony: BalconyIcon,
    safeDeposit: LockIcon,
    TV: TvIcon,
    towels: DryCleaningIcon,
};

function Room({ data }: { data: RoomData }) {
    const { c, path } = useI18n();
    const copy = c.rooms.items.find((item) => item.key === data.key);

    return (
        <article className="room">
            <div className="media">
                <MediaSlider images={data.images} alt={copy?.title ?? data.key} />
            </div>
            <div className="content">
                <h2 className="name">{copy?.title ?? data.key}</h2>
                <p className="description">{copy?.description}</p>
                <ul className="amenities">
                    {Object.entries(data.facilities).map(([facility, available]) => {
                        const Icon = facilityIcons[facility];
                        const label = c.rooms.amenities[facility];
                        if (!available || !Icon || !label) return null;
                        return (
                            <li key={facility} className="amenity">
                                <Icon className="icon" />
                                <span>{label}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="booking">
                    <div className="price">
                        {data.price} RON<span className="per-night">{c.rooms.perNight}</span>
                    </div>
                    <a className="book-room" href={path("contact")}>
                        {c.common.bookNow}
                    </a>
                </div>
            </div>
        </article>
    );
}

export default Room;
