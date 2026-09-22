import "./Facility.css";
import { imageAttrs } from "../../misc/images";

interface FacilityProps {
    title: string;
    image: string;
}

function Facility(props: FacilityProps) {
    const img = imageAttrs(props.image);

    return <>
        <div className="facility">
            <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(max-width: 991px) calc(100vw - 40px), 700px"
                width={img.width}
                height={img.height}
                alt={`${props.title} — Pensiunea LaDespani, Brașov`}
                loading="lazy"
                decoding="async"
            />
            <h2 className="title">{props.title}</h2>
        </div>
    </>
}

export default Facility;
