import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const GoogleLoginButton = () => {
  const { googleSignIn, setIsLoading, provider } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleGoogleLogin = () => {
    googleSignIn(provider)
      .then(async (result) => {
        const user = result.user;
        setIsLoading(true);
        // setUser(user);
        console.log("from google sign in", user);

        const gmtDate = new Date(user.metadata.creationTime);

        const options = {
          timeZone: "Asia/Dhaka", // Bangladesh Timezone
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, // 24-hour format
        };

        const bdTime = gmtDate.toLocaleString("en-US", options);

        const customerInfo = {
          customerName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "customer",
          // last_log_in: new Date().toISOString(),
          lastSignInTime: user.metadata.lastSignInTime,
          registrationDate: bdTime,
        };
        console.log("customer Info from googleSignIn", customerInfo);

        const customerRes = await axiosInstance.post(
          "/customers",
          customerInfo
        );
        console.log(customerRes.data);

        toast.success("Logged In Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="space-y-4">
      {/* Divider with "or" */}
      <div className="flex items-center gap-3">
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
      </div>

      {/* Google login button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleGoogleLogin}
          className="flex justify-center items-center gap-2 w-full px-4 py-2 border rounded-lg 
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-700 dark:text-gray-300"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
