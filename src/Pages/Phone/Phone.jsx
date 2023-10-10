import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import swal from "sweetalert";

const Phone = () => {
  const { id } = useParams();
  const phones = useLoaderData();
  const [phone, setPhone] = useState({});

  useEffect(() => {
    const findPhone = phones?.find((phone) => phone.id === id);
    setPhone(findPhone);
  }, [id, phones]);

  const {image, phone_name, brand_name} = phone

  const addToFavorites = ()=> {
    const addedFavoritesArray = []
    const favoritesItem = JSON.parse(localStorage.getItem('favorites'))
    if(!favoritesItem){
      addedFavoritesArray.push(phone)
      localStorage.setItem('favorites', JSON.stringify(addedFavoritesArray))
      swal("Good job!", "Added", "success")
    }else{
      const isExists = favoritesItem.find(phone => phone.id === id)
      if(!isExists){
        addedFavoritesArray.push(...favoritesItem, phone)
        localStorage.setItem('favorites', JSON.stringify(addedFavoritesArray))
        swal("Good job!", "Added", "success")
      }else{
        swal("Error!", "Already Added!", "error")
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="p-10 relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
          <img
            src={image}
            alt="image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
            {brand_name}
          </h6>
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {phone_name}
          </h4>
          <a className="inline-block" href="#">
            <button
              onClick={addToFavorites}
              className="bg-green-200 flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Add to Favorites
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
          </a>
        </div>
        <div className="absolute bottom-0 right-0 p-5">
        <Link to={'/'}>
            <button className="btn btn-success text-white px-6 font-bold">Back</button>
        </Link>
      </div>
      </div>  
    </div>
  );
};

export default Phone;
