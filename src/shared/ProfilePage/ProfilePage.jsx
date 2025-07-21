import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import useCustomerRole from "../../hooks/useCustomerRole";
import Loading from "../../components/Loading/Loading";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useCustomerRole();

  console.log("profile user", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Fetch current user info
  const { data: customerData, isLoading } = useQuery({
    queryKey: ["customerProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/customers/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(
        `/customers/${user?.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["customerProfile", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Role Badge Colors
  const roleBadgeColor = {
    customer: "bg-blue-100 text-blue-800",
    agent: "bg-green-100 text-green-800",
    admin: "bg-purple-100 text-purple-800",
  };

  const onSubmit = (data) => {
    const updatedProfile = {
      email: user?.email,
      customerName: data.customerName,
      photoURL: data.photoURL,
    };
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-900">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <FaUserEdit /> Edit Your Profile
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          You can update your display name and profile photo here. Your email
          and last login details are fixed.
        </p>
      </div>

      {/* Last Login Display */}
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            Last Login:
          </span>{" "}
          {user?.metadata?.lastSignInTime || "N/A"}
        </p>
      </div>

      {/* Role Badge */}
      <div className="flex justify-center mb-4">
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            roleBadgeColor[customerData?.role] || "bg-gray-200 text-gray-800"
          }`}
        >
          Role: {role || "unknown"}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            {...register("customerName")}
            defaultValue={customerData?.customerName}
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Photo URL
          </label>
          <input
            type="text"
            {...register("photoURL")}
            defaultValue={customerData?.photoURL}
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            value={customerData?.email}
            disabled
            className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-gray-500 p-2 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            {isSubmitting ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
