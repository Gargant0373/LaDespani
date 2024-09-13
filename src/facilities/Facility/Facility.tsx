import "./Facility.css";

interface FacilityProps {
    title: string;
    image: string;
}

function Facility(props: FacilityProps) {
    return <>
        <div className="facility">
            <img src={"images/" + props.image} alt={props.title} />
            <div className="title">{props.title}</div>
        </div>
    </>
}

export default Facility;