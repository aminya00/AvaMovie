import './WatchlistBox.css'
import GridBoxIcons from '../../mainContent/SeriesRowContent/gridRowBox/GridBoxIcons/GridBoxIcons';
import BoxesRating from '../../mainContent/moviesRowContent/MoviesRowBox/BoxesRating/BoxesRating';
import { TbTrash } from "react-icons/tb";
import { authContext ,watchlistContext} from '../../../contextApi';
import { useContext } from 'react';
import { showWarningToast } from '../../../toast';

function WatchlistBox({name,year,cover,avaRating,imdb,hasSub,hasDub,hasOnline,objectId,setWatchlistMovies,setFilterBoxesData}){

      const AuthContext = useContext(authContext);
      const WatchlistContext = useContext(watchlistContext);


     const removeFromWatchlist = async (e) => {
        e.preventDefault();
        await fetch(
          `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers/${AuthContext.userInfos.objectId}/watchlist`,
          {
            method: "DELETE",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify([
                AuthContext.userInfos.objectId,
                objectId
            ]),
          }
        ).then((res) => {
            console.log(res);
            if(res.ok){
                showWarningToast('از لیست تماشا حذف شد!')

                WatchlistContext.updateWatchlist().then(res=>{
                    setWatchlistMovies(res)
                    setFilterBoxesData(res)
                }
                )
            }
          return res.json();
        })
      };
    
    return(
        <div className='watchlist-box'>
         <div className='watchlist-box-img-cont'>
            <img src={`${cover}`} alt="" />
            <GridBoxIcons {...{hasSub,hasDub,hasOnline}}/>
         </div>
         <div className='watchlist-box-info'>
            <span className='watchlist-box-ps'>{`(${year})`}</span>
            <span className='watchlist-box-name'>{name}</span>
            <BoxesRating {...{avaRating,imdb}}/>
            <TbTrash className="watchlist-box-bookmark-icon" onClick={(e)=>removeFromWatchlist(e)}/>
         </div>
        </div>
       
    )
}
export default WatchlistBox