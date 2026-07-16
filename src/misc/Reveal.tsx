import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
    children: ReactNode;
    /** Seconds to wait before the reveal transition starts. */
    delay?: number;
    className?: string;
}

/**
 * Wraps content in a scroll-triggered reveal: hidden until it enters the
 * viewport, then it fades and rises in (see `.reveal` in index.css).
 */
function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (!("IntersectionObserver" in window)) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
            style={delay ? { "--reveal-delay": `${delay}s` } as CSSProperties : undefined}
        >
            {children}
        </div>
    );
}

export default Reveal;
