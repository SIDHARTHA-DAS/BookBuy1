// 

import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  //  Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://book-buy-11up.vercel.app/api/v1/get-user-cart",
          { headers }
        );
        setCart(response.data.data);
      } catch (error) {
        console.log("Cart fetch error:", error);
      }
    };

    fetchCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  //  Delete Item
  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `https://book-buy-11up.vercel.app/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );

      toast(response.data.message);

      setCart((prev) => prev.filter((item) => item._id !== bookId));

      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  // 🟢 Calculate Total
  useEffect(() => {
    if (cart && cart.length > 0) {
      const t = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(t);
    }
  }, [cart]);

  // 🟢 Place Order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `https://book-buy-11up.vercel.app/api/v1/place-order`,
        { order: cart },
        { headers }
      );

      toast(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* LOADER */}
      {!cart && (
        <div className="flex items-center justify-center h-screen bg-slate-500">
          <Loader />
        </div>
      )}

      {/* EMPTY CART */}
      {cart && cart.length === 0 && (
        <div className="h-screen bg-gray-950 text-white text-center flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
          <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
        </div>
      )}

      {/* CART WITH ITEMS */}
      {cart && cart.length > 0 && (
        <div className="bg-gray-900 min-h-screen px-4 md:px-10 pb-10 text-white">
          <h1 className="text-4xl lg:text-5xl font-semibold text-zinc-400 mb-8 pt-6 text-center">
            Your Cart
          </h1>

          {cart.map((item) => (
            <div
              key={item._id}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-gray-800 justify-between items-center shadow-lg"
            >
              <img
                src={item.url}
                alt="book"
                className="h-[22vh] md:h-[12vh] object-cover rounded"
              />

              <div className="w-full md:w-auto md:mx-6 mt-3 md:mt-0 text-center md:text-left">
                <h1 className="text-2xl text-zinc-100 font-semibold">
                  {item.title}
                </h1>

                {/* Responsive Desc */}
                <p className="text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-zinc-300 mt-2 md:hidden">
                  {item.desc.slice(0, 50)}...
                </p>
              </div>

              <div className="flex mt-4 md:mt-0 items-center gap-6">
                <h2 className="text-zinc-100 text-xl font-semibold">
                  ₹ {item.price}
                </h2>

                <button
                  className="bg-red-200 text-red-700 border border-red-700 rounded p-2 hover:bg-red-300"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete size={22} />
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL SECTION */}
          <div className="mt-6 w-full flex items-center justify-end">
            <div className="p-5 bg-gray-800 rounded-lg shadow-lg w-full md:w-[350px]">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>

              <div className="mt-3 flex justify-between text-xl text-zinc-200">
                <span>{cart.length} books</span>
                <span>₹ {total}</span>
              </div>

              <button
                onClick={placeOrder}
                className="bg-zinc-100 text-black rounded mt-4 px-4 py-2 w-full font-semibold hover:bg-zinc-300 transition"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
