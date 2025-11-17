import axios from "axios";
import { useEffect, useState } from "react";
import {  useParams,useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";


const UpdateBook = () => {
 
   const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };


  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        toast(" All Fields are required", {
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
      } else {
        const response = await axios.put(
          "https://bookbuy.onrender.com/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
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
        navigate(`/view-book-details/${id}`)
      }
    } catch (error) {
      toast(error.response.data.message, {
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
    }
  };

   useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await axios.get(
            `https://bookbuy.onrender.com/api/v1/get-book-by-id/${id}`
          );
          setData(response.data.data);
        } catch (err) {
          console.error("Error fetching book:", err);
        }
      };
  
      fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="min-h-screen w-full flex justify-center md:justify-start lg:justify-center p-0 md:p-6 bg-gray-900">
      <ToastContainer
        className={`position='top-right'
                autoClose=${5000}
                hideProgressBar=${false}
                newestOnTop=${false}
                closeOnClick=${false}
                rtl=${false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
                transition=${Bounce}`}
      />

      <div className="w-full max-w-md md:max-w-lg lg:max-w-full">
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
          Update Book
        </h1>

        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
          {/* Image */}
          <div>
            <label className="text-zinc-400">Image</label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="url of image"
              name="url"
              required
              value={Data.url}
              onChange={change}
            />
          </div>

          {/* Title */}
          <div className="mt-4">
            <label className="text-zinc-400">Title of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="title of book"
              name="title"
              required
              value={Data.title}
              onChange={change}
            />
          </div>

          {/* Author */}
          <div className="mt-4">
            <label className="text-zinc-400">Author of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Author Name"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>

          {/* Language + Price */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="text-zinc-400">Language</label>
              <input
                type="text"
                className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
                placeholder="Language"
                name="language"
                required
                value={Data.language}
                onChange={change}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="text-zinc-400">Price</label>
              <input
                type="number"
                className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
                placeholder="Price"
                name="price"
                required
                value={Data.price}
                onChange={change}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="text-zinc-400">Description of book</label>
            <textarea
              className="w-full mt-2 bg-gray-900 text-zinc-100 p-2 outline-none rounded"
              rows="5"
              placeholder="Description"
              name="desc"
              required
              value={Data.desc}
              onChange={change}
            />
          </div>

          <button
            className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300 w-full md:w-auto"
            onClick={submit}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook
