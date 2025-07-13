import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFileDownload, FaStar, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const MyPolicies = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
  });

  const onReviewSubmit = async (data) => {
    const reviewData = {
      ...data,
      policyId: selectedPolicy.policyId,
      policyTitle: selectedPolicy.policyTitle,
      email: user.email,
      date: new Date().toISOString(),
    };
    console.log("Submitted review:", reviewData);

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted successfully!", "success");
        setIsReviewModalOpen(false);
        reset();
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="px-2 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Applied Policies
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Policy</th>
                <th className="p-3 text-left">Coverage</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Premium</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3">
                    <div className="font-semibold">{app.policyTitle}</div>
                    <div className="text-xs text-gray-500">
                      Policy Id: {app.policyId}
                    </div>
                  </td>
                  <td className="p-3">{app.coverage || "N/A"}</td>
                  <td className="p-3">{app.duration || "N/A"} Years</td>
                  <td className="p-3">${app.estimatedPremiumMonthly} /mo</td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getBadgeColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 flex flex-col sm:flex-row sm:mt-3  gap-2">
                    <button
                      onClick={() => {
                        setSelectedPolicy(app);
                        setIsReviewModalOpen(true);
                      }}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-[10px]"
                    >
                      <FaStar /> Review
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPolicy(app);
                        setIsDetailModalOpen(true);
                      }}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-[10px]"
                    >
                      <FaEye /> View Details
                    </button>
                    <button className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-[10px]">
                      <FaFileDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1–5 Stars)</label>
                <select
                  {...register("rating", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Feedback</label>
                <textarea
                  {...register("feedback", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                  rows={4}
                  placeholder="Share your thoughts..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#baa53a] text-white rounded hover:bg-[#fcd547]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isDetailModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Policy Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Policy Title:</strong> {selectedPolicy.policyTitle}
              </li>
              <li>
                <strong>Policy ID:</strong> {selectedPolicy.policyId}
              </li>
              <li>
                <strong>Coverage:</strong> {selectedPolicy.coverage || "N/A"}
              </li>
              <li>
                <strong>Duration:</strong> {selectedPolicy.duration || "N/A"}{" "}
                years
              </li>
              <li>
                <strong>Monthly Premium:</strong> $
                {selectedPolicy.estimatedPremiumMonthly}
              </li>
              <li>
                <strong>Yearly Premium:</strong> $
                {selectedPolicy.estimatedPremiumYearly}
              </li>
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPolicies;
