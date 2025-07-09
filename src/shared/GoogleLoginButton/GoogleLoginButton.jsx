import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const GoogleLoginButton = () => {
  const { googleSignIn, setIsLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setIsLoading(true);
        // setUser(user);
        // console.log(user);

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
