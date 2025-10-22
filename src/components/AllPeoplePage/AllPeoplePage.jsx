import "./AllPeoplePage.css";
import { lazy ,Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar=lazy(()=>import("../header/navBar/NavBar"))
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter=lazy(()=>import("../footer/mainFooter/MainFooter"))
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter=lazy(()=>import("../footer/mobileFooter/MobileFooter"))
// import NotFoundItem from "../NotFoundItem/NotFoundItem";
const NotFoundItem=lazy(()=>import("../NotFoundItem/NotFoundItem"))
import { CgSortAz } from "react-icons/cg";
import { useState, useReducer, useEffect } from "react";
// import PeopleBox from "../PeopleBox/PeopleBox";
const PeopleBox=lazy(()=>import("../PeopleBox/PeopleBox"))
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import Pagination from "../MultiPage/Pagination/Pagination";
const Pagination=lazy(()=>import("../MultiPage/Pagination/Pagination"))


function AllPeoplePage() {
  const param = useParams();
  const [pathName, setPathName] = useState(``);
  const location = useLocation();
  const navigate=useNavigate()
  const [genderFilter,setGenderFilter] = useState('all');
  const [searchValue, setSearchValue] = useState("");
  const [boxesData, setBoxesData] = useState([]);
  const [filterBoxesData, setFilterBoxesData] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);

  const addFilterHandler=(gender)=>{
    let filteredPeople=[]
    filteredPeople = [...boxesData].filter((people) =>
        people.name.toLowerCase().includes(searchValue.trim().toLowerCase()) &&
    (
        (gender || genderFilter)!='all'?
        people.gender==(gender || genderFilter)
        :true
    )
      );
      setFilterBoxesData(filteredPeople);
      navigate('/people/1')
  }
  const searchSubmitHand = (e) => {
    e.preventDefault();
    addFilterHandler()
  };
  const genderFilterHandler=(btn)=>{
    setGenderFilter(btn.id);
    addFilterHandler(btn.id)
  }

  const allPeopleFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/movieUsers?pageSize=100&loadRelations=movies`
    )
      .then((res) => res.json())
      .then((people) => {
        const sortedPeople=people.toSorted((a,b)=>b.movies.length-a.movies.length)
        setBoxesData(sortedPeople);
        setFilterBoxesData(sortedPeople);
      });
  };
  useEffect(() => {
    allPeopleFetch()
    setPathName("/people");
  }, []);
  return (
    <>
    <Suspense>
      <NavBar />
    </Suspense>
      <div className="all-people-page-container wide-screen">
        <div className="all-people-header">
          <h1 className="all-people-header-title">عوامل</h1>
          <div className="all-people-header-options">
            <div className="all-people-filter-container">
              <div className="all-people-filter-icon">
                <CgSortAz />
                <span>نمایش</span>
              </div>
              <div className="all-people-filter">
                {[{id:"all",value:"همه"}, {id:"men",value:"مرد"}, {id:"women",value:"زن"}].map((btn) => (
                  <div
                    key={btn.id}
                    className={`all-people-filter-item ${
                        genderFilter == btn.id ? "active" : ""
                    }`}
                    onClick={(e) => {
                        genderFilterHandler(btn)
                    }}
                  >
                    {btn.value}
                  </div>
                ))}
              </div>
            </div>
            <form
              className="all-people-search-container"
              onSubmit={searchSubmitHand}
            >
              <input
                value={searchValue}
                type="text"
                className="all-people-search-input"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <button className="all-people-search-btn">
                <FiSearch />
              </button>
            </form>
          </div>
        </div>
        {
            showBoxesData.length ?
            <div className="all-people-boxes-container">
            {
                showBoxesData.map((people)=>(
          <Link key={people.id} to={`/people/${people.urlName}/1`}>
                <Suspense>
            <PeopleBox {...people}/>
                </Suspense>
          </Link>

                ))
            }
        </div>
            :
                <Suspense>
                  <NotFoundItem />
                </Suspense>
        }
        
      </div>
          <Suspense>

      <Pagination
        boxesArr={filterBoxesData}
        showBoxesFunc={setShowBoxesData}
        pageNumber={param && param.page}
        boexesInPage={18}
        pathName={pathName}
        searchParams={location.search}
      />
          </Suspense>
          <Suspense>

      <MainFooter />
          </Suspense>
          <Suspense>
      <MobileFooter />
          </Suspense>
    </>
  );
}

export default AllPeoplePage;
