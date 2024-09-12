import { useState } from "react";
import "./Testimonials.css";

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
        <section className="testimonials">
            <div className="title">Testimonials</div>
            <div className="content">{testimonials[current].content}</div>
            <div className="name">{testimonials[current].name} on Google</div>
            <div className="buttons">
                <button onClick={previous}>◀</button>
                <button onClick={next}>▶</button>
            </div>
        </section>
    </>
}

export default Testimonials;