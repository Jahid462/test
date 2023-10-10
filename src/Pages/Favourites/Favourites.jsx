import { useEffect, useState } from "react";
import FavoritesCard from "../../components/FavoritesCard/FavoritesCard";

const Favourites = () => {
    const [favorites, setFavorites] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(()=>{
        const favoritesItem = JSON.parse(localStorage.getItem('favorites'))
        const total = favoritesItem.reduce((preValue, currentValue) => preValue + currentValue.price, 0)
        setTotalPrice(total)
        if(favoritesItem){
            setFavorites(favoritesItem)
        }else{
            setNotFound("No Data Found")
        }
    },[])


    const handleRemove = ()=> {
        localStorage.clear()
        setFavorites([])
        setNotFound("No Data Found")
    }

    return (
        <div>
            <div className="text-center pt-10">
            {
                favorites.length > 0 && <button onClick={handleRemove} className="bg-red-400 py-2 px-5 text-white">Delete All</button>
            }
            </div>
            <div className="text-center pt-6">
                <h1 className="text-2xl">Total Price: {totalPrice}</h1>
            </div>
            
            {
                notFound ? <p className="text-4xl font-semibold text-center h-[70vh] flex justify-center items-center">{notFound}</p>
                :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
                    {
                        isShow ?
                        favorites.map(phone => <FavoritesCard key={phone.id} phone={phone}></FavoritesCard>)
                        :
                        favorites.slice(0, 2).map(phone => <FavoritesCard key={phone.id} phone={phone}></FavoritesCard>)
                    }
                </div>
            }

            <div className="text-center py-10">
            {
                favorites.length > 2 && <button onClick={()=>setIsShow(!isShow)} className="bg-red-400 py-2 px-5 text-white">{isShow?"Show Less":"Show All"}</button>
            }
            </div>
        </div>
    );
};

export default Favourites;