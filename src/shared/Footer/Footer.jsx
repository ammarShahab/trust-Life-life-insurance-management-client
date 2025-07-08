import React, { useContext } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/images/logo.png";

import { Link } from "react-router";
import AuthContext from "../../context/AuthContext/AuthContext";

const Footer = () => {
  const { theme, setTheme } = useContext(AuthContext);
  return (
    <>
      <div
        className={`${
          theme ? "dark" : ""
        }  dark:bg-zinc-600 bg-[#147073] max-h-screen`}
      >
        <div
          className={`flex flex-col justify-between py-10 px-2 mx-auto space-y-8 lg:flex-row lg:space-y-0 text-gray-800 ${
            theme ? "dark" : ""
          }  dark:bg-zinc-600 bg-[#147073]`}
        >
          <div className="lg:w-1/3 flex items-center">
            <a
              rel="noopener noreferrer"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-default-600">
                <img src={logo} alt="logo" />
              </div>
              <span className="text-2xl font-bold md:text-3xl text-white dark:text-white self-center">
                Trip <span className="text-[#fe8d02]">Nest</span>
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-white dark:text-white">
                Contact
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:info@mywebsite.com"
                    className="text-white hover:underline  dark:text-white"
                  >
                    info@mywebsite.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:underline dark:text-white"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-white dark:text-white">
                Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="text-white hover:underline dark:text-white"
                    rel="noopener noreferrer"
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase text-white dark:text-white">Address</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className=" text-white dark:text-white"
                    rel="noopener noreferrer "
                  >
                    20/5, West Panthapath (3rd Floor), Dhaka 1205
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-white dark:text-white">
                Social media
              </div>
              <div className="flex justify-start space-x-3">
                <div className="flex justify-center gap-5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaFacebookF></FaFacebookF>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaXTwitter></FaXTwitter>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaInstagram></FaInstagram>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaLinkedinIn></FaLinkedinIn>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-white mt-4 text-center">
          © {new Date().getFullYear()} Trip Nest. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
