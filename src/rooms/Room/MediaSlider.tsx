import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../i18n/LanguageContext";
import { imageAttrs } from "../../misc/images";
import "./MediaSlider.css";

export interface MediaSliderProps {
    images: string[];
    alt?: string;
}

const AUTOPLAY_DELAY = 4000;
/** Horizontal drag, in px, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 40;

/**
 * Photo slider for a room card. Auto-advances on pointer devices (and pauses
 * on hover); on touch screens it waits for a swipe or a tap instead, because
 * "pause on hover" never fires there and photos changing under a thumb feel
 * like the page is misbehaving.
 */
function MediaSlider(props: MediaSliderProps) {
    const { c } = useI18n();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [autoplay, setAutoplay] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);

    const count = props.images.length;

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setAutoplay(canHover.matches);
        update();
        canHover.addEventListener("change", update);
        return () => canHover.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (!autoplay || paused || count < 2) return;

        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => (prev + 1) % count);
        }, AUTOPLAY_DELAY);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [index, paused, autoplay, count]);

    const previous = () => setIndex((index - 1 + count) % count);
    const next = () => setIndex((index + 1) % count);

    const onTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const onTouchMove = (event: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
        if (touchStartX.current === null) return;
        const delta = touchDeltaX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < SWIPE_THRESHOLD) return;
        if (delta < 0) next();
        else previous();
    };

    return (
        <div
            className="slideshow"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={() => { touchStartX.current = null; }}
        >
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {props.images.map((image, idx) => {
                    const img = imageAttrs(image);
                    return (
                        <div className="slide" key={idx} aria-hidden={idx !== index}>
                            <img
                                src={img.src}
                                srcSet={img.srcSet}
                                sizes="(max-width: 991px) calc(100vw - 40px), 560px"
                                width={img.width}
                                height={img.height}
                                alt={props.alt ? `${props.alt} — ${idx + 1}/${count}` : "room"}
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                            />
                        </div>
                    );
                })}
            </div>

            {count > 1 && (
                <>
                    <button type="button" className="slideshowArrow prev" onClick={previous} aria-label={c.rooms.prevPhoto}>‹</button>
                    <button type="button" className="slideshowArrow next" onClick={next} aria-label={c.rooms.nextPhoto}>›</button>
                    <div className="slideshowCounter" aria-hidden="true">
                        {index + 1} / {count}
                    </div>
                </>
            )}

            <div className="slideshowDots">
                {props.images.map((_, idx) => (
                    <button
                        type="button"
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => setIndex(idx)}
                        aria-label={`${idx + 1} / ${count}`}
                        aria-pressed={index === idx}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default MediaSlider;
