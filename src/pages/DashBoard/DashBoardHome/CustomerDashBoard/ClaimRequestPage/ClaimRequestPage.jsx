import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import Loading from "../../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ClaimRequestPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/claim-requests/claim?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 sm:p-8">
      <Helmet>
        <title>Trust Life | Dashboard Claim Request</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
        Claim Request
      </h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">No applications available for claim.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">Policy Title</th>
                <th className="px-4 py-3">Agent Name</th>
                <th className="px-4 py-3">Claim Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{app.policyTitle}</td>
                  <td className="px-4 py-3">{app.agentName}</td>
                  <td className="px-4 py-3 capitalize">
                    {app.claim_status || "pending"}
                  </td>
                  <td className="px-4 py-3">
                    {app.claim_status === "claimed" ? (
                      <button
                        disabled
                        className="px-4 py-1 text-sm bg-gray-300 text-white rounded cursor-not-allowed"
                      >
                        Claimed
                      </button>
                    ) : app.claim_status === "approved" ? (
                      <span className="px-4 py-1 text-sm bg-green-500 text-white rounded">
                        Approved
                      </span>
                    ) : (
                      <Link
                        to={`/dashboard/claim/${app._id}`}
                        className="px-4 py-1 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded"
                      >
                        Claim
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimRequestPage;
