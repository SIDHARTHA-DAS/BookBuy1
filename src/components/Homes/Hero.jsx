import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentlyAdded from "./RecentlyAdded";
import Loader from "../Loader/Loader";
import axios from "axios";

const Hero = () => {
  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null); // dynamic selected book

  // Loader Logic
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      setLoading(false);
    } else {
      sessionStorage.setItem("visited", "true");
      setTimeout(() => setLoading(false), 2000);
    }
  }, []);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookbuy.onrender.com/api/v1/get-recent-books"
        );

        const data = response.data.data;

        setBooks(data);
        setActiveBook(data[0]); // first book show on Hero initially
      } catch (err) {
        console.log("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // Login Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (loading || books.length === 0 || !activeBook) return <Loader />;

  return (
    <>
      <div className="lg:max-h-full max-w-full sm:min-h-[650px] flex justify-center items-center bg-gray-950 text-white bg-[url('/board.png')] bg-cover">
        <div className="container pb-8 sm:pb-0 lg:p-[70px]">
          <div className="grid grid-cols-1 sm:grid-cols-2">

            {/* TEXT SECTION */}
            <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-4 text-center sm:text-left order-2 sm:order-1 pr-7">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                {activeBook.title}
                <p className="bg-clip-text text-sm font-semibold bg-gradient-to-b from-primary to-secondary text-yellow-500">
                  {activeBook.author}
                </p>
              </h1>

              <p className="text-sm md:text-2xl text-white font-semibold">{activeBook.desc}</p>

              <div className="mt-6">
                {isLoggedIn ? (
                  <Link
                    to="/all-books"
                    className="bg-green-500 hover:bg-green-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full m-8"
                  >
                    Order Now
                  </Link>
                ) : (
                  <Link
                    to="/SignUp"
                    className="bg-blue-500 hover:bg-blue-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full m-8"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center mb-9 md:mb-24 ">
                <img
                  src={activeBook.url}
                  className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] object-contain"
                />
              </div>

              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-zinc-500 rounded-full cursor-pointer p-2 ">
                {books.map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    onClick={() => setActiveBook(item)}
                    className="max-w-[100px] h-[100px] object-contain hover:scale-110 duration-200"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <RecentlyAdded />
    </>
  );
};

export default Hero;




// import React from "react";
// import Book1 from "../../../public/book2.jpg";
// import Book2 from "../../../public/book1.jpg";
// import Book3 from "../../../public/book3.jpg";
// import { Link } from "react-router-dom";
// import RecentlyAdded from "./RecentlyAdded";


// const ImageList = [
//   {
//     id: 1,
//     img: Book1,
//     title: "His Life will forever be Changed",
//     description:
//       "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: 2,
//     img: Book2,
//     title: "Who's there",
//     description:
//       "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     id: 3,
//     img: Book3,
//     title: "Lost Boy",
//     description:
//       "Lost Boy, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
// ];

// const Hero = () => {
//   const [imageId, setImageId] = React.useState(Book1);
//   const [title, setTitle] = React.useState("His Life will forever be Changed");
//   const [description, setDescription] = React.useState(
//     "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//   );

//   return (
//     <>
//       <div className="lg:max-h-full max-w-full sm:min-h-[650px]  flex justify-center items-center bg-gray-950 text-white bg-[url('board.png')] bg-cover">
//         <div className="container pb-8 sm:pb-0 lg:p-[70px]">
//           <div className="grid grid-cols-1 sm:grid-cols-2">
//             {/* text content section */} 
//             <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-4 text-center sm:text-left order-2 sm:order-1 pr-7">
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
//                 {title}
//                 <p className="bg-clip-text text-transparent bg-gradient-to-b from-primary text-right text-sm to-secondary bg-black text-blue-600">
//                   by Anonymous
//                 </p>{" "}
//               </h1>
//               <p className="text-sm">{description}</p>
//               <div className="mt-6">
//                 <Link
//                   to="/all-books"
//                   className="bg-blue-500 from-primary to-secondary hover:bg-blue-700  hover:scale-105 duration-200 text-white py-2 px-4 rounded-full m-8"
//                 >
//                   Order Now
//                 </Link>
//               </div>
//             </div>
//             {/* Image section */}
//             <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
//               <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
//                 <img
//                   data-aos="zoom-in"
//                   data-aos-once="true"
//                   src={imageId}
//                   alt="biryani img"
//                   className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
//                 />
//               </div>
//               <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-zinc-500 rounded-full cursor-pointer">
//                 {ImageList.map((item,id) => (
                   
//                   <img
//                   key={id}
//                     data-aos="zoom-in"
//                     data-aos-once="true"
//                     src={item.img}
//                     onClick={() => {
//                       setImageId(
//                         item.id === 1 ? Book1 : item.id === 2 ? Book2 : Book3
//                       );
//                       setTitle(item.title);
//                       setDescription(item.description);
//                     }}
//                     alt="biryani img"
//                     className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RecentlyAdded/>
//       {/* <BookCard/> */}
//     </>
//   );
// };

// export default Hero;
