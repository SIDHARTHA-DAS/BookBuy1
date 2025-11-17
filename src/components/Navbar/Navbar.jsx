import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  // ---------------------------
  // DEFAULT LINKS (when no login)
  // ---------------------------
  const defaultLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  // ---------------------------
  // USER LINKS
  // ---------------------------
  const userLinks = [
    ...defaultLinks,
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  // ---------------------------
  // ADMIN LINKS
  // ---------------------------
  const adminLinks = [
    ...defaultLinks,
    { title: "Cart", link: "/cart" },
    { title: "Admin Profile", link: "/profile" },
  ];

  // ---------------------------
  // FINAL LINKS BASED ON LOGIN
  // ---------------------------
  let linksToShow = defaultLinks;

  if (isLoggedIn && role === "user") linksToShow = userLinks;
  if (isLoggedIn && role === "admin") linksToShow = adminLinks;

  return (
    <>
      {/* NAVBAR */}
      <nav className="z-50 relative bg-gray-800 text-white px-8 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" width="40" />
          <h1 className="text-xl md:text-3xl font-semibold">BookBuy</h1>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          {linksToShow.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={`${
                item.title.includes("Profile")
                  ? "px-3 py-1 border border-blue-500 rounded hover:bg-black"
                  : "hover:text-blue-400"
              } transition-all duration-300`}
            >
              {item.title}
            </Link>
          ))}

          {/* SIGN IN / SIGN UP if NOT logged in */}
          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className="px-3 py-1 border border-blue-500 rounded hover:bg-black transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-white transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="block md:hidden text-white text-2xl hover:text-blue-300 duration-300"
          onClick={toggleNav}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* MOBILE NAV MENU */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } bg-gray-800 text-white h-screen absolute top-0 left-0 w-full flex-col items-center justify-center gap-6 text-3xl md:hidden z-40`}
      >
        {linksToShow.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            onClick={toggleNav}
            className="hover:text-blue-400 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              onClick={toggleNav}
              className="px-4 py-2 border border-blue-500 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              onClick={toggleNav}
              className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;


// import { Link } from "react-router-dom";
// import { FaGripLines } from "react-icons/fa";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const links = [
//     {
//       title: "Home",
//       link: "/",
//     },
//     {
//       title: "About Us",
//       link: "/about-us",
//     },
//     {
//       title: "All Books",
//       link: "/all-books",
//     },
//     {
//       title: "Contact Us",
//       link: "/contact-us",
//     },
//     {
//       title: "Cart",
//       link: "/cart",
//     },
//     {
//       title: "Profile",
//       link: "/profile",
//     },
//     {
//       title: "Admin Profile",
//       link: "/profile",
//     },
//   ];

//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const role =  useSelector((state) => state.auth.role);

//   if (isLoggedIn === true && role === "user") {
//     links.splice(6, 3);
//   }
//   if(isLoggedIn == true && role === "admin"){
//      links.splice(5,1);
//   }

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNav = () => {
//     setIsOpen(!isOpen); // Toggles the state
//   };

//   return (
//     <>
//       <nav className="z-50 relative bg-gray-800 text-white px-8 py-4 flex items-center justify-between ">
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             className=""
//             src="/logo.png"
//             alt="log"
//             height="30px"
//             width="40px"
//           />
//           <h1 className="text-xl md:text-3xl font-semibold ">BookBuy</h1>
//         </Link>
//         <div className="block md:flex gap-4 items-center">
//           <div className="hidden md:flex gap-4">
//             {links.map((items, i) => (
//               <div key={i} className="flex items-center">
//                 {items.title === "Profile" || items.title === "Admin Profile" ? (
//                   <Link
//                     to={items.link}
//                     className="text-white px-2 py-1 border border-blue-500 rounded hover:bg-black hover:text-white transition-all duration-300"
//                   >
//                     {items.title}
//                   </Link>
//                 ) : (
//                   <Link
//                     to={items.link}
//                     className="hover:text-blue-500 transition-all duration-300"
//                   >
//                     {items.title}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>
//           {isLoggedIn === false && (
//             <>
//               <div className="hidden md:flex gap-4">
//                 <Link
//                   to="/LogIn"
//                   className={`text-white px-2 py-1 border border-blue-500 rounded  hover:bg-black hover:text-white transition-all duration-300`}
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/SignUp"
//                   className={`px-2 py-1 border bg-blue-500 text-black rounded hover:bg-white hover:text-gray-900 transition-all duration-300`}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </>
//           )}
//           <button
//             className="block md:hidden text-white text-2xl hover:text-blue-300 duration-300"
//             onClick={toggleNav}
//           >
//             <FaGripLines />
//           </button>
//         </div>
//       </nav>

//       <div
//         className={`${
//           isOpen ? "block" : "hidden"
//         } bg-gray-800 text-white h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-4 text-3xl md:hidden z-40`}
//       >
//         {links.map((items, i) => (
//           <Link
//             key={i}
//             to={items.link}
//             className="font-semibold hover:text-blue-500 transition-all duration-300"
//             onClick={toggleNav} // Close the menu on link click
//           >
//             {items.title}
//           </Link>
//         ))}
//         {isLoggedIn === false && (
//           <>
//             <Link
//               to="/LogIn"
//               className="text-white px-4 py-2 border border-blue-500 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
//               onClick={toggleNav} // Close the menu on sign in click
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/SignUp"
//               className="px-4 py-2 border bg-blue-500 text-black rounded hover:bg-blue-700 hover:text-gray-900 transition-all duration-300"
//               onClick={toggleNav} // Close the menu on sign up click
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;
