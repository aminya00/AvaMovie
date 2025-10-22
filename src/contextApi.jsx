import { createContext } from "react";
export const authContext=createContext({
    isLoggedIn:false,
    userInfos:{},
    login:()=>{},
    logout:()=>{},  
    setUserInfos:()=>{}    
})
export const moviesCountContext=createContext({
    seriesCount:0,
    moviesCount:0
})
export const watchlistContext=createContext({
    watchlist:[],
    updateWatchlist:()=>{}
})