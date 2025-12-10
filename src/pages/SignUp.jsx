import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
 
  const [values, setvalues] = useState({
    username:"",
    email:"",
    password:"",
    address:""
  })

 

  // Handle input properly

  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setvalues({...values,[name]:value})
  }
 
  // navigate 
  const navigation =  useNavigate()
  

  // Handle submit

  const submit = async (e) =>{
    e.preventDefault();
  
    if (!values.username || !values.email || !values.password || !values.address) {
      toast("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("https://book-buy-11up.vercel.app/api/v1/sign-up", values);
      console.log(response.data);

      if (response.data.message === "SignUp SuccessFully") {
        toast("Signup Successful!");
        navigation("/LogIn"); // navigate to login page
      } else {
        alert(response.data.message || "Signup failed!");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  }


  return (
    <section className="bg-gray-900 py-12 min-h-screen flex items-center">
      <ToastContainer />
      <div className="container mx-auto px-4 lg:px-16">
        <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Create Your Account
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Join us & get exclusive offers and updates!
          </p>


          <form>
            {/* USERNAME */}
            <div className="mb-4">
              <label className="text-white font-semibold mb-2 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className={`w-full px-4 py-2 rounded-lg border  bg-gray-700 text-white focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-white font-semibold mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border  bg-gray-700 text-white focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-white font-semibold mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                placeholder="Enter password"
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border  bg-gray-700 text-white focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* ADDRESS */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-2 block">Address</label>
              <textarea
                name="address"
                value={values.address}
                placeholder="Write something..."
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-4 py-2 rounded-lg border  bg-gray-700 text-white focus:ring-2 focus:ring-blue-500`}
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button onClick={submit}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-[1px] bg-gray-500"></div>
            <p className="text-gray-400">OR</p>
            <div className="flex-grow h-[1px] bg-gray-500"></div>
          </div>

          <Link
            to="https://myaccount.google.com/"
            className="w-full bg-white text-gray-800 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"
          >
            Sign Up with Google
          </Link>

          <p className="text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <Link to={'/LogIn'} className="text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
