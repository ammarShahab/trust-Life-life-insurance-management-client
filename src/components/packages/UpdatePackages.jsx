import React, { use, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";

const UpdatePackages = () => {
  const { user, theme } = use(AuthContext);
  const data = useLoaderData();
  // console.log(data);

  const [myPackages, setMyPackages] = useState(data || []);

  const navigate = useNavigate();

  const [tourName, setTourName] = useState(myPackages?.tour_name);

  const [image, setImage] = useState(myPackages?.image);

  const [duration, setDuration] = useState(myPackages?.duration);

  const [departure, setDeparture] = useState(myPackages?.departure);

  const [destination, setDestination] = useState(myPackages?.destination);

  const [price, setPrice] = useState(myPackages?.price);

  /* const [departureDate, setDepartureDate] = useState(data?.departure_date); */

  const [departureDate, setDepartureDate] = useState(
    myPackages?.departure_date
  );

  const [packageDetails, setPackageDetails] = useState(
    myPackages?.package_details
  );

  const [contactNo, setContactNo] = useState(myPackages?.guide_contact_no);

  const handleUpdatePackage = (e) => {
    e.preventDefault();
    const updatedPackage = {
      tour_name: tourName,
      image: image,
      duration: duration,
      departure: departure,
      destination: destination,
      price: price,
      departure_date: departureDate,
      package_details: packageDetails,
      guide_contact_no: contactNo,
    };
    // console.log(updatedPackage);
    axios
      // .put(`http://localhost:3000/packages/${myPackages?._id}`, updatedPackage)
      .put(
        `https://b11a11-server-side-ashahab007.vercel.app/packages/${myPackages?._id}`,
        updatedPackage
      )
      .then((res) => {
        // console.log("data from updated package", res);
        Swal.fire({
          title: "Package Updated Successfully!",
          text: "You clicked the button!",
          icon: "success",
        });
        navigate("/allPackages");
        /* navigate(`/manage-myPackages/${loggedInUser?.user?.email}`); */
        // window.location.reload();
        setMyPackages(myPackages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`w-full min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 ${
        theme ? "dark" : ""
      } dark:bg-zinc-300`}
    >
      <div className="w-full max-w-lg sm:max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-lg dark:bg-zinc-400">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6 dark:text-white">
          Update Tour Package
        </h2>
        <form onSubmit={handleUpdatePackage} className="space-y-3 sm:space-y-4">
          <div className="mb-4">
            <label
              htmlFor="tour_name"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Tour Name
            </label>
            <input
              type="text"
              id="tour_name"
              name="tour_name"
              defaultValue={myPackages?.tour_name}
              onChange={(e) => setTourName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={myPackages?.image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Duration (e.g. 3 Days 2 Nights)
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              defaultValue={myPackages?.duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="departure_location"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Departure Location
            </label>
            <input
              type="text"
              id="departure_location"
              name="departure_location"
              defaultValue={myPackages?.departure_location}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              defaultValue={myPackages?.destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={myPackages?.price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="departure_date"
              className="block text-sm font-мedium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departure_date"
              name="departure_date"
              defaultValue={myPackages?.departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="package_details"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Package Details
            </label>
            <textarea
              id="package_details"
              name="package_details"
              defaultValue={myPackages?.package_details}
              onChange={(e) => setPackageDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              rows="4"
              required
            />
          </div>

          {/* Guide section */}
          <div className="mb-4">
            <label
              htmlFor="guide_contact_no"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Contact No.
            </label>
            <input
              type="number"
              id="guide_contact_no"
              name="guide_contact_no"
              defaultValue={myPackages?.guide_contact_no}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              placeholder="8801XXXXXXXXX"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="guide_name"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Guide Name
            </label>
            <input
              type="text"
              id="guide_name"
              name="guide_name"
              defaultValue={user?.displayName}
              // onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              readOnly
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="guide_photo"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Guide Photo URL
            </label>
            <input
              type="text"
              id="guide_photo"
              name="guide_photo"
              defaultValue={user?.photoURL}
              // onChange={handleChange}
              placeholder="https://example.com/guide.jpg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="guide_email"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Guide Email
            </label>
            <input
              type="text"
              id="guide_email"
              name="guide_email"
              defaultValue={user?.email}
              // onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              readOnly
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#fe8d02] text-white rounded-md hover:bg-[#fe5602] transition-colors text-base sm:text-lg font-medium dark:text-white"
          >
            Update Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackages;
