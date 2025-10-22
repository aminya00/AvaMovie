import "./SelectOptCont.css";
import SelectOpt from "../SelectOpt/SelectOpt";
import { useReducer, useEffect, useRef, memo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { EnToFaNums } from "../../../ulits";

const selecValueHand = (state, action) => {

  // switch (action.type) {
  //   case "sort":
         // 
  //   case "kind":
         // 
  //   case "imdbRating":
         // 
  //   case "genres":
         // 
  //   case "category":
         // 
  //   case "showDay":
  //     // action.func({[action.type]: { value: action.value }})
  // }
  return { ...state, [action.type]: { value: action.value } };
};

const SelectOptCont = memo(
  ({ boxesData, param, pathName, filterBoxHandler, subject, searchParams }) => {
    const navigate = useNavigate();
    const flagRef = useRef(false);
    const [selecValue, dispatch] = useReducer(selecValueHand, {
      sort: { value: "" },
      kind: { value: "" },
      imdbRating: { value: "" },
      genres: { value: "" },
      category: { value: "همه" },
      showDay: { value: "" },
    });
    const [searchParam, setSearchParam] = useSearchParams();

    const sortHandler = (value, tempArr) => {

      switch (value) {
        case "newest":
          return [...tempArr.toSorted((a, b) => b.year - a.year)];
        case "oldest":
          return [...tempArr.toSorted((a, b) => a.year - b.year)];
        case "popularity":
          return [...tempArr.toSorted((a, b) => b.avaRating - a.avaRating)];
        case "imdb-rating":
          return [...tempArr.toSorted((a, b) => b.imdb - a.imdb)];
        default:
          return [...tempArr];
      }
    };
    const imdbFilter = (value, tempArr) => {
      return tempArr.filter((box) => box.imdb > +value.trim());
    };
    const genresFilter = (value, tempArr) => {

      return value
        ? tempArr.filter((box) => {
            return box.genres.includes(value.trim());
          })
        : tempArr;
    };
    const kindFilter = (value, tempArr) => {

      return value
        ? tempArr.filter((box) => {
            return box.kind == value.trim();
          })
        : tempArr;
    };
    const categoryFilter = (value, tempArr) => {

      return tempArr.filter((box) => {
        return value == "سریال"
          ? box.isSeries
          : value == "فیلم"
          ? !box.isSeries
          : true;
      });
    };
    const showDayFilter = (value, tempArr) => {
      return value
        ? tempArr.filter((box) => {
            return box.showDay == value.trim();
          })
        : tempArr;
    };

    useEffect(() => {
      let searchParamsArr = {};
      if (flagRef.current) {
        for (const select in selecValue) {
          if (selecValue[select].value) {
            searchParamsArr[select] = selecValue[select].value;
            
          }


        }
        setSearchParam(searchParamsArr);
      }
      flagRef.current = true;
    }, [selecValue]);

    useEffect(() => {
      if (flagRef.current) {
        searchParam.get("sort") &&
          dispatch({ type: "sort", value: searchParam.get("sort") });
        searchParam.get("kind") &&
          dispatch({ type: "kind", value: searchParam.get("kind") });
        searchParam.get("imdbRating") &&
          dispatch({
            type: "imdbRating",
            value: searchParam.get("imdbRating"),
          });
        searchParam.get("genres") &&
          dispatch({ type: "genres", value: searchParam.get("genres") });
        searchParam.get("category") &&
          dispatch({ type: "category", value: searchParam.get("category") });
        searchParam.get("showDay") &&
          dispatch({ type: "showDay", value: searchParam.get("showDay") });
      }
      flagRef.current = true;
    }, []);

    useEffect(() => {
      let tempFilterArr = [...boxesData];

      searchParam.get("sort") &&
        (tempFilterArr = sortHandler(searchParam.get("sort"), tempFilterArr));
      searchParam.get("kind") &&
        (tempFilterArr = kindFilter(searchParam.get("kind"), tempFilterArr));
      searchParam.get("imdbRating") &&
        (tempFilterArr = imdbFilter(
          searchParam.get("imdbRating"),
          tempFilterArr
        ));
      searchParam.get("genres") &&
        (tempFilterArr = genresFilter(
          searchParam.get("genres"),
          tempFilterArr
        ));
      searchParam.get("category") &&
        (tempFilterArr = categoryFilter(
          searchParam.get("category"),
          tempFilterArr
        ));
      searchParam.get("showDay") &&
        (tempFilterArr = showDayFilter(
          searchParam.get("showDay"),
          tempFilterArr
        ));
      
      filterBoxHandler(tempFilterArr);
      pathName && navigate(`${pathName}/1/${searchParams}`);
  
    }, [searchParams]);

    return (
      <div className="multi-box-header-left">
        {(subject == "genres" ||
          subject == "suggested" ||
          subject == "people" ||
          subject == "country" ||
          subject == "language" ||
          subject == "age" ||
          subject == "watchlist" ||
          subject == "streamer" ) && (
          <div className="movie-series-filter-container">
            {["همه", "فیلم", "سریال"].map((btn) => (
              <div
                key={btn}
                className={`movie-series-filter ${
                  selecValue.category.value == btn ? "active" : ""
                }`}
                onClick={(e) => {
                  dispatch({
                    type: "category",
                    value: btn,
                  });
                }}
              >
                {btn}
              </div>
            ))}
          </div>
        )}
        {subject == "series-current" && (
          <SelectOpt
            dispatch={dispatch}
            searchParamsHandler={setSearchParam}
            selecValue={selecValue}
            optionName={"showDay"}
            optionArr={[
              { name: "روز پخش", value: "" },
              { name: "شنبه", value: "شنبه" },
              { name: "یکشنبه", value: "یکشنبه" },
              { name: "دوشنبه", value: "دوشنبه" },
              { name: "سه‌شنبه", value: "سه‌شنبه" },
              { name: "چهارشنبه", value: "چهارشنبه" },
              { name: "پنج‌شنبه", value: "پنج‌شنبه" },
              { name: "جمعه", value: "جمعه" },
            ]}
          />
        )}
        {(subject == "series" ||
          subject == "movies" ||
          subject == "suggested" ||
          subject == "movie-dub" ||
          subject == "korean-series" ||
          subject == "series-dub" ||
          subject == "country" ||
          subject == "language" ||
          subject == "age" ||
          subject == "streamer") && (
          <SelectOpt
            dispatch={dispatch}
            searchParamsHandler={setSearchParam}
            selecValue={selecValue}
            optionName={"genres"}
            optionArr={[
              { name: "انتخاب ژانر", value: "" },
              { name: "اکشن", value: "اکشن" },
              { name: "درام", value: "درام" },
              { name: "جنایی", value: "جنایی" },
              { name: "رازآلود", value: "رازآلود" },
              { name: "جنگی", value: "جنگی" },
              { name: "کمدی", value: "کمدی" },
              { name: "ماجراجویی", value: "ماجراجویی" },
              { name: "علمی‌و‌تخیلی", value: "علمی‌و‌تخیلی" },
              { name: "تاریخی", value: "تاریخی" },
              { name: "ترسناک", value: "ترسناک" },
              { name: "معمایی", value: "معمایی" },
              { name: "فانتزی", value: "فانتزی" },
              { name: "هیجان انگیز", value: "هیجان انگیز" },
              { name: "بیوگرافی", value: "بیوگرافی" },
              { name: "عاشقانه", value: "عاشقانه" },
              { name: "انیمیشن", value: "انیمیشن" },
              { name: "موزیک", value: "موزیک" },
              { name: "مستند", value: "مستند" },
              { name: "وسترن", value: "وسترن" },
              { name: "خانوادگی", value: "خانوادگی" },
            ]}
          />
        )}
        {(subject == "series" ||
          subject == "movies" ||
          subject == "genres" ||
          subject == "suggested" ||
          subject == "movie-dub" ||
          subject == "korean-series" ||
          subject == "series-dub" ||
          subject == "people" ||
          subject == "country" ||
          subject == "language" ||
          subject == "age" ||
          subject == "streamer") && (
          <SelectOpt
            dispatch={dispatch}
            searchParamsHandler={setSearchParam}
            selecValue={selecValue}
            optionName={"imdbRating"}
            optionArr={[
              { name: "امتیاز IMDB", value: "" },
              { name: `بالای ${EnToFaNums(9)}`, value: "9" },
              { name: `بالای ${EnToFaNums(8)}`, value: "8" },
              { name: `بالای ${EnToFaNums(7)}`, value: "7" },
              { name: `بالای ${EnToFaNums(6)}`, value: "6" },
              { name: `بالای ${EnToFaNums(5)}`, value: "5" },
            ]}
          />
        )}
        {subject == "series" && (
          <SelectOpt
            dispatch={dispatch}
            searchParamsHandler={setSearchParam}
            selecValue={selecValue}
            optionName={"kind"}
            optionArr={[
              { name: "نوع", value: "" },
              { name: "انیمه", value: "anime" },
              { name: "آسیای شرقی", value: "east-asian" },
              { name: "خارجی", value: "foreign" },
            ]}
          />
        )}
        {(subject == "series" ||
          subject == "movies" ||
          subject == "collection" ||
          subject == "genres" ||
          subject == "suggested" ||
          subject == "movie-dub" ||
          subject == "korean-series" ||
          subject == "series-end" ||
          subject == "series-current" ||
          subject == "series-cancelled" ||
          subject == "series-renewed" ||
          subject == "series-dub" ||
          subject == "country" ||
          subject == "language" ||
          subject == "age" ||
          subject == "streamer") && (
          <SelectOpt
            dispatch={dispatch}
            searchParamsHandler={setSearchParam}
            selecValue={selecValue}
            optionName={"sort"}
            optionArr={[
              { name: "مرتب‌سازی بر اساس", value: "" },
              { name: "جدیدترین", value: "newest" },
              { name: "قدیمی‌ترین", value: "oldest" },
              { name: "محبوب‌ترین", value: "popularity" },
              { name: "امتیاز IMDB", value: "imdb-rating" },
            ]}
          />
        )}
      </div>
    );
  }
);

export default SelectOptCont;
