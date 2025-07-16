import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["paid-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/paid");
      return res.data;
    },
  });

  const assignAgent = useMutation({
    mutationFn: async ({ appId, agent }) => {
      return axiosSecure.patch(
        `/policy-applications/${appId}/assign-agent`,
        agent
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-paid-applications"]);
      Swal.fire("✅ Assigned!", "Agent has been assigned.", "success");
    },
  });

  const rejectApp = useMutation({
    mutationFn: async (appId) => {
      return axiosSecure.patch(`/policy-applications/${appId}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-paid-applications"]);
      Swal.fire("❌ Rejected", "Application has been rejected.", "error");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage Applications
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Policy</th>
              <th className="p-3 text-left">Applicant</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Applied Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-3 font-medium">{app.policyTitle}</td>
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded
                      ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }
                      ${
                        app.status === "paid"
                          ? "bg-yellow-100 text-yellow-700"
                          : ""
                      }`}
                  >
                    {app.status === "paid"
                      ? "Pending"
                      : app.status.charAt(0).toUpperCase() +
                        app.status.slice(1)}
                  </span>
                </td>
                <td className="p-3 space-y-1">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const name = formData.get("agentName");
                      const email = formData.get("agentEmail");
                      assignAgent.mutate({
                        appId: app._id,
                        agent: { agentName: name, agentEmail: email },
                      });
                    }}
                  >
                    <input
                      type="text"
                      name="agentName"
                      placeholder="Agent Name"
                      required
                      className="border rounded px-2 py-1 text-sm mb-1 w-full"
                    />
                    <input
                      type="email"
                      name="agentEmail"
                      placeholder="Agent Email"
                      required
                      className="border rounded px-2 py-1 text-sm mb-1 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs w-full"
                    >
                      Assign Agent
                    </button>
                  </form>

                  <button
                    onClick={() => rejectApp.mutate(app._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs w-full"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setIsDetailModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs w-full"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {isDetailModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Policy Title:</strong> {selectedApp.policyTitle}
              </li>
              <li>
                <strong>Applicant Name:</strong> {selectedApp.name}
              </li>
              <li>
                <strong>Email:</strong> {selectedApp.email}
              </li>
              <li>
                <strong>Address:</strong> {selectedApp.address}
              </li>
              <li>
                <strong>NID:</strong> {selectedApp.nid}
              </li>
              <li>
                <strong>Nominee:</strong> {selectedApp.nomineeName} (
                {selectedApp.nomineeRelationship})
              </li>
              <li>
                <strong>Health Conditions:</strong>{" "}
                {selectedApp.healthConditions.join(", ")}
              </li>
              <li>
                <strong>Coverage:</strong> ${selectedApp.coverage}
              </li>
              <li>
                <strong>Duration:</strong> {selectedApp.duration} Years
              </li>
              <li>
                <strong>Premium:</strong> ${selectedApp.estimatedPremiumMonthly}
                /mo or ${selectedApp.estimatedPremiumYearly}/yr
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

export default ManageApplications;
