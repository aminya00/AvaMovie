import { useLocation, useParams,Link } from "react-router-dom";
import "./WatchlistComp.css";
import { useEffect, useRef, useState, useContext } from "react";
import SelectOptCont from "../MultiPage/SelectOptCont/SelectOptCont";
import { authContext ,watchlistContext} from "../../contextApi";
import Pagination from "../MultiPage/Pagination/Pagination";
import WatchlistBox from "./WatchlistBox/WatchlistBox";
import NotFoundItem from "../NotFoundItem/NotFoundItem";

const WatchlistComp = () => {
  const AuthContext = useContext(authContext);
  const WatchlistContext = useContext(watchlistContext);
  const param = useParams();
  const pathName = useRef();
  const location = useLocation();
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [filterBoxesData, setFilterBoxesData] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);

  const watchlistMoviesFetch = async (objectId) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?pageSize=100&where=objectId%3D'${objectId}'&loadRelations=watchlist`
    )
      .then((res) => res.json())
      .then((userInfo) => {        
        setWatchlistMovies(userInfo[0].watchlist);
        setFilterBoxesData(userInfo[0].watchlist);
      });
  };
  useEffect(() => {    
    watchlistMoviesFetch(AuthContext.userInfos.objectId);
    pathName.current = `/panel/watchlist`;
  }, []);
  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <div className="watchlist-header-title">
          <h3>لیست تماشا</h3>
          <span>فیلم و سریال‌های ذخیره شده</span>
        </div>
        <SelectOptCont
          boxesData={watchlistMovies}
          param={param}
          pathName={pathName.current}
          filterBoxHandler={setFilterBoxesData}
          subject={"watchlist"}
          searchParams={location.search}
        />
      </div>
        {Boolean(showBoxesData.length) ? (
          <div className="watchlist-boxes-container wide-screen">
            {showBoxesData.map((data) => (
              <Link
                to={`/${data.isSeries ? "series" : "movies"}/${data.nameUrl}`}
                key={data.id}
              >
                <WatchlistBox {...data} setWatchlistMovies={setWatchlistMovies} setFilterBoxesData={setFilterBoxesData}/>
              </Link>
            ))}
          </div>
        ): <NotFoundItem />
    }
        <Pagination
          boxesArr={filterBoxesData}
          showBoxesFunc={setShowBoxesData}
          pageNumber={param && param.page}
          boexesInPage={10}
          pathName={pathName.current}
          searchParams={location.search}
        />
    </div>
  );
};

export default WatchlistComp;
