import "./LandingCard.css";
import { useI18n } from "../../i18n/LanguageContext";

interface LandingCardProps {
    title: string;
    content: string;
    image: string;
    link: string;
}

function LandingCard(props: LandingCardProps) {
    const { c } = useI18n();

    return <>
        <section className="landing-card">
            <div className="left">
                <h2 className="title">{props.title}</h2>
                <p className="text">{props.content}</p>
                <a className="explore" href={props.link}>{c.common.explore}</a>
            </div>
            <div className="right">
                <img
                    src={`/images/${props.image}`}
                    alt={`${props.title} — Pensiunea LaDespani, Brașov`}
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    </>
}

export default LandingCard;
