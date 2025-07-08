import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";

import toast from "react-hot-toast";
import AuthContext from "../../../context/AuthContext/AuthContext";

const Register = () => {
  const { createUser, setUser, updateUser, setIsLoading, theme } =
    use(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    // console.log(name, email, photoURL, password);

    if (password.length < 6) {
      setErrorMessage(toast.error("Must be at least 6 characters long."));

      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage(
        toast.error("Must contain at least one lowercase letter.")
      );

      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage(
        toast.error("Must contain at least one uppercase letter.")
      );

      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            // console.log(user);
          })
          .catch((error) => {
            // console.log(error);
            setUser(user);
          });

        setErrorMessage("");
        toast.success("You have Registered Successfully");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);

        setErrorMessage(errorCode);
      });
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#f4e7e1af] py-10  ${
        theme ? "dark" : ""
      } dark:bg-zinc-300`}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-[#F2EDEA] rounded-2xl shadow-lg mt-10 dark:bg-zinc-400">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#fe8d02] rounded-lg hover:bg-[#fe5602]"
          >
            Register
          </button>
          {/* <p className=" text-xs text-red-400"> {errorMessage}</p> */}
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-white">
          Already have an account?
          <Link
            to="/auth/logIn"
            className="text-blue-500 hover:underline dark:text-white pl-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
