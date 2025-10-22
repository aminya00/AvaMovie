import "./PeoplePage.css";
import NavBar from "../header/navBar/NavBar";
import MainFooter from "../footer/mainFooter/MainFooter";
import MobileFooter from "../footer/mobileFooter/MobileFooter";
import MoviesRowBox from "../mainContent/moviesRowContent/MoviesRowBox/MoviesRowBox";
import Pagination from "../MultiPage/Pagination/Pagination";
import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SelectOptCont from "../MultiPage/SelectOptCont/SelectOptCont";
import { EnToFaNums } from "../../ulits";
import NotFoundItem from "../NotFoundItem/NotFoundItem";

function PeoplePage() {
  const param = useParams();
  const pathName = useRef();
  const location = useLocation();
  const [peopleDetail, setPeopleDetail] = useState([]);
  const [filterBoxesData, setFilterBoxesData] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);

  const peopleFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/movieUsers?pageSize=100&where=urlName%3D'${param.peopleName}'&loadRelations=movies`
    )
      .then((res) => res.json())
      .then((people) => {
        setPeopleDetail(people);
        setFilterBoxesData(people[0].movies);
      });
  };

  useEffect(() => {
    peopleFetch();
    pathName.current = `/people/${param.peopleName}`;
  }, []);
  return (
    <>
      {peopleDetail.length && (
        <>
          <NavBar />
          <div className="people-page-container wide-screen">
            <div className="people-page-right">
              <div className="people-img-container">
                <img src={peopleDetail[0].imgUrl} alt="" />
              </div>
              <div className="people-name">{peopleDetail[0].name}</div>
              <Link to={peopleDetail[0].imdbLink}>
                <div className="people-imdb-link-btn">مشاهده از IMDB</div>
              </Link>
            </div>
            <div className="people-page-left">
              <div className="people-boxes-header">
                <div className="people-box-header-right">
                  <h1 className="people-box-header-title">تعداد آثار</h1>
                  <div className="people-box-header-desc">
                    {EnToFaNums(peopleDetail[0].movies.length)} آثار
                  </div>
                </div>
                <SelectOptCont
                  boxesData={peopleDetail[0].movies}
                  param={param}
                  pathName={pathName.current}
                  filterBoxHandler={setFilterBoxesData}
                  subject={"people"}
                  searchParams={location.search}
                />
              </div>
                {showBoxesData.length ?
              <div className="people-boxes-container">
                {
                  showBoxesData.map((data) => (
                    <Link
                      to={`/${data.isSeries ? "series" : "movies"}/${
                        data.nameUrl
                      }`}
                      key={data.id}
                    >
                      <MoviesRowBox {...data} />
                    </Link>
                  ))
                }
              </div>
                :<NotFoundItem />
              }
              {
                <Pagination
                  boxesArr={filterBoxesData}
                  showBoxesFunc={setShowBoxesData}
                  pageNumber={param && param.page}
                  boexesInPage={10}
                  pathName={pathName.current}
                  searchParams={location.search}
                />
              }
            </div>
          </div>
          <MainFooter />
          <MobileFooter />
        </>
      )}
    </>
  );
}

export default PeoplePage;
