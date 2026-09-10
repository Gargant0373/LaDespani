import { useState } from "react";
import "./Testimonials.css";
import Reveal from "../../misc/Reveal";
import { useI18n } from "../../i18n/LanguageContext";
import { TESTIMONIALS } from "../../data/site";

function Testimonials() {
    const { c } = useI18n();
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((current + 1) % TESTIMONIALS.length);
    const previous = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return <>
        <Reveal>
            <section className="testimonials">
                <h2 className="title">{c.home.testimonialsTitle}</h2>
                <div className="quote-mark" aria-hidden="true">“</div>
                <div className="slide" key={current}>
                    <div className="content">{TESTIMONIALS[current].content}</div>
                    <div className="name">{TESTIMONIALS[current].name} {c.home.testimonialSource}</div>
                </div>
                <div className="buttons">
                    <button onClick={previous} aria-label={c.home.prevTestimonial}>◀</button>
                    <div className="dots" aria-hidden="true">
                        {TESTIMONIALS.map((_, idx) => (
                            <span key={idx} className={`dot${idx === current ? " active" : ""}`} onClick={() => setCurrent(idx)}></span>
                        ))}
                    </div>
                    <button onClick={next} aria-label={c.home.nextTestimonial}>▶</button>
                </div>
            </section>
        </Reveal>
    </>
}

export default Testimonials;
