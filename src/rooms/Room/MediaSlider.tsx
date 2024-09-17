import { useEffect, useRef, useState } from "react";
import "./MediaSlider.css";

export interface MediaSliderProps {
    images: string[];
}

const delay = 3000;

function MediaSlider(props: MediaSliderProps) {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
        }, delay);

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {props.images.map((image, index) => (
              <div
                className="slide"
                key={index}
              >
                <img src={`images/${image}`} alt="room" />
              </div>
            ))}
          </div>
    
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