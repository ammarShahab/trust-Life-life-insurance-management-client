import React, { use } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "motion/react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import TextAnimationGallery from "../../../components/animation/TextAnimationGallery";

const GalleryCarousel = () => {
  const { theme } = use(AuthContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280, // xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 1024, // lg screens (tablets, small laptops)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "15px",
        },
      },
      {
        breakpoint: 768, // md screens (tablets, large phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 640, // sm screens (phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "5px",
          arrows: false, // Hide arrows on small screens for cleaner UI
        },
      },
    ],
  };

  const images = [
    "https://i.ibb.co/jPjsSm3d/pexels-rushow-122107.jpg",
    "https://i.ibb.co/gZ4dxSXk/pexels-simanta-datta-819074-1693453.jpg",
    "https://i.ibb.co/WpHy2PZ1/pexels-md-towhidul-islam-175863-3013018.jpg",
    "https://i.ibb.co/qYrThtCF/pexels-arifulhb-3675856.jpg",
    "https://i.ibb.co/6RfN0XfW/pexels-habib-sohan-2141615-3938188.jpg",
    "https://i.ibb.co/6JXBb48h/pexels-abhilash-8000042.jpg",
    "https://i.ibb.co/1tD4FbPp/pexels-inaya-7269564.jpg",
    "https://i.ibb.co/PvkS3T4d/pexels-the-ahnafpiash-11241512-1.jpg",
  ];
  return (
    <section
      className={`py-6 sm:py-8 md:py-10 lg:py-12 bg-[#007073] mb-36 font-bitter ${
        theme ? "dark" : ""
      }  dark:bg-zinc-600 dark:text-white`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {theme == "dark" ? (
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 text-white">
            Moments in Motion
          </h3>
        ) : (
          <TextAnimationGallery></TextAnimationGallery>
        )}

        <p className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 max-w-3xl mx-auto text-white">
          Dive into a carousel of cherished memories. Each frame captures a
          unique story waiting to be explored. Let these images take you on a
          visual journey.
        </p>
        <div className="max-w-full sm:max-w-4xl lg:max-w-5xl mx-auto">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-1 sm:px-2">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
