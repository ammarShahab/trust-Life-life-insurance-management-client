import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AssignedCustomers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch applications assigned to the logged-in agent
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["assigned-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-applications?email=${user.email}`
      );
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ appId, newStatus, policyId }) => {
      return axiosSecure.patch(
        `/assigned-applications/${appId}/update-status`,
        {
          agent_status: newStatus,
          policyId,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-applications"]);
      Swal.fire("✅ Updated!", "Application status updated.", "success");
    },
  });

  const handleStatusChange = (app, newStatus) => {
    updateStatusMutation.mutate({
      appId: app._id,
      newStatus,
      policyId: app.policyId,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>Trust Life | Dashboard Assigned Customers</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Assigned Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No assigned applications found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Policy Interested</th>
                <th className="p-3 text-left">Application Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.policyTitle}</td>
                  <td className="p-3">
                    <select
                      value={app.agent_status}
                      onChange={(e) => handleStatusChange(app, e.target.value)}
                      className={`border px-6 py-1 rounded text-sm ${
                        app.agent_status === "approved" ||
                        app.agent_status === "rejected"
                          ? "cursor-not-allowed"
                          : ""
                      }`}
                      disabled={
                        app.agent_status === "approved" ||
                        app.agent_status === "rejected"
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setIsModalOpen(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>
                <strong>Name:</strong> {selectedApp.name}
              </li>
              <li>
                <strong>Email:</strong> {selectedApp.email}
              </li>
              <li>
                <strong>Policy Interested:</strong> {selectedApp.policyTitle}
              </li>
              <li>
                <strong>Application Status:</strong> {selectedApp.agent_status}
              </li>
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
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

export default AssignedCustomers;
