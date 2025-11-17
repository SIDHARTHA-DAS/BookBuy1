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
    <div className="bg-gray-900 text-white">
      <section className="container mx-auto">
        <div className=" grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 text-white">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              BookBuy
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Possimus, voluptate.{" "}
            </p>
            <br />
            <div className="flex items-center gap-3 text-blue-500">
              <FaLocationArrow />
              <p>Odisha, Bhubaneswar</p>
            </div>
            <div className="flex items-center gap-3 mt-3  text-blue-400">
              <FaMobileAlt />
              <p>+91 7077091042</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6  text-white">
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
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  Important Links
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {FooterLinks.map((link,i) => (
                     
                    <Link to={"/"} key={i} className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 space-x-1 text-gray-500">
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link,i) => (
                     
                    <Link to={"/"} key={i} className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 space-x-1 text-gray-500">
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  Location
                </h1>
                {/* <ul className="list-disc list-inside"> */}
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link,i) => (
                     
                    <Link to={"/"} key={i} className="cursor-pointer hover:translate-x-1 duration-300 hover:text-blue-400 space-x-1 text-gray-500">
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-10  border-t-2 border-gray-300/50 text-white">
            @copyright 2024 All rights reserved || Made with ❤️ by Sidharth
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;