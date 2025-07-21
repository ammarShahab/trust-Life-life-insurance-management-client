import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: claims = [], isLoading } = useQuery({
    queryKey: ["claim-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/claim-requests?agentEmail=${user.email}`
      );
      return res.data;
    },
  });

  const approveClaimMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/claim-request/${id}`, {
        claim_status: "approved",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Claim has been approved", "success");
      queryClient.invalidateQueries(["claim-requests"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to approve claim", "error");
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve this claim?",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClaimMutation.mutate(id);
      }
    });
  };

  const openModal = (policy) => {
    setSelectedPolicy(policy);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPolicy(null);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Claim Requests</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : claims.length === 0 ? (
        <p>No claim requests available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Policy Title</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((app) => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.policyTitle}</td>
                  <td>${app.amount || "N/A"}</td>
                  <td className="max-w-[200px] truncate">{app.claim_reason}</td>
                  <td>
                    <a
                      className="text-blue-500 underline"
                      href={app.claim_document}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => openModal(app.policyInfo)}
                      className="btn btn-sm btn-info"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-2">
              Policy Details
            </Dialog.Title>
            {selectedPolicy ? (
              <div className="space-y-2">
                <img
                  src={selectedPolicy.image}
                  alt={selectedPolicy.title}
                  className="rounded"
                />
                <h3 className="font-semibold">{selectedPolicy.title}</h3>
                <p className="text-sm">{selectedPolicy.description}</p>
                <p>
                  <strong>Coverage:</strong> {selectedPolicy.coverage}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedPolicy.duration}
                </p>
                <p>
                  <strong>Premium:</strong> {selectedPolicy.premium}
                </p>
              </div>
            ) : (
              <p>No policy data found.</p>
            )}
            <div className="mt-4 text-right">
              <button onClick={closeModal} className="btn btn-sm">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PolicyClearance;
