import React, { use } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";

const AddPackage = () => {
  const { user, theme } = use(AuthContext);
  // console.log(user);
  // console.log(user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);

    const { guide_contact_no, price, ...newAddedPackage } = data;

    newAddedPackage.guide_contact_no = parseInt(guide_contact_no);
    newAddedPackage.price = parseInt(price);
    newAddedPackage.bookingCount = 0;
    const currentDate = Date.now();
    const today = new Date(currentDate);
    newAddedPackage.created_at = today.toLocaleDateString();

    // console.log(newAddedPackage);

    // fetch("http://localhost:3000/packages", {
    fetch("https://b11a11-server-side-ashahab007.vercel.app/packages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddedPackage),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("packages added to the dB succesfully", data);
        if (data.insertedId) {
          Swal.fire({
            title: "Your Package Added Successfully",
            icon: "success",
            draggable: true,
          });
          form.reset();
          window.location.reload();
        }
      });
  };
  return (
    <div
      className={`w-full min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 ${
        theme ? "dark" : ""
      } dark:bg-zinc-400`}
    >
      <div className="w-full max-w-lg sm:max-w-3xl bg-white dark:bg-zinc-500 p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6 dark:text-white">
          Add Tour Package
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="departure_date"
              className="block text-sm font-medium text-gray-700 mb-1 sm:text-base dark:text-white"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departure_date"
              name="departure_date"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              placeholder="+8801XXXXXXXXX"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe8d02] text-sm sm:text-base dark:text-white"
              readOnly
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#fe8d02] text-white rounded-md hover:bg-yellow-500  transition-colors text-base sm:text-lg font-medium"
          >
            Submit Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
