import { useState } from "react";
import "./Testimonials.css";
import Reveal from "../../misc/Reveal";

const testimonials = [
    { name: "Mike", content: "Awesome people! Awesome place." },
    { name: "Magda", content: "LaDespani is a place where you won't feel lonely and you will relax." },
    { name: "Oren", content: "Great place, family and friendly atmosphere, clean and comfortable rooms." }
]

function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((current + 1) % testimonials.length);
    }

    const previous = () => {
        setCurrent((current - 1 + testimonials.length) % testimonials.length);
    }

    return <>
        <Reveal>
            <section className="testimonials">
                <div className="title">Testimonials</div>
                <div className="quote-mark" aria-hidden="true">“</div>
                <div className="slide" key={current}>
                    <div className="content">{testimonials[current].content}</div>
                    <div className="name">{testimonials[current].name} on Google</div>
                </div>
                <div className="buttons">
                    <button onClick={previous} aria-label="Previous testimonial">◀</button>
                    <div className="dots" aria-hidden="true">
                        {testimonials.map((_, idx) => (
                            <span key={idx} className={`dot${idx === current ? " active" : ""}`} onClick={() => setCurrent(idx)}></span>
                        ))}
                    </div>
                    <button onClick={next} aria-label="Next testimonial">▶</button>
                </div>
            </section>
        </Reveal>
    </>
}

export default Testimonials;
