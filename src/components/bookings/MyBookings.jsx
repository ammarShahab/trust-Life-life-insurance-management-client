import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";

const MyBookings = () => {
  const { user, theme } = use(AuthContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // axios(`http://localhost:3000/my-bookings/${user?.email}`)
    axios(
      `https://b11a11-server-side-ashahab007.vercel.app/my-bookings/${user?.email}`
    )
      .then((data) => {
        // console.log(data?.data);
        setBookings(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  // console.log(bookings);

  const handleConfirmBooking = (bookingId) => {
    // console.log(bookingId);

    axios
      // .patch(`http://localhost:3000/bookings/${bookingId}`, {
      .patch(
        `https://b11a11-server-side-ashahab007.vercel.app/bookings/${bookingId}`,
        {
          status: "completed",
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Your Booking has been Confirmed.",
            icon: "success",
            draggable: true,
          });
          setBookings(
            bookings.map((booking) =>
              booking._id === bookingId
                ? { ...booking, status: "completed" }
                : booking
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`mx-auto p-4 min-h-screen bg-gray-100  ${
        theme ? "dark" : ""
      } dark:bg-zinc-400`}
    >
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
        My Booking Information
      </h1>
      <div className="overflow-x-auto">
        {bookings.length < 1 ? (
          <div className="max-h-screen flex justify-center w-full mt-20">
            <h3 className="text-center font-semibold text-2xl dark:text-white">
              No Bookings Found
            </h3>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Sl. No.</th>
                <th className="py-3 px-6 text-left">Tour Name</th>
                <th className="py-3 px-6 text-left">Guide Name & Contact</th>
                <th className="py-3 px-6 text-left">Departure Date</th>
                <th className="py-3 px-6 text-left">Departure Location</th>
                <th className="py-3 px-6 text-left">Destination</th>
                <th className="py-3 px-6 text-left">Special Note</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm">
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{booking.tourName}</td>
                  <td className="py-3 px-6">
                    {booking.guideName}
                    <br />+{booking.guideContactNumber}
                  </td>
                  <td className="py-3 px-6">{booking.departureDate}</td>
                  <td className="py-3 px-6">{booking.departureLocation}</td>
                  <td className="py-3 px-6">{booking.destination}</td>
                  <td className="py-3 px-6">{booking.specialNote}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => {
                        handleConfirmBooking(booking._id);
                        booking.status === "completed";
                      }}
                      disabled={booking.status === "completed"}
                      className={`font-bold py-2 px-4 rounded ${
                        booking.status === "completed"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {booking.status === "completed" ? "Confirmed" : "Confirm"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
