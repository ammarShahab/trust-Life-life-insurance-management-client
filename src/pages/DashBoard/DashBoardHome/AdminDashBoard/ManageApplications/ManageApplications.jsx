import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState({});

  // Fetch paid applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["paid-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/paid");
      return res.data;
    },
  });

  // Fetch agent list
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // Assign agent mutation
  const assignAgent = useMutation({
    mutationFn: async ({ appId, agent }) => {
      return axiosSecure.patch(
        `/policy-applications/${appId}/assign-agent`,
        agent
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["paid-applications"]);
      Swal.fire("✅ Assigned!", "Agent has been assigned.", "success");
    },
  });

  // Reject application mutation
  const rejectApp = useMutation({
    mutationFn: async (appId) => {
      return axiosSecure.patch(`/policy-applications/${appId}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["paid-applications"]);
      Swal.fire("❌ Rejected", "Application has been rejected.", "error");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Trust Life | Dashboard Manage Application</title>
      </Helmet>
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
              <th className="p-3 text-left">Select Agent</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  🚫 No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3 font-medium">{app.policyTitle}</td>
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status === "paid" ? "Pending" : app.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <select
                        onChange={(e) => {
                          const [name, email] = e.target.value.split("|||");
                          setSelectedAgent((prev) => ({
                            ...prev,
                            [app._id]: {
                              agentName: name,
                              agentEmail: email,
                            },
                          }));
                        }}
                        className="border rounded py-1 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Agent
                        </option>
                        {agents.map((agent) => (
                          <option
                            key={agent.email}
                            value={`${agent.customerName}|||${agent.email}`}
                          >
                            {agent.customerName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="flex flex-col sm:flex-row sm:mt-4 space-x-2 text-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                      onClick={() =>
                        assignAgent.mutate({
                          appId: app._id,
                          agent: selectedAgent[app._id],
                        })
                      }
                      disabled={!selectedAgent[app._id]}
                    >
                      Assign Agent
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                      onClick={() => rejectApp.mutate(app._id)}
                    >
                      Reject
                    </button>

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                      onClick={() => {
                        setSelectedApp(app);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
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
