import axios from "axios";
import  { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
// import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";

export default function LogIn() {
   const [values, setvalues] = useState({
    username:"",
    password:"",
  })

 

  // Handle input properly

  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setvalues({...values,[name]:value})
  }
 
  // navigate 
  const navigation =  useNavigate()
  const dispatch =  useDispatch()

  // Handle submit

  const submit = async (e) =>{
    e.preventDefault();
  
    if (!values.username || !values.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("https://bookbuy.onrender.com/api/v1/sign-in", values);
      console.log(response.data);

      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)
      navigation("/profile")

      // if (response.data.message === "SignUp SuccessFully") {
      //   alert("Signup Successful!");
        
      // } else {
      //   alert(response.data.message || "Signup failed!");
      // }
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 transition-all">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {/* {isSignUp ? "Sign Up" : "Log In"} */}
          </h2>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                required
                placeholder="Enter your username "
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
            onClick={submit}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex justify-center"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="border-t border-gray-300 dark:border-gray-600 flex-grow mr-3"></div>
            <span className="text-gray-500 dark:text-gray-400">OR</span>
            <div className="border-t border-gray-300 dark:border-gray-600 flex-grow ml-3"></div>
          </div>

          <div className="flex justify-around">
            <button className="bg-red-500 text-white p-3 rounded-full">
              <FaGoogle />
            </button>
            <button className="bg-blue-600 text-white p-3 rounded-full">
              <FaFacebookF />
            </button>
          </div>

          {/* <div className="text-center mt-6">
            <p className="text-gray-700 dark:text-gray-300">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link to="/SignUp"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-500 hover:underline"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}
