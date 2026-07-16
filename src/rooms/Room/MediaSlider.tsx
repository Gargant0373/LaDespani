import { useEffect, useRef, useState } from "react";
import "./MediaSlider.css";

export interface MediaSliderProps {
    images: string[];
    alt?: string;
}

const delay = 4000;

function MediaSlider(props: MediaSliderProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        if (!paused) {
            timeoutRef.current = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
            }, delay);
        }

        return () => {
            resetTimeout();
        };
    }, [index, paused, props.images.length]);

    const previous = () => {
        setIndex((index - 1 + props.images.length) % props.images.length);
    };

    const next = () => {
        setIndex((index + 1) % props.images.length);
    };

    return (
        <div
            className="slideshow"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {props.images.map((image, idx) => (
              <div
                className="slide"
                key={idx}
              >
                <img src={`images/${image}`} alt={props.alt ? `${props.alt} photo ${idx + 1}` : "room"} loading="lazy" />
              </div>
            ))}
          </div>

          {props.images.length > 1 && (
            <>
              <button type="button" className="slideshowArrow prev" onClick={previous} aria-label="Previous photo">‹</button>
              <button type="button" className="slideshowArrow next" onClick={next} aria-label="Next photo">›</button>
            </>
          )}

          <div className="slideshowDots">
            {props.images.map((_, idx) => (
              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}
              ></div>
            ))}
          </div>
        </div>
      );
}

export default MediaSlider;
