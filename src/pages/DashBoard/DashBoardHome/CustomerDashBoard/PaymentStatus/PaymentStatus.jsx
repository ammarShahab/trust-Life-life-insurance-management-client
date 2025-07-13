import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";

const PaymentStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [paymentModes, setPaymentModes] = useState({});
  const [disabledRows, setDisabledRows] = useState({});

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["payment-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
  });

  const handlePay = (id) => {
    setDisabledRows({ ...disabledRows, [id]: true });
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Status</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Policy</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Premium</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const id = app._id;
                const mode = paymentModes[id] || "monthly";
                const premium =
                  mode === "yearly"
                    ? app.estimatedPremiumYearly
                    : app.estimatedPremiumMonthly;
                const isDisabled = disabledRows[id];

                return (
                  <tr key={id} className="border-t">
                    <td className="p-3">{app.policyTitle}</td>
                    <td className="p-3">{app.policyCategory}</td>
                    <td className="p-3 min-w-[120px]">
                      <select
                        value={mode}
                        onChange={(e) =>
                          setPaymentModes({
                            ...paymentModes,
                            [id]: e.target.value,
                          })
                        }
                        disabled={isDisabled}
                        className="w-full text-sm border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </td>
                    <td className="p-3">৳{premium}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          app.status === "pending"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {app.status === "pending" ? "Due" : "Paid"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        disabled={isDisabled}
                        onClick={() => handlePay(id)}
                        className={`px-4 py-1 rounded text-white ${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#baa53a] hover:bg-[#fcd547]"
                        }`}
                      >
                        Make Payment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
