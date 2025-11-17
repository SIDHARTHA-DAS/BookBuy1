import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookCard = ({ data, Favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookbuy.onrender.com/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    toast(response.data.message);
  };

  return (
    <div
      className="
        bg-gray-700 
        rounded-lg 
        shadow-lg 
        overflow-hidden 
        w-full
        max-w-[260px] 
        mx-auto 
        transition 
        hover:scale-105 
        duration-300
      "
    >
      {/* Clickable Card Area */}
      <Link to={`/view-book-details/${data._id}`}>
        {/* Image */}
        <img
          src={data.url}
          alt="book-cover"
          className="w-full h-[220px] object-cover"
        />

        {/* Book Info */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-white truncate">
            {data.title}
          </h2>

          <p className="text-gray-400 text-sm font-bold mt-1">
            by - {data.author}
          </p>

          <p className="text-gray-200 text-sm mt-3 font-semibold">
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {/* Remove Button ONLY IF Favourite is true */}
      {Favourite && (
        <div className="px-4 pb-4">
          <button
            onClick={handleRemoveBook}
            className="
              w-full 
              bg-blue-600 
              text-white 
              py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition 
              duration-300
            "
          >
            Remove from Favourites
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// const BookCard = ({ data, Favourite }) => {
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//     bookid: data._id,
//   };

//   const handelRemoveBook = async () => {
//     const response = await axios.put(
//       "http://localhost:1000/api/v1/remove-book-from-favourite",
//       {},
//       { headers }
//     );
//     toast(response.data.message);
//   };
//   // console.log(data)
//   return (
//     <>
//       <Link to={`/view-book-details/${data._id}`}>
//         <div className="max-w-xs m-11 bg-gray-700 rounded-lg shadow-lg overflow-hidden">
//           <ToastContainer />
//           {/* Book Cover */}
//           <img
//             src={data.url}
//             alt={"adfa"}
//             className="h-[25vh]  mx-auto object-cover rounded pt-2"
//           />

//           {/* Book Details */}
//           <div className="p-4">
//             {/* Title */}
//             <h2 className="text-xl font-bold text-white truncate">
//               {data.title}
//             </h2>

//             {/* Author */}
//             <p className="text-gray-400 text-sm font-bold mt-1">
//               {" "}
//               by - {data.author}
//             </p>

//             {/* Description */}
//             <p className="text-gray-200 text-sm mt-2 truncate-2-lines">
//               {/* {book.description} */}₹ {data.price}
//             </p>

//             {/* Price */}
//           </div>
//           <Link>
//             {Favourite && (
//               <div className="flex justify-between items-center mt-4 pb-3 pr-3">
//                 <span className="text-lg font-semibold text-blue-600"></span>
//                 {/* Buy Now Button */}
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//                   onClick={handelRemoveBook}
//                 >
//                   Remove from Favourites
//                 </button>
//               </div>
//             )}
//           </Link>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default BookCard;


