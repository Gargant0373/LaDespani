import { useCallback, useEffect, useState } from "react";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./Gallery.css";
import Masonry from "react-masonry-css";
import { Seo } from "../misc/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { GALLERY_IMAGE_COUNT } from "../data/site";
import { imageAttrs } from "../misc/images";

/** Columns per viewport width; the key is the max width the count applies to. */
const MASONRY_COLUMNS = {
    default: 3,
    1100: 3,
    700: 2,
    // Two columns down to the smallest phones: a single column of 51 photos
    // is a 16,000px page, and the photos are recognisable at half width.
    360: 1,
};

function Gallery() {
    const { c, lang } = useI18n();
    const images = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) => `gallery/${index + 1}.webp`);

    const [selected, setSelected] = useState<number | null>(null);

    const close = useCallback(() => setSelected(null), []);
    const step = useCallback(
        (delta: number) => {
            setSelected((current) => {
                if (current === null) return current;
                return (current + delta + images.length) % images.length;
            });
        },
        [images.length],
    );

    // Lock page scroll and wire keyboard navigation while the lightbox is open.
    useEffect(() => {
        if (selected === null) return;

        document.body.style.overflow = "hidden";
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [selected, close, step]);

    const lightbox = selected === null ? null : imageAttrs(images[selected]);

    return (
        <>
            <Seo page="gallery" lang={lang} />
            <Header title={c.gallery.h1} />
            <div className="page-intro gallery-intro">
                <p className="subtitle">{c.gallery.intro}</p>
            </div>
            <Masonry
                breakpointCols={MASONRY_COLUMNS}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {images.map((name, index) => {
                    const img = imageAttrs(name);
                    return (
                        <button
                            type="button"
                            key={name}
                            className="gallery-item"
                            onClick={() => setSelected(index)}
                            aria-label={c.gallery.photoAlt(index + 1)}
                        >
                            <img
                                src={img.src}
                                srcSet={img.srcSet}
                                sizes="(max-width: 360px) calc(100vw - 32px), (max-width: 700px) calc(50vw - 24px), (max-width: 1100px) 33vw, 400px"
                                width={img.width}
                                height={img.height}
                                alt={c.gallery.photoAlt(index + 1)}
                                loading={index < 4 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </button>
                    );
                })}
            </Masonry>

            {lightbox && selected !== null && (
                <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
                    <img
                        src={lightbox.src}
                        srcSet={lightbox.srcSet}
                        sizes="100vw"
                        width={lightbox.width}
                        height={lightbox.height}
                        alt={c.gallery.photoAlt(selected + 1)}
                        onClick={(event) => event.stopPropagation()}
                    />
                    <button
                        type="button"
                        className="lightbox__close"
                        onClick={close}
                        aria-label={c.common.closeMenu}
                    >
                        ×
                    </button>
                    <button
                        type="button"
                        className="lightbox__arrow prev"
                        onClick={(event) => { event.stopPropagation(); step(-1); }}
                        aria-label={c.rooms.prevPhoto}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="lightbox__arrow next"
                        onClick={(event) => { event.stopPropagation(); step(1); }}
                        aria-label={c.rooms.nextPhoto}
                    >
                        ›
                    </button>
                    <div className="lightbox__counter" aria-hidden="true">
                        {selected + 1} / {images.length}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Gallery;
