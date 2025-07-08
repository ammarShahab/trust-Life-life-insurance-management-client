import React, { use } from "react";
import { Link } from "react-router";

import PackageCard from "../../PackageCard/PackageCard";
import FeaturedPackageCard from "./FeaturedPackageCard";

import AuthContext from "../../../context/AuthContext/AuthContext";

const FeaturedPackages = ({ featuredPackagesPromise }) => {
  const { setIsLoading, theme } = use(AuthContext);
  // const [topfeaturedPackages, setTopfeaturedPackages] = useState([]);
  // console.log(theme);
  const featuredPackages = use(featuredPackagesPromise);
  // console.log(featuredPackages);

  const handleViewDetails = (id) => {
    setIsLoading(false);
    // console.log(id);
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-6 mt-10 mb-20 bg-[#84A7A1] p-4 rounded-2xl ${
        theme ? "dark" : ""
      }  dark:bg-zinc-600`}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-bitter text-center text-[#DCC6E0] dark:text-white">
        {/* <TextAnimation></TextAnimation> */}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {featuredPackages.map((tourPackage) => (
          <FeaturedPackageCard
            key={tourPackage._id}
            tourPackage={tourPackage}
            handleViewDetails={handleViewDetails}
          ></FeaturedPackageCard>
        ))}
      </div>
      <Link to="/allPackages">
        <button className="block mx-auto mt-6 bg-[#A27B5C] text-white px-6 py-3 rounded-md text-lg hover:bg-[#ff8d03] transition">
          See All Packages
        </button>
      </Link>
    </div>
  );
};

export default FeaturedPackages;
