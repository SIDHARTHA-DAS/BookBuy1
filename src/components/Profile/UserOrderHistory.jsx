/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [Order, setOrder] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://book-buy-11up.vercel.app/api/v1/get-order-history",
          { headers }
        );
        console.log(res.data.data);
        setOrder(res.data.data || []);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  if (!Order) {
    return (
      <div className="flex items-center justify-center bg-slate-500 h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {Order.length === 0 && (
        <div className="h-[80h] w-[25vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://imgs.search.brave.com/BS4C50yo9ksspnhKXf7cd1t1oSRLWTrb0OZWeN7pYoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9p/b3M3LzEyMDAvb3Jk/ZXItaGlzdG9yeS5q/cGc"
              alt="order-empty"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {Order.length > 0 && (
        <div className="h-[100%] ml-8 w-full p-0 md:p-4 text-zinc-400 sm:mx-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-none md:w-[5%] hidden md:block">Mode</div>
          </div>

          {Order.filter((item) => item?.book !== null).map((items, i) => (
            <div
              key={i}
              className="bg-gray-800 w-full rounded py-2 px-4 flex items-center gap-4 hover:bg-gray-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[5%] text-center">
                <h1>{i + 1}</h1>
              </div>

              <div className="w-[20%] truncate">
                <Link
                  to={`/view-book-details/${items?.book?._id || ""}`}
                  className="hover:underline"
                >
                  {items?.book?.title || "Book Deleted"}
                </Link>
              </div>

              <div className="w-[40%] truncate">
                <h1>{items?.book?.desc?.slice(0, 50) || ""} ...</h1>
              </div>

              <div className="w-[10%] text-center">
                <h1>{items?.book?.price || "-"}</h1>
              </div>

              <div className="w-[15%] text-center font-semibold">
                {items.status === "Order Place" ? (
                  <span className="text-yellow-500">{items.status}</span>
                ) : items.status === "Cancel" ? (
                  <span className="text-red-500">{items.status}</span>
                ) : (
                  <span className="text-green-500">{items.status}</span>
                )}
              </div>

              <div className="w-[10%] hidden md:block text-center">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "../Loader/Loader";
// import { Link } from "react-router-dom";

// const UserOrderHistory = () => {
//   const [Order, setOrder] = useState();

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get(
//         "https://bookbuy.onrender.com/api/v1/get-order-history",
//         { headers }
//       );
//       console.log(response.data.data);
//       setOrder(response.data.data);
//     };
//     fetch();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       {!Order && (
//         <div className="flex items-center justify-center bg-slate-500 h-screen">
//           <Loader />
//         </div>
//       )}
//       {Order && Order.length === 0 && (
//         <div className="h-[80h] w-[25vh] p-4 text-zinc-100">
//           <div className="h-[100%] flex flex-col items-center justify-center">
//             <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
//               No Order History
//             </h1>
//             <img
//               src="https://imgs.search.brave.com/BS4C50yo9ksspnhKXf7cd1t1oSRLWTrb0OZWeN7pYoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9p/b3M3LzEyMDAvb3Jk/ZXItaGlzdG9yeS5q/cGc"
//               alt="hkfdk"
//               className="h-[20vh] mb-8"
//             />
//           </div>
//         </div>
//       )}
//       {Order && Order.length > 0 && (
//         <div className="h-[100%] ml-8 w-full p-0 md:p-4 text-zinc-400 sm:mx-10 ">
//           <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
//             Your Order History
//           </h1>
//           <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-2">
//             <div className="w-[3%]">
//               <h1 className="text-center">Sr.</h1>
//             </div>
//             <div className="w-[22%]">
//               <h1 className="">Books</h1>
//             </div>
//             <div className="w-[45%]">
//               <h1 className="">Description</h1>
//             </div>
//             <div className="w-[9%]">
//               <h1 className="">Price</h1>
//             </div>
//             <div className="w-[16%]">
//               <h1 className="">Status</h1>
//             </div>
//             <div className="w-none md:w-[5%] hidden md:block">
//               <h1 className="">Mode</h1>
//             </div>
//           </div>
//           {Order.map((items, i) => (
//             <div
//               key={i}
//               className="bg-gray-800 w-full rounded py-2 px-4 flex items-center gap-4 hover:bg-gray-900 hover:cursor-pointer transition-all duration-300"
//             >
//               {/* Sr. */}
//               <div className="w-[5%] text-center">
//                 <h1>{i + 1}</h1>
//               </div>

//               {/* Book Title */}
//               <div className="w-[20%] truncate">
//                 <Link
//                   to={`/view-book-details/${items.book._id}`}
//                   className="hover:underline"
//                 >
//                   {items.book.title}
//                 </Link>
//               </div>

//               {/* Description */}
//               <div className="w-[40%] truncate">
//                 <h1>{items.book.desc.slice(0, 50)} ...</h1>
//               </div>

//               {/* Price */}
//               <div className="w-[10%] text-center">
//                 <h1>{items.book.price}</h1>
//               </div>

//               {/* Status */}
//               <div className="w-[15%] text-center">
//                 <h1 className="font-semibold">
//                   {items.status === "Order Place" ? (
//                     <span className="text-yellow-500">{items.status}</span>
//                   ) : items.status === "Cancel" ? (
//                     <span className="text-red-500">{items.status}</span>
//                   ) : (
//                     <span className="text-green-500">{items.status}</span>
//                   )}
//                 </h1>
//               </div>

//               {/* Mode */}
//               <div className="w-[10%] hidden md:block text-center">
//                 <h1 className="text-sm text-zinc-400">COD</h1>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default UserOrderHistory;
