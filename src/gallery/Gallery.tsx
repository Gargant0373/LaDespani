import { useState } from "react";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./Gallery.css";
import Masonry from "react-masonry-css";
import { Seo } from "../misc/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { GALLERY_IMAGE_COUNT } from "../data/site";

function Gallery() {
    const { c, lang } = useI18n();
    const images = Array.from(
        { length: GALLERY_IMAGE_COUNT },
        (_, index) => `/images/gallery/${index + 1}.webp`,
    );

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <Seo page="gallery" lang={lang} />
            <Header image="gallery.webp" />
            <div className="gallery-intro">
                <h1 className="title">{c.gallery.h1}</h1>
                <p className="subtitle">{c.gallery.intro}</p>
            </div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {images.map((src, index) => (
                    <div key={index} className="gallery-item">
                        <img
                            src={src}
                            alt={c.gallery.photoAlt(index + 1)}
                            loading="lazy"
                            decoding="async"
                            onClick={() => setSelectedImage(src)}
                        />
                    </div>
                ))}
            </Masonry>

            {/* Modal for large screen popup */}
            {selectedImage && (
                <div className="modal" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="" />
                </div>
            )}

            <Footer />
        </>
    );
}

export default Gallery;
