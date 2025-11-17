import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userdivData, userdiv, setuserDiv }) => {
  return (
    <>
      <div
        className={`${userdiv} top-0 left-0 h-screen w-full bg-gray-900 opacity-80`}
      ></div>
      <div
        className={`${userdiv} top-0 left-0 h-screen w-full flex items-center justify-center`}
      >
        <div className="bg-black text-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Username:{""}
              <span className="font-semibold">{userdivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Email : <span className="font-semibold">{userdivData.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              address : <span className="font-semibold">{userdivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
