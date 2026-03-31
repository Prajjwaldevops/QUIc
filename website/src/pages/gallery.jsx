import React, { useEffect } from "react";
import "../styles/gallery.css";
import Navbar from "./navbar";
import Footer from "./footer";

/* 🔥 CONFIG */
const SECTIONS = [
  {
    title: "Orientation 25",
    folder: "Orientation25",
    images: [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
      "image5.jpg",
      "image6.jpeg",
      "image7.jpg",
      "image8.jpeg",
      "image9.jpeg",
      "image10.jpeg",
      "image11.jpeg",
      "image12.jpeg",
      "image13.jpeg",
      "image14.jpeg",
      "image15.jpeg",
      "image16.jpeg",
      "image17.jpg",
    ],
  },
  {
    title: "Quimica 25",
    folder: "Quimica25",
    images: [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
      "image5.jpg",
      "image6.jpg",
      "image7.jpg",
      "image8.jpg",
      "image9.jpg",
      "image10.jpg",
      "image11.jpg",
      "image12.jpg",
      "image13.jpg",
    ],
  },
  {
    title: "Quimica 23",
    folder: "Quimica23",
    images: [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
      "image5.jpg",
      "image6.jpg",
    ],
  },
];

const BASE_PATH = "/assets/gallery/";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* 🔁 fallback for wrong extensions */
  const handleImageError = (e, folder, img) => {
    const base = `${BASE_PATH}${folder}/`;
    if (!e.target.src.includes(".jpeg")) {
      e.target.src = base + img.replace(".jpg", ".jpeg");
    } else if (!e.target.src.includes(".png")) {
      e.target.src = base + img.replace(".jpg", ".png");
    }
  };

  return (
    <div className="gallery-page">
      <Navbar />

      {/* HEADER */}
      <section className="gallery-header">
        <h1>GALLERY</h1>
      </section>

      {/* 🔥 SECTIONS LOOP */}
      {SECTIONS.map((section, index) => (
        <div key={index} className="gallery-section">
          <h2 className="section-heading">{section.title}</h2>

          <div className="masonry-grid">
            {section.images.map((img, i) => (
              <div key={i} className="masonry-item">
                <img
                  src={`${BASE_PATH}${section.folder}/${img}`}
                  alt="gallery"
                  loading="lazy"
                  onError={(e) =>
                    handleImageError(e, section.folder, img)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Gallery;