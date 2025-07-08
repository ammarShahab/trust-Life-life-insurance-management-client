import React, { use } from "react";

import { Link } from "react-router";
import AuthContext from "../../context/AuthContext/AuthContext";

const PackageCard = ({ tourPackage }) => {
  const { setIsLoading, theme } = use(AuthContext);

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden text-center p-4 ${
        theme ? "dark" : ""
      }  dark:bg-zinc-400`}
    >
      <img
        src={tourPackage.image}
        className="w-full h-48 object-cover bg-gray-200 rounded-lg"
      />
      <h3 className="text-lg text-left font-semibold text-gray-800 mt-3 dark:text-white">
        {tourPackage.tour_name}
      </h3>
      <div className="flex items-center gap-4 mt-3">
        <p className="text-gray-600 dark:text-white">
          <img className="w-8 rounded-full" src={tourPackage.guide_photo} />
        </p>
        <p className="text-gray-600 dark:text-white">
          {tourPackage.guide_name}
        </p>
      </div>
      <div className="text-left mt-3 space-y-2">
        <h4 className="dark:text-white">
          <span className="font-semibold "> Duration: </span>
          {tourPackage.duration}
        </h4>
        <h4 className="dark:text-white">
          <span className="font-semibold"> Departure Date: </span>
          {tourPackage.departure_date}
        </h4>
        <h4 className="dark:text-white">
          <span className="font-semibold"> Price:</span>
          <span className="pl-2">{tourPackage.price} Tk/Person</span>
        </h4>
      </div>
      <Link to={`/packages/${tourPackage?._id}`}>
        <button
          onClick={setIsLoading(false)}
          className="mt-3 bg-[#fe8d02] hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition"
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default PackageCard;
