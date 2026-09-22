import "./LandingCard.css";
import { useI18n } from "../../i18n/LanguageContext";
import { imageAttrs } from "../../misc/images";

interface LandingCardProps {
    title: string;
    content: string;
    image: string;
    link: string;
}

function LandingCard(props: LandingCardProps) {
    const { c } = useI18n();
    const img = imageAttrs(props.image);

    return <>
        <section className="landing-card">
            <div className="left">
                <h2 className="title">{props.title}</h2>
                <p className="text">{props.content}</p>
                <a className="explore" href={props.link}>{c.common.explore}</a>
            </div>
            <div className="right">
                <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(max-width: 991px) calc(100vw - 40px), 30rem"
                    width={img.width}
                    height={img.height}
                    alt={`${props.title} — Pensiunea LaDespani, Brașov`}
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    </>
}

export default LandingCard;
