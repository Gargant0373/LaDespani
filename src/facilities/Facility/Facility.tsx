import "./Facility.css";

interface FacilityProps {
    title: string;
    image: string;
}

function Facility(props: FacilityProps) {
    return <>
        <div className="facility">
            <img
                src={`/images/${props.image}`}
                alt={`${props.title} — Pensiunea LaDespani, Brașov`}
                loading="lazy"
                decoding="async"
            />
            <h2 className="title">{props.title}</h2>
        </div>
    </>
}

export default Facility;
