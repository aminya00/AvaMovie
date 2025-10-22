import "./MoviesRowBox.css";
import { useContext, useEffect, useState,lazy,Suspense } from "react";
// import GridBoxIcons from "../../SeriesRowContent/gridRowBox/GridBoxIcons/GridBoxIcons";
const GridBoxIcons = lazy(() => import("../../SeriesRowContent/gridRowBox/GridBoxIcons/GridBoxIcons"));
// import BoxesRating from "./BoxesRating/BoxesRating";
const BoxesRating = lazy(() => import("./BoxesRating/BoxesRating"));
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { authContext,watchlistContext } from "../../../../contextApi";
import { useNavigate } from "react-router-dom";
import { showSuccessToast,showLoginToast,showWarningToast } from "../../../../toast";

function MoviesRowBox({
  name,
  nameUrl,
  year,
  cover,
  avaRating,
  imdb,
  description,
  hasSub,
  hasDub,
  hasOnline,
  genres,
  objectId,
  isSeries,
}) {
  const AuthContext = useContext(authContext);
  const WatchlistContext = useContext(watchlistContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
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
            setIsInWatchlist(false)
            showWarningToast('از لیست تماشا حذف شد!')
            WatchlistContext.updateWatchlist()
        }
      return res.json();
    })
  };
  const addToWatchlist = async(e) => {
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

  useEffect(() => {
    WatchlistContext.watchlist &&
      setIsInWatchlist(
        WatchlistContext.watchlist.some((movie) => {
          return movie.nameUrl == nameUrl;
        })
      );
  }, [WatchlistContext]);

  return (
    <>
    <div className="movies-row-box">
      <div className="movies-row-box-img-cont">
        <img src={`${cover}`} alt="" />
        <div className="movies-row-box-shadow">
          <div className="movies-row-box-shadow-desc">{description}</div>
          <div className="movies-row-box-shadow-genres">
            {genres.join(" | ")}
          </div>
        </div>
        <Suspense>
          <GridBoxIcons {...{ hasSub, hasDub, hasOnline }} />
          </Suspense>
      </div>
      <div className="movies-row-box-info">
        <span className="movies-row-box-ps">{`(${year})`}</span>
        <span className="movies-row-box-name">{name}</span>
        <Suspense>
        <BoxesRating {...{ avaRating, imdb }} />
                  </Suspense>
        {isInWatchlist ? (
          <FaBookmark
            className="movies-row-box-bookmark-icon"
            onClick={(e) => AuthContext.isLoggedIn?removeFromWatchlist(e):doesntLogIn(e)}
          />
        ) : (
          <FaRegBookmark
            className="movies-row-box-bookmark-icon"
            onClick={(e) => AuthContext.isLoggedIn?addToWatchlist(e):doesntLogIn(e)}
          />
        )}
      </div>
    </div>
    </>
  );
}
export default MoviesRowBox;
