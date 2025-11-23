import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allorders, setAllorders] = useState([]);
  const [Option, setOption] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userdiv, setuserDiv] = useState("hidden");
  const [userdivData, setuserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookbuy.onrender.com/api/v1/get-all-orders",
          { headers }
        );
        setAllorders(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (e) => {
    setValues({ status: e.target.value });
  };

  const submitChanges = async (i) => {
    try {
      const id = allorders[i]._id;
      await axios.put(
        `https://bookbuy.onrender.com/api/v1/update-status/${id}`,
        values,
        { headers }
      );

      setAllorders((prev) => {
        const updated = [...prev];
        updated[i].status = values.status;
        return updated;
      });

      toast.success("Status Updated Successfully!");
      setOption(-1);
    } catch (err) {
      console.log(err)
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      {!allorders || allorders.length === 0 ? (
        <div className="flex items-center justify-center h-screen bg-slate-500">
          <Loader />
        </div>
      ) : (
        <>
          <div className="h-[100%] ml-8 w-full p-0 md:p-4 text-zinc-400 sm:mx-10 ">
            <ToastContainer />
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All Orders
            </h1>

            {/* Header */}
            <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-4">
              <div className="w-[3%] text-center">Sr.</div>
              <div className="w-[40%] md:w-[22%]">Books</div>
              <div className="hidden md:block w-[45%]">Description</div>
              <div className="w-[17%] md:w-[9%]">Price</div>
              <div className="w-[30%] md:w-[16%]">Status</div>
              <div className="w-[10%] md:w-[5%] text-center">
                <FaUserLarge />
              </div>
            </div>

            {/* Order List */}
            {allorders?.map((items, i) => (
              <div
                key={i}
                className="bg-gray-900 w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-700 transition"
              >
                <div className="w-[3%] text-center">{i + 1}</div>

                <div className="w-[40%] md:w-[22%] truncate">
                  <Link
                    to={`/view-book-details/${items?.book?._id || ""}`}
                    className="hover:underline"
                  >
                    {items?.book?.title || "Book Deleted"}
                  </Link>
                </div>

                <div className="hidden md:block w-[45%] truncate">
                  {items?.book?.desc?.slice(0, 50) || ""}...
                </div>

                <div className="w-[17%] md:w-[9%] text-center">
                  ₹ {items?.book?.price || "--"}
                </div>

                <div className="w-[30%] md:w-[16%]">
                  <button
                    className="font-semibold hover:scale-105 transition"
                    onClick={() => setOption(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <span className="text-yellow-500">{items.status}</span>
                    ) : items.status === "Canceled" ? (
                      <span className="text-red-500">{items.status}</span>
                    ) : (
                      <span className="text-green-500">{items.status}</span>
                    )}
                  </button>

                  {Option === i && (
                    <div className="flex mt-3 items-center gap-2">
                      <select
                        className="bg-gray-800 p-1 rounded"
                        value={values.status}
                        onChange={change}
                      >
                        {[
                          "Order Placed",
                          "Out For Delivery",
                          "Delivered",
                          "Canceled",
                        ].map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <button
                        className="text-green-500 hover:text-purple-600"
                        onClick={() => submitChanges(i)}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-[10%] md:w-[5%] text-center">
                  <button
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                    className="text-xl hover:text-orange-500"
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {userdivData && (
            <SeeUserData
              userdivData={userdivData}
              userdiv={userdiv}
              setuserDiv={setuserDiv}
            />
          )}
        </>
      )}
    </>
  );
};

export default AllOrders;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "../components/Loader/Loader";
// import { FaUserLarge } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { FaCheck } from "react-icons/fa";
// import { IoOpenOutline } from "react-icons/io5";
// import { toast, ToastContainer } from "react-toastify";
// import SeeUserData from "./SeeUserData";

// const AllOrders = () => {
//   const [allorders, setAllorders] = useState([]);
//   const [Option, setOption] = useState(-1);
//   const [values, setValues] = useState({ status: "" });
//   const [userdiv, setuserDiv] = useState("hidden")
//   const [userdivData, setuserDivData] = useState()

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   // FIX 1: NO INFINITE CALLS
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(
//           "https://bookbuy.onrender.com/api/v1/get-all-orders",
//           { headers }
//         );
//         setAllorders(response.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const change = (e) => {
//     const { value } = e.target;
//     setValues({ status: value });
//   };

//   const submitChanges = async (i) => {
//     try {
//       const id = allorders[i]._id;

//       const response = await axios.put(
//         `https://bookbuy.onrender.com/api/v1/update-status/${id}`,
//         values,
//         { headers }
//       );
//       console.log(response)

//       //  UPDATE UI INSTANTLY
//       setAllorders((prev) => {
//         const updated = [...prev];
//         updated[i].status = values.status;
//         return updated;
//       });

//       toast.success("Status updated!");

//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <>
//       {!allorders || allorders.length === 0 ? (
//         <div className="flex items-center justify-center h-screen bg-slate-500">
//           <Loader />
//         </div>
//       ) : (
//         <>
//           <div className="h-[100%] ml-8 w-full p-0 md:p-4 text-zinc-400 sm:mx-10 ">
//             <ToastContainer />
//             <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
//               Your Order History
//             </h1>

//             {/* Header Row */}
//             <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-4">
//               <div className="w-[3%]">
//                 <h1 className="text-center">Sr.</h1>
//               </div>
//               <div className="w-[40%] md:w-[22%]">
//                 <h1>Books</h1>
//               </div>
//               <div className="w-0 md:w-[45%] hidden md:block">
//                 <h1>Description</h1>
//               </div>
//               <div className="w-[17%] md:w-[9%]">
//                 <h1>Price</h1>
//               </div>
//               <div className="w-[30%] md:w-[16%]">
//                 <h1>Status</h1>
//               </div>
//               <div className="w-[10%] md:w-[5%]">
//                 <h1><FaUserLarge /></h1>
//               </div>
//             </div>

//             {/* Order List */}
//             {allorders.map((items, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-900 w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-700 hover:cursor-pointer transition-all duration-300"
//               >
//                 <div className="w-[3%]">
//                   <h1 className="text-center">{i + 1}</h1>
//                 </div>

//                 <div className="w-[40%] md:w-[22%]">
//                   <Link to={`/view-book-details/${items.book._id}`}>
//                     {items.book.title}
//                   </Link>
//                 </div>

//                 <div className="w-0 md:w-[45%] hidden md:block">
//                   <h1>{items.book.desc.slice(0, 50)}...</h1>
//                 </div>

//                 <div className="w-[17%] md:w-[9%]">
//                   <h1>₹ {items.book.price}</h1>
//                 </div>

//                 {/* Status With Options */}
//                 <div className="w-[30%] md:w-[16%]">
//                   <button 
//                     className="font-semibold hover:scale-105 transition-all duration-300"
//                     onClick={() => setOption(i)}
//                   >
//                     {items.status === "Order Placed" ? (
//                       <div className="text-yellow-500">{items.status}</div>
//                     ) : items.status === "Canceled" ? (
//                       <div className="text-red-500">{items.status}</div>
//                     ) : (
//                       <div className="text-green-500">{items.status}</div>
//                     )}
//                   </button>

//                   {Option === i && (
//                     <div className="flex mt-4">
//                       <select
//                         className="bg-gray-900 p-1 rounded"
//                         name="status"
//                         onChange={change}
//                         value={values.status}
//                       >
//                         {[
//                           "Order Placed",
//                           "Out For Delivery",
//                           "Delivered",
//                           "Canceled",
//                         ].map((s, idx) => (
//                           <option value={s} key={idx}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>

//                       <button
//                         className="text-green-500 hover:text-purple-600 mx-2"
//                         onClick={() => submitChanges(i)}
//                       >
//                         <FaCheck />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="w-[10%] md:w-[5%]">
//                   <button
//                     className="text-xl hover:text-orange-500"
//                     onClick={() => {setOption(-1);
//                        setuserDiv("fixed");
//                       setuserDivData(items.user)}}
//                   >
//                     <IoOpenOutline />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {userdivData && (
//             <SeeUserData 
//             userdivData={userdivData}
//             userdiv={userdiv}
//             setuserDiv={setuserDiv}
//             />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default AllOrders;

// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import Loader from "../components/Loader/Loader";
// // import { FaUserLarge } from "react-icons/fa6";
// // import { Link } from "react-router-dom";
// // import { FaCheck } from "react-icons/fa";
// // import { IoOpenOutline } from "react-icons/io5";
// // import { toast, ToastContainer } from "react-toastify";

// // const AllOrders = () => {
// //   const [allorders, setAllorders] = useState();
// //   const [Option, setOption] = useState(-1);
// //   const [values, setValues] = useState({status:""})

// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //   };

// //   useEffect(() => {
// //     const fetch = async () => {
// //       const response = await axios.get(
// //         "http://localhost:1000/api/v1/get-all-orders",
// //         { headers }
// //       );
// //       setAllorders(response.data.data);
// //     };
// //     fetch();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [allorders]);

// //   const change = (e) =>{
// //     const {value} = e.target;
// //     setValues({status:value})
// //   }

// //   const submitChanges = async (i) =>{
// //     const id = allorders[i]._id;
// //     const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`,values,{headers})
// //     console.log(response)
// //   }
  
// //    allorders && allorders.splice(allorders.length - 1,1)
 

// //   return (
// //     <>
// //       {!allorders && (
// //         <div className="flex items-center justify-center h-screen bg-slate-500">
// //           <Loader />
// //         </div>
// //       )}

// //       {allorders && allorders.length > 0 && (
// //         <>
// //           <div className="h-[100%] ml-8 w-full p-0 md:p-4 text-zinc-400 sm:mx-10 ">
// //             <ToastContainer/>
// //             <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
// //               Your Order History
// //             </h1>
// //             <div className="mt-4 bg-gray-800 w-full rounded py-2 px-4 flex gap-4">
// //               <div className="w-[3%] ">
// //                 <h1 className="text-center">Sr.</h1>
// //               </div>
// //               <div className="w-[40%] md:w-[22%]">
// //                 <h1 className="">Books</h1>
// //               </div>
// //               <div className="w-0 md:w-[45%] hidden md:block">
// //                 <h1 className="">Description</h1>
// //               </div>
// //               <div className="w-[17%] md:w-[9%]">
// //                 <h1 className="">Price</h1>
// //               </div>
// //               <div className="w-[30%] md:w-16%">
// //                 <h1 className="">Status</h1>
// //               </div>
// //               <div className="w-[10%] md:w-[5%]">
// //                 <h1 className="">
// //                   <FaUserLarge />
// //                 </h1>
// //               </div>
// //             </div>
// //             {allorders &&
// //               allorders.map((items, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-gray-900 w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-700 hover:cursor-pointer transition-all duration-300"
// //                 >
// //                   <div className="w-[3%]">
// //                     <h1 className="text-center">{i + 1}</h1>
// //                   </div>
// //                   <div className="w-[40%] md:w-[22%]">
// //                     <Link to={`/view-book-details/${items.book._id}`}>
// //                       {items.book.title}
// //                     </Link>
// //                   </div>
// //                   <div className="w-0 md:w-[45%] hidden md:block">
// //                     <h1>{items.book.desc.slice(0, 50)} ...</h1>
// //                   </div>
// //                   <div className="w-[17%] md:w-[9%]">
// //                     <h1>₹ {items.book.price}</h1>
// //                   </div>
// //                   <div className="w-[30%] md:w-[16]">
// //                     <h1 className="font-semibold">
// //                       <button
// //                         className="hover:scale-105 transition-all duration-300"
// //                         onClick={() => setOption(i)}
// //                       >
// //                         {items.status === "Order placed" ? (
// //                           <div className="text-yellow-500">{items.status}</div>
// //                         ) : items.status === "Canceled" ? (
// //                           <div className="text-red-500">{items.status}</div>
// //                         ) : (
// //                           <div className="text-green-500">{items.status}</div>
// //                         )}
// //                       </button>
// //                       <div className={`${Option === i ? "flex" : "hidden"} flex mt-4`}>
// //                         <select name="status" id="" className="bg-gray-900" onChange={change} value={values.status}>
// //                           {[
// //                             "Order Placed",
// //                             "Out For deliery",
// //                             "Delivered",
// //                             "Canceled",
// //                           ].map((items, i) => (
// //                             <option value={items} key={i}>
// //                               {items}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <button className="text-green-500 hover:text-purple-600 mx-2">
// //                           <FaCheck />
// //                         </button>
// //                       </div>
// //                     </h1>
// //                   </div>
// //                   <div className="w-[10%] md:w-[5%]">
// //                     <button
// //                       className="text-xl hover:text-orange-500"
// //                       onClick={() => {
// //                         setOption(-1);
// //                         submitChanges(i);
// //                       }}
// //                     >
// //                       <IoOpenOutline />
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default AllOrders;