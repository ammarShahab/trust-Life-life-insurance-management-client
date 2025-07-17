import { useQuery } from "@tanstack/react-query";

import Loading from "../../../../../components/Loading/Loading";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });

  const totalIncome = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold">Manage Transactions</h2>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-4">
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by Date Range</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by User</option>
          <option value="customer1@customer.com">customer1@customer.com</option>
          <option value="customer2@customer.com">customer2@customer.com</option>
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by Policy</option>
          <option value="Health Assurance Plus">Health Assurance Plus</option>
          <option value="Senior Life Secure">Senior Life Secure</option>
        </select>
      </div>

      {/* Total Income Card */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-sm">
        <h4 className="text-lg font-semibold mb-1">Total Income</h4>
        <p className="text-2xl font-bold text-green-600">${totalIncome}</p>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Customer Email</th>
              <th className="px-4 py-2 border">Policy Name</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-4 py-2 border">{payment.transactionId}</td>
                <td className="px-4 py-2 border">{payment.email}</td>
                <td className="px-4 py-2 border">{payment.policyTitle}</td>
                <td className="px-4 py-2 border">${payment.amount}</td>
                <td className="px-4 py-2 border">
                  {new Date(payment.paymentTime).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status === "paid" ? "Success" : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageTransactions;
