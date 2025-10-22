import "./ListsPage.css";
import { useEffect, useState,lazy,Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));
// import MoviesListRowBox from "../singlePage/MoviesListRow/MoviesListRowBox/MoviesListRowBox";
const MoviesListRowBox = lazy(() => import("../singlePage/MoviesListRow/MoviesListRowBox/MoviesListRowBox"));
// import CollectionBox from "../CollectionBox/CollectionBox";
const CollectionBox = lazy(() => import("../CollectionBox/CollectionBox"));
// import Pagination from "../MultiPage/Pagination/Pagination";
const Pagination = lazy(() => import("../MultiPage/Pagination/Pagination"));
// import NotFoundItem from "../NotFoundItem/NotFoundItem";
const NotFoundItem = lazy(() => import("../NotFoundItem/NotFoundItem"));
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function ListsPage({ subject }) {
  const param = useParams();
  const [pathName, setPathName] = useState(``);
  const location = useLocation();
  const navigate=useNavigate()
  const [searchValue, setSearchValue] = useState("");
  const [boxesData, setBoxesData] = useState([]);
  const [filterBoxesData, setFilterBoxesData] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);

  const listsFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Lists?pageSize=100&loadRelations=movies%2Cowner`
    )
      .then((res) => res.json())
      .then((lists) => {
        setBoxesData(lists);
        setFilterBoxesData(lists);
      });
  };
  const collectionFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Collections?pageSize=100&loadRelations=movies`
    )
      .then((res) => res.json())
      .then((collections) => {
        setBoxesData(collections);
        setFilterBoxesData(collections);
      });
  };
  const searchSubmitHand = (e) => {
    e.preventDefault();
    let filteredCollection = [...boxesData].filter((collection) =>
      collection.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    setFilterBoxesData(filteredCollection);
    subject=='list'?
    navigate('/list/1')
    :subject=='collection'?
    navigate('/collection/1')
    :null
  };
  useEffect(() => {
    if (subject == "list") {
      listsFetch();
      setPathName("/list");
    } else if (subject == "collection") {
      collectionFetch();
      setPathName("/collection");
    }
  }, []);

  return (
    <><Suspense>
      <NavBar />
    </Suspense>
      <div className="lists-page-container wide-screen">
        <div className="lists-page-header ">
          <h1 className="lists-page-title">
            {subject == "list"
              ? "لیست کاربران"
              : subject == "collection"
              ? "کالکش فیلم ها"
              : ""}
          </h1>
          <form
            className="lists-page-search-container"
            onSubmit={searchSubmitHand}
          >
            <input
              value={searchValue}
              type="text"
              className="lists-page-search-input"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button className="lists-page-search-btn">
              <FiSearch />
            </button>
          </form>
        </div>
        { showBoxesData.length ?
        subject == "list" ? (
          <div className="lists-boxes-container">
            {showBoxesData.map((listBox) => (
              <Link to={`/list/${listBox.urlName}/1`} key={listBox.id}><Suspense>
                <MoviesListRowBox  {...listBox} /></Suspense>
              </Link>
            ))}
          </div>
        ) : subject == "collection" ? (
          <div className="collection-boxes-container">
            {showBoxesData.map((collectionBox) => (
              <Link to={`/collection/${collectionBox.urlName}/1`} key={collectionBox.id}>
               <Suspense> <CollectionBox {...collectionBox}  /></Suspense>
              </Link>
            ))}
          </div>
        ) : null
        :<Suspense><NotFoundItem /></Suspense>
      }
      </div><Suspense>
      <Pagination
        boxesArr={filterBoxesData}
        showBoxesFunc={setShowBoxesData}
        pageNumber={param && param.page}
        boexesInPage={10}
        pathName={pathName}
        searchParams={location.search}
      /></Suspense><Suspense>
      <MainFooter /></Suspense><Suspense>
      <MobileFooter /></Suspense>
    </>
  );
}

export default ListsPage;
