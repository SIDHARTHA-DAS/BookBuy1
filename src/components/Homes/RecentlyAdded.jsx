import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState();
  useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get(
        "https://bookbuy.onrender.com/api/v1/get-recent-books"
      );
      console.log(response.data); 
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching:", error.response || error);
    }
  };
  fetch();
}, []);

  return (
    <>
      <div>
        <h4 className="bg-gray-900 text-white text-center pt-11 text-3xl font-semibold">
          Recently Added Books
        </h4>

        {!data && (
          <div className="flex items-center justify-center bg-slate-500 h-screen">
            <Loader />
          </div>
        )}

        <div className="bg-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5 place-items-center">
          {data &&
            data.map((item, i) => {
              return <BookCard key={i} data={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default RecentlyAdded;

// import React from "react";

// const BookCard = ({ book }) => {
//   return (
//     <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* Book Cover */}
//       <img
//         src={book.coverImage}
//         alt={book.title}
//         className="w-full h-64 object-cover"
//       />

//       {/* Book Details */}
//       <div className="p-4">
//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-800 truncate">{book.title}</h2>

//         {/* Author */}
//         <p className="text-gray-600 text-sm mt-1">{book.author}</p>

//         {/* Description */}
//         <p className="text-gray-600 text-sm mt-2 truncate-2-lines">
//           {book.description}
//         </p>

//         {/* Price */}
//         <div className="flex justify-between items-center mt-4">
//           <span className="text-lg font-semibold text-blue-600">${book.price}</span>
//           {/* Buy Now Button */}
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
