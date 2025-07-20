import React, { use } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const renderStars = (num) => {
    const fullStars = "★".repeat(Number(num));
    const emptyStars = "☆".repeat(5 - Number(num));
    return (
      <span className="text-yellow-400 text-xl font-semibold">
        {fullStars}
        <span className="text-gray-300">{emptyStars}</span>
      </span>
    );
  };

  return (
    <section
      /* className={`py-10 md:py-16 lg:py-20 text-white font-bitter ${
        theme ? "dark" : ""
      } bg-[radial-gradient(ellipse_at_top_left,_#f9f8eb,_#76b39d,_#05004e)]`} */
      className={`py-10 md:py-16 lg:py-20 text-white font-bitter ${
        theme ? "dark" : ""
      } bg-[radial-gradient(ellipse_at_top_left,_#ebf0f6,_#98ccd3,_#364e68)]`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {theme === "dark" ? (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
            Our Customers Speak For Us
          </h2>
        ) : (
          <TextAnimationGallery />
        )}

        <p className="text-center max-w-2xl mx-auto text-lg md:text-xl mb-10 opacity-90">
          Dive into the voices of our community. Real stories, real impact, real
          people.
        </p>

        <div className="max-w-6xl mx-auto px-2">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 transition duration-300 hover:scale-105">
                  <div className="flex items-center gap-5">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">
                        {review.userName}
                      </h4>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-white/90 italic leading-relaxed">
                    "{review.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
