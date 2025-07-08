import React, { use, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";

const ApplyBooking = () => {
  const data = useLoaderData();
  // console.log(data);

  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);

  const { user, theme } = use(AuthContext);
  // console.log(user);

  const timeStamp = Date.now();
  const currentDate = new Date(timeStamp);

  const [specialNote, setSpecialNote] = useState("");
  const [packages, setPackages] = useState(data);

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const booking_date = form.bookingDate.value;
    const special_note = form.specialNote.value;

    const bookings = {
      packageImage: data?.image,
      buyerEmail: user?.email,
      packageId: id,
      guideName: data?.guide_name,
      guideContactNumber: data?.guide_contact_no,
      departureDate: data?.departure_date,
      departureLocation: data?.departure_location,
      destination: data?.destination,
      tourName: data?.tour_name,
      bookingDate: booking_date,
      specialNote: special_note,
      status: "pending",
    };
    // console.log("Booking", bookings);

    axios
      // .post(`http://localhost:3000/bookings/${id}`, bookings)
      .post(
        `https://b11a11-server-side-ashahab007.vercel.app/bookings/${id}`,
        bookings
      )
      .then((res) => {
        // console.log(res.data);
        setPackages((prev) => {
          // console.log(prev);
          return { ...prev, bookingCount: prev.bookingCount + 1 };
        });
        if (res.data.insertedId) {
          Swal.fire({
            title: "Your Booking has been added successfully.",
            icon: "success",
            draggable: true,
          });
          navigate("/my-bookings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={`min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8  ${
        theme ? "dark" : ""
      } dark:bg-zinc-300`}
    >
      <form
        onSubmit={handleBooking}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md dark:bg-zinc-400 "
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center dark:text-white">
          Tour Booking Form
        </h2>
        <div className="space-y-4 ">
          <div>
            <label
              htmlFor="tourName"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Tour Package Name
            </label>
            <input
              type="text"
              id="tourName"
              name="tour_name"
              value={data.tour_name}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={data.price}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="buyerName"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Buyer Name
            </label>
            <input
              type="text"
              id="buyerName"
              name="guide_name"
              value={user.displayName}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="buyerEmail"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Buyer Email
            </label>
            <input
              type="email"
              id="buyerEmail"
              name="guide_email"
              value={user.email}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="bookingDate"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Booking Date
            </label>
            <input
              type="text"
              id="bookingDate"
              name="bookingDate"
              value={currentDate.toLocaleDateString()}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="specialNote"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Special Note (Optional)
            </label>
            <textarea
              id="specialNote"
              name="special_note"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Enter any special requests..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y min-h-[100px] dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#fe8d02] hover:bg-yellow-500 transition-colors text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-medium"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyBooking;
