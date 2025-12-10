import Loader from "../components/Loader/Loader"
import BookCard from "../components/BookCard/BookCard"
import { useEffect, useState } from "react"
import axios from "axios"

const AllBooks = () => {

   const [data, setData] = useState()
  useEffect(() => {
   const fetch = async() =>{
   const response = await axios.get("https://book-buy-11up.vercel.app/api/v1/get-all-books")
   setData(response.data.data)
   }
   fetch()
  }, [])
  return (
    <div>
      <h4 className="bg-gray-900 text-white text-center pt-11  text-3xl font-semibold">All book</h4>
        {!data && (<div className="flex items-center justify-center h-screen bg-slate-500">
          <Loader/>
          </div>)}
      <div className="bg-gray-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {data && data.map((item,i)=>{
         return <BookCard key={i} data={item}/>
        })}
      </div>
      </div>
  )
}

export default AllBooks

      // <div className="">
      //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-900">
        
      {/* //   </div> */}
      // </div>