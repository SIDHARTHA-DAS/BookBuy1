// import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../../../public/logo.png";
import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about-us",
  },
  {
    title: "AllBooks",
    link: "/all-books",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];
const Footer = () => {
  return (
    <>
      <section className="px-8 py-4 bg-gray-900 text-white">
        <div className="grid md:grid-cols-2 gap-10 py-5">
          {/* LEFT SIDE – COMPANY DETAILS */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              BookBuy
            </h1>

            <p className="text-white text-sm leading-relaxed">
              Discover a world of stories at your fingertips. <br />
              Our bookstore brings together timeless classics, <br />
              modern bestsellers, and inspiring reads — all in one place. <br />
            </p>

            {/* ADDRESS */}
            <div className="flex items-center gap-3 text-blue-500 mt-5">
              <FaLocationArrow />
              <p>Odisha, Bhubaneswar</p>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3 mt-3 text-blue-400">
              <FaMobileAlt />
              <p>+91 7077091042</p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-6 text-white">
              <a href="#">
                <FaInstagram className="text-3xl hover:text-red-300 duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-blue-400 duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:text-blue-800 duration-300" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE – 3 LINK COLUMNS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:pl-10">
            {/* COLUMN 1 */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold mb-3">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, i) => (
                  <Link
                    to={"/"}
                    key={i}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 text-gray-400"
                  >
                    <span>&#11162;</span> {link.title}
                  </Link>
                ))}
              </ul>
            </div>

            {/* COLUMN 2 */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold mb-3">Links</h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, i) => (
                  <Link
                    to={"/"}
                    key={i}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 text-gray-400"
                  >
                    <span>&#11162;</span> {link.title}
                  </Link>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold mb-3">Location</h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, i) => (
                  <Link
                    to={"/"}
                    key={i}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 text-gray-400"
                  >
                    <span>&#11162;</span> {link.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-10  border-t-2 border-gray-300/50 text-white">
          @copyright 2024 All rights reserved || Made with ❤️ by Sidharth
        </div>
      </section>
    </>
  );
};

export default Footer;
