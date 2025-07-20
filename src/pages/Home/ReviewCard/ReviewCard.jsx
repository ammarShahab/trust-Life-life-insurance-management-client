import React, { use } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "motion/react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import TextAnimationGallery from "../../../components/animation/TextAnimationGallery";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const ReviewCard = () => {
  const { theme } = use(AuthContext);
  const axiosInstance = useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  console.log(reviews);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
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

  // Convert rating to stars (max 5)
  const renderStars = (num) => {
    const fullStars = "★".repeat(Number(num));
    const emptyStars = "☆".repeat(5 - Number(num));
    return (
      <span className="text-yellow-500 text-lg">
        {fullStars}
        <span className="text-gray-300">{emptyStars}</span>
      </span>
    );
  };
  return (
    <section
      className={`py-6 sm:py-8 md:py-10 lg:py-12 bg-[#007073] mb-36 font-bitter ${
        theme ? "dark" : ""
      }  dark:bg-zinc-600 dark:text-white`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {theme == "dark" ? (
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 text-white">
            Our Customers Speak For Us
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
          {/* <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mx-auto hover:shadow-lg transition-all duration-300"> */}
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <>
                <div
                  key={index}
                  class="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl "
                >
                  <div class="md:flex">
                    <div class="md:shrink-0">
                      <img
                        class="h-48 w-full object-cover md:h-full md:w-48"
                        src={review.userImage}
                        alt="User profile picture"
                      />
                    </div>
                    <div class="p-8">
                      <p class="mt-2 text-slate-500">"{review.feedback}"</p>
                      <div class="mt-4">
                        <span class="text-slate-900 font-bold">
                          {review.userName}
                        </span>
                      </div>
                      <div class="mt-4 flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
