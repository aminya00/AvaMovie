import "./App.css";
import Routes from "./Routes";
import { useRoutes } from "react-router-dom";
import { authContext ,moviesCountContext,watchlistContext} from "./contextApi";
import { useState,useEffect,useCallback, useRef } from "react";
import { ToastContainer } from "react-toastify";


function App() {
  const routes = useRoutes(Routes);
  const isRender=useRef(false)
  
    const [seriesCount,setSeriesCount]=useState(0)
    const [moviesCount,setMoviesCount]=useState(0)
    const [watchlist,setWatchlist]=useState([])

  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [userInfos,setUserInfos]=useState({})

  const login=useCallback((userInfo)=>{
    setIsLoggedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem("user",JSON.stringify(userInfo.userName))
  },[])
  const logout=useCallback(()=>{
    setIsLoggedIn(false)
    localStorage.removeItem("user")
    setUserInfos([])
    setWatchlist([])
  },[])

  useEffect(()=>{
    let localStorageData=JSON.parse(localStorage.getItem("user"))
    localStorageData ?
    fetch(`https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?where=userName%3D'${localStorageData}'&loadRelations=licenseType%2Cwatchlist`)
    .then(res=>res.json())
    .then(data=>{
      setIsLoggedIn(true)
      setUserInfos(data[0])
      updateLastSeen(data[0].objectId)
      isRender.current=true
    })
    : 
    isRender.current=true
  },[login])

    const seriesFetch = async () => {
      await fetch(
        `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dtrue`
      )
        .then((res) => res.json())
        .then((series) => {
          setSeriesCount(series.length)
        });
    };
    const moviesFetch = async () => {
      await fetch(
        `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dfalse`
      )
        .then((res) => res.json())
        .then((movies) => {
          setMoviesCount(movies.length);
        });
    };
    const updateLastSeen=async(objectId)=>{
      await fetch(`https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/avaUsers/${objectId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          lastSeen:(new Date()).getTime()
        })
      })
      .then(res=>console.log(res))
    }
    const updateWatchlist = async () => {
      let tempWatchlist=null
      let localStorageData=JSON.parse(localStorage.getItem("user"))
    localStorageData &&
    await fetch(`https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?where=userName%3D'${localStorageData}'&loadRelations=licenseType%2Cwatchlist`)
    .then(res=>res.json())
    .then(data=>{
      setWatchlist(data[0].watchlist)
      tempWatchlist=[...(data[0].watchlist)]
    })
    return (tempWatchlist)
    
    };

    useEffect(()=>{
      seriesFetch()
      moviesFetch()
      updateWatchlist()
    },[])

  return (
    <>
    {
      isRender.current &&
      <authContext.Provider value={{isLoggedIn,userInfos,login,logout,setUserInfos}}>
      <moviesCountContext.Provider value={{seriesCount,moviesCount}}>
      <watchlistContext.Provider value={{watchlist,updateWatchlist}}>
        {routes}
        <ToastContainer />
      </watchlistContext.Provider>
      </moviesCountContext.Provider>
      </authContext.Provider>

    }
    </>
  );
}
export default App;
