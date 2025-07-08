import React, { use } from "react";
import { Link, useLoaderData } from "react-router";
import AuthContext from "../context/AuthContext/AuthContext";

const PackageDetails = () => {
  const tourPackage = useLoaderData();
  const { theme, setIsLoading } = use(AuthContext);
  setIsLoading(false);

  const {
    _id,
    destination,
    departure_date,
    departure_location,
    bookingCount,
    package_details,
    price,
    duration,
    guide_contact_no,
    guide_photo,
    guide_name,
    tour_name,
    image,
  } = tourPackage;

  return (
    <div className={`${theme ? "dark" : ""} dark:bg-zinc-300 border`}>
      <div className="w-full max-w-5xl mx-auto my-5 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-zinc-400">
        <div className="w-full">
          <img
            src={image}
            alt="Tour Image"
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>
        <div className="p-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {tour_name}
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={guide_photo}
              alt="Guide Image"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-4"
            />
            <div className="flex items-center justify-between w-full">
              <h4 className="text-sm md:text-xl font-semibold text-gray-700 mr-2 dark:text-white">
                {guide_name}
              </h4>
              <p className="text-gray-600 text-sm md:text-xl dark:text-white">
                <span className="font-semibold ">Contact:</span> +
                <span className="font-normal">{guide_contact_no}</span>
              </p>
            </div>
          </div>
          <div className="text-gray-700 text-sm md:text-lg space-y-2 dark:text-white">
            <p>
              <span className="font-semibold">Duration:</span> {duration}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {price} Tk/Person
            </p>
            <p>
              <span className="font-semibold">Booking Count:</span>{" "}
              {bookingCount}
              <span> Bookings</span>
            </p>
            <p>
              <span className="font-semibold">Departure Location:</span>{" "}
              {departure_location}
            </p>
            <p>
              <span className="font-semibold">Departure Date:</span>{" "}
              {departure_date}
            </p>
            <p>
              <span className="font-semibold">Destination:</span> {destination}
            </p>
          </div>
          <div className="mt-4 text-gray-600text-sm md:text-lg ">
            <h3 className="font-bold text-gray-700 dark:text-white">
              Package Deatails:
            </h3>

            <p className="mt-2 text-gray-700 dark:text-white">
              {package_details}
            </p>
          </div>

          <Link to={`/apply-booking/${_id}`}>
            <button
              // href="#book"
              className="block w-full max-w-xs mx-auto mt-5 py-3 bg-[#fe8d02] hover:bg-yellow-500  transition-colors text-white text-center rounded-md font-semibold text-sm md:text-base "
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
