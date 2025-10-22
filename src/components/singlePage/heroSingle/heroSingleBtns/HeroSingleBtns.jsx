import "./HeroSingleBtns.css";
import { LuSquarePlay } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { FiPlayCircle } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { authContext,watchlistContext } from "../../../../contextApi";
import { showWarningToast,showLoginToast,showSuccessToast } from "../../../../toast";

function HeroSingleBtns({ hasOnline, isSeries,nameUrl,objectId }) {
  const AuthContext = useContext(authContext);
  const WatchlistContext = useContext(watchlistContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const movieParam=useParams()

  const removeFromWatchlist = async(e) => {
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
            setIsInWatchlist(false)
            showWarningToast('از لیست تماشا حذف شد!')
            WatchlistContext.updateWatchlist()
        }
      return res.json();
    })
  };
  const addToWatchlist =async (e) => {
    e.preventDefault();

   await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers/deep-save`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objectId: AuthContext.userInfos.objectId,
          watchlist: [
            {
              objectId
            },
          ],
        }),
      }
    )
      .then((res) => {
        console.log(res);
        if(res.ok){
            setIsInWatchlist(true)
            showSuccessToast('به لیست تماشا اضافه شد!')
            WatchlistContext.updateWatchlist()
        }
        return res.json();
      })
      
  };
  const doesntLogIn=(e)=>{
    e.preventDefault()
    showLoginToast("برای ثبت لازم است عضو باشید!")
  }

  useEffect(()=>{

    WatchlistContext.watchlist &&
      setIsInWatchlist(
        WatchlistContext.watchlist.some((movie) => {
          return movie.nameUrl == nameUrl;
        })
      );
    
  },[movieParam.moviesName])

  return (
    <div className="hero-single-btns">
      {hasOnline && (
        <Link className="hero-online-btn">
          <LuSquarePlay style={{ fontSize: 21 }} />
          <span>تماشای آنلاین</span>
        </Link>
      )}
      <div className="hero-left-btn-cont">
        {isSeries && (
          <Link className="hero-last-episode-btns">
            <FiPlayCircle style={{ fontSize: 21 }} />
            <span>تماشای آخرین قسمت</span>
          </Link>
        )}
        <div className="hero-collection-btn">

          {isInWatchlist ? (
            <FaBookmark
              style={{ color: "var(--main-gray-color)", fontSize: 21 }}
              onClick={(e) =>
                AuthContext.isLoggedIn ? removeFromWatchlist(e) : doesntLogIn(e)
              }
            />
          ) : (
            <FaRegBookmark
              style={{ color: "var(--main-gray-color)", fontSize: 21 }}
              onClick={(e) =>
                AuthContext.isLoggedIn ? addToWatchlist(e) : doesntLogIn(e)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSingleBtns;
