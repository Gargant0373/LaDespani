import "./LandingCard.css";

interface LandingCard {
    title: string;
    content: string;
    image: string;
    link: string;
}

function LandingCard(props: LandingCard) {
    return <>
        <section className="landing-card">
            <div className="left">
                <div className="title">{props.title}</div>
                <div className="text">{props.content}</div>
                <button onClick={() => window.location.href = props.link}>EXPLORE</button>
            </div>
            <div className="right">
                <img src={"images/" + props.image} alt="content" />
            </div>
        </section>
    </>
}

export default LandingCard;