import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://book-buy-11up.vercel.app/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const naigate = useNavigate();

  // add to fav ////
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handelfavourit = async () => {
    const response = await axios.put(
      "https://book-buy-11up.vercel.app/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    toast(response.data.message);
  };

  //  add to cart///
  const handelCart = async () => {
    const response = await axios.put(
      "https://book-buy-11up.vercel.app/api/v1/add-to-cart",
      {},
      { headers }
    );
    toast(response.data.message);
  };

  const deletebook = async () => {
    const response = await axios.delete(
      "https://book-buy-11up.vercel.app/api/v1/delete-book",
      { headers }
    );
    toast(response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    naigate("/all-books");
  };

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-500">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <ToastContainer />

        {/* LEFT SECTION: IMAGE + BUTTONS */}
        <div className="bg-gray-800 w-full lg:w-1/2 rounded-xl p-6 flex flex-col items-center">
          {/* Book Image */}
          <img
            src={data.url}
            alt="book"
            className="h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] object-contain"
          />

          {/* Buttons — MOBILE/TABLET */}
          {isLoggedIn === true && role === "user" && (
            <div className="lg:hidden w-full flex justify-center mt-8">
              <div className="flex flex-row gap-8 w-full max-w-[280px] justify-between">
                <button
                  className="bg-white w-20 h-10 rounded-full flex items-center justify-center text-2xl text-red-500 shadow-lg active:scale-95 transition"
                  onClick={handelfavourit}
                >
                  <FaHeart />
                </button>

                <button
                  className="bg-white w-20 h-10 rounded-full flex items-center justify-center text-2xl text-blue-500 shadow-lg active:scale-95 transition"
                  onClick={handelCart}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          )}

          {/* Buttons — DESKTOP RIGHT SIDE */}
          {isLoggedIn === true && role === "user" && (
            <div className="hidden lg:flex flex-row gap-10 mt-10">
              <button
                className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl text-red-500 shadow-xl hover:scale-110 transition"
                onClick={handelfavourit}
              >
                <FaHeart />
              </button>

              <button
                className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl text-blue-500 shadow-xl hover:scale-110 transition"
                onClick={handelCart}
              >
                <FaShoppingCart />
              </button>
            </div>
          )}

          {/* Buttons — MOBILE/TABLET for admin */}
          {isLoggedIn === true && role === "admin" && (
            <div className="lg:hidden w-full flex justify-center mt-8">
              <div className="flex flex-row gap-8 w-full max-w-[280px] justify-between">
                <Link
                  to={`/updateBook/${id}`}
                  className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition"
                >
                  <FaEdit />
                </Link>

                <button
                  className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl text-red-500 shadow-xl hover:scale-110 transition"
                  onClick={deletebook}
                >
                  <MdOutlineAutoDelete />
                </button>
              </div>
            </div>
          )}

          {/* for admin login desktop view */}
          {isLoggedIn === true && role === "admin" && (
            <div className="hidden lg:flex flex-row gap-10 mt-10">
              <Link
                to={`/updateBook/${id}`}
                className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition"
              >
                <FaEdit />
              </Link>

              <button
                className="bg-white rounded-full w-20 h-10 flex items-center justify-center text-2xl text-red-500 shadow-xl hover:scale-110 transition"
                onClick={deletebook}
              >
                <MdOutlineAutoDelete />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SECTION: TEXT DETAILS  */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left px-2">
          <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold">
            {data.title}
          </h1>

          <p className="text-zinc-400 mt-2 text-lg">by {data.author}</p>

          <p className="text-zinc-500 mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
            {data.desc}
          </p>

          <p className="flex items-center justify-center lg:justify-start text-zinc-400 mt-6 text-lg">
            <GrLanguage className="mr-3 text-xl" /> {data.language}
          </p>

          <p className="mt-6 text-zinc-100 text-3xl font-semibold">
            Price: ₹ {data.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
