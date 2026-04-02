import React, { useEffect } from "react";
import "../styles/gallery.css";
import Navbar from "./navbar";
import Footer from "./footer";

/* 🔥 CONFIG */
const SECTIONS = [
  {
    title: "ORIENTATION 25",
    folder: "Orientation25",
    images: [
      "image1.JPG",
      "image2.JPG",
      "image3.JPG",
      "image4.JPG",
      "image5.JPG",
      "image6.jpeg",
      "image7.JPG",
      "image8.jpeg",
      "image9.jpeg",
      "image10.jpeg",
      "image11.jpeg",
      "image12.jpeg",
      "image13.jpeg",
      "image14.jpeg",
      "image15.jpeg",
      "image16.jpeg",
      "image17.JPG",
      "image18.JPG",
      "image19.JPG",
      "image20.JPG",
      "image21.JPG",
      "image22.JPG",
      "image23.JPG",
      "image24.JPG",
      "image25.JPG",
      "image26.JPG",
      "image27.JPG",
      "image28.JPG",
      "image29.JPG",
      "image30.JPG",
      "image31.JPG",
      "image32.JPG",
      "image33.JPG",
      "image34.JPG",
      "image35.JPG",
      "image36.JPG",
      "image37.JPG",
    ],
  },
  {
    title: "QUIMICA' 25",
    folder: "Quimica25",
    images: [
      "image1.JPG",
      "image2.JPG",
      "image3.JPG",
      "image4.JPG",
      "image5.JPG",
      "image6.JPG",
      "image7.JPG",
      "image8.JPG",
      "image9.JPG",
      "image10.JPG",
      "image11.JPG",
      "image12.JPG",
      "image13.JPG",
      "image14.JPG",
      "image15.JPG",
      "image16.JPG",
      "image17.JPG",
      "image18.JPG",
      "image19.JPG",
      "image20.JPG",
      "image21.JPG",
      "image22.JPG",
      "image23.JPG",
      "image24.JPG",
      "image25.JPG",
      "image26.JPG",
      "image27.JPG",
      "image28.JPG",
      "image29.JPG",
      "image30.JPG",
      "image31.JPG",
      "image32.JPG",
    ],
  },
  {
    title: "QUIMICA' 23",
    folder: "Quimica23",
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
      "image14.jpg",
      "image15.jpg",
      "image16.jpg",
      "image17.jpg",
      "image18.jpg",
      "image19.jpg",
      "image20.jpg",
      "image21.jpg",
      "image22.jpg",
      "image23.jpg",
      "image24.jpg",
      "image25.jpg",
      "image26.jpg",
      "image27.jpg",
      "image28.jpg",
      "image29.jpg",
      "image30.jpg",
      "image31.jpg",
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

  if (!e.target.dataset.fallback) {
    e.target.dataset.fallback = "jpeg";
    e.target.src = base + img.replace(/\.\w+$/, ".jpeg");
  } else if (e.target.dataset.fallback === "jpeg") {
    e.target.dataset.fallback = "png";
    e.target.src = base + img.replace(/\.\w+$/, ".png");
  } else {
    e.target.style.display = "none"; // hide broken image
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