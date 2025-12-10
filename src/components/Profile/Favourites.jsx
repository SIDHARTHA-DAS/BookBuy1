import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [Favourite, setFavourite] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-buy-11up.vercel.app/api/v1/get-favourite-books",
        { headers }
      );
      // console.log(response.data);
      setFavourite(response.data.data);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Favourite]);

  return (
    <>
      {Favourite && Favourite.length  === 0 && (
        <div className="text-5xl font-semibold text-zinc-400 flex items-center justify-center h-[100%]">No Favourite book</div>
      )}
    <div className=" ml-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
      {Favourite &&
        Favourite.map((items, i) => {
          return (
            <div key={i}>
              {" "}
              <BookCard data={items} Favourite={true} />
            </div>
          );
        })}
    </div>
    </>
  );
};

export default Favourites;
