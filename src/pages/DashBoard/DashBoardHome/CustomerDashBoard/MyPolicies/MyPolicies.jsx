import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaDownload, FaRegStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";

const MyPolicies = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
  });

  const openReviewModal = (policy) => {
    setSelectedPolicy(policy);
    document.getElementById("review_modal").showModal();
  };

  const onSubmitReview = async (data) => {
    const review = {
      userName: user.displayName,
      userEmail: user.email,
      policyId: selectedPolicy.policyId,
      policyTitle: selectedPolicy.policyTitle,
      rating: parseInt(data.rating),
      feedback: data.feedback,
      date: new Date().toISOString(),
    };

    console.log("Review Submitted:", review);

    // TODO: Post this to your review collection
    // await axiosSecure.post("/reviews", review);

    reset();
    document.getElementById("review_modal").close();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Applied Policies
      </h2>

      {isLoading ? (
        <Loading />
      ) : policies.length === 0 ? (
        <p className="text-center text-gray-500">No policies applied yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th>#</th>
                <th>Policy Title</th>
                <th>Policy ID</th>
                <th>Coverage</th>
                <th>Duration</th>
                <th>Monthly Premium</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.policyTitle}</td>
                  <td>{p.policyId}</td>
                  <td>{p.coverage || "N/A"}</td>
                  <td>{p.duration || "N/A"}</td>
                  <td>৳{p.estimatedPremiumMonthly}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        p.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : p.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openReviewModal(p)}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      <FaRegStar /> Review
                    </button>
                    <button className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal with React Hook Form */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box max-w-lg">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>

          {selectedPolicy && (
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Policy
                </label>
                <input
                  type="text"
                  value={selectedPolicy.policyTitle}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Rating (1–5)</label>
                <select
                  {...register("rating", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">
                    Rating is required
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Feedback</label>
                <textarea
                  {...register("feedback", { required: true })}
                  rows="4"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Write your review..."
                ></textarea>
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">
                    Feedback is required
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <form method="dialog">
                  <button
                    type="reset"
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Cancel
                  </button>
                </form>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyPolicies;
