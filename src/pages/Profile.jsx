import { Outlet } from "react-router-dom"
import SideBar from "../components/Profile/SideBar"
import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
import axios from "axios"
import Loader from "../components/Loader/Loader"
import MobileNav from "../components/Profile/MobileNav"


const Profile = () => {
//  const isLoggedIn = useSelector()
const [Profile, setProfile] = useState()
 const headers = {
  id: localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem('token')}`
 }
  useEffect(() => {

    const fetch = async () =>{
     const respons = await axios.get("https://bookbuy.onrender.com/api/v1/get-user-information",{headers})
     setProfile(respons.data)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className=" bg-gray-950 text-white  px-2 md:px-12 flex flex-col  md:flex-row  py-8 gap-4">
      {!Profile && <div className="w-full h-screen flex items-center justify-center">
        <Loader/>
        </div>}
      {Profile && (
        <>
      <div className="w-full md:w-1/6 h-auto  lg:h-screen"><SideBar data={Profile}/></div>
      <MobileNav/>
      <div className="w-5/6"><Outlet/></div>
      </>
      )}
    </div>
  )
}

export default Profile
