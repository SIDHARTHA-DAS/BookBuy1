import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {authActions} from "../../Store/auth"
import { useDispatch,useSelector } from "react-redux";

const SideBar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const role = useSelector((state) => state.auth.role)

  return (
    <div className="bg-gray-900 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%] md:w-44 lg:w-full">
      <div className=" flex items-center flex-col justify-center">
        <img src={data.avatar} alt="" className="h-[10vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 md:text-sm  text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
     {role === "user" &&  <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Order history
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>}
      {role === "admin" &&  <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-500 transition-all duration-300"
        >
         All Order 
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-500 rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div>}
      <button
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
        className="bg-gray-800 w-3/6 md:w-full text-sm  lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-gray-700 transition-all duration-300"
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default SideBar;
