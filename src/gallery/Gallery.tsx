import { useState } from "react";
import Footer from "../misc/Footer/Footer";
import Header from "../misc/Header/Header";
import "./Gallery.css";
import Masonry from "react-masonry-css";
import { Seo } from "../misc/Seo";

function Gallery() {
    const totalImages = 51;
    const images = Array.from({ length: totalImages }, (_, index) => `images/gallery/${index + 1}.jpg`);
    
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Photo Gallery - LaDespani Guesthouse",
        "about": "Images of rooms, facilities and surroundings of LaDespani Guesthouse in Brasov.",
        "hasPart": images.slice(0, 12).map(src => ({
            "@type": "ImageObject",
            "contentUrl": `https://ladespani.ro/${src}`,
            "name": src.split('/').pop()
        }))
    };

    return (
        <>
            <Seo title="Gallery | LaDespani Guesthouse" description="Browse the LaDespani Guesthouse photo gallery: rooms, facilities, and relaxing outdoor spaces in Brasov." canonical="https://ladespani.ro/gallery" schema={schema} />
            <Header image="gallery.jpg" selected={3} />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {images.map((src, index) => (
                    <div key={index} className="gallery-item">
                        <img 
                            src={src} 
                            alt={`Gallery Image ${index + 1}`} 
                            onClick={() => setSelectedImage(src)} 
                        />
                    </div>
                ))}
            </Masonry>

            {/* Modal for large screen popup */}
            {selectedImage && (
                <div className="modal" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Selected" />
                </div>
            )}

            <Footer />
        </>
    );
}

export default Gallery;
