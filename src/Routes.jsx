import { lazy,Suspense } from "react"

// import HomePage from "./components/homePage/HomePage"
const HomePage=lazy(()=>import("./components/homePage/HomePage"))
// import SinglePage from "./components/singlePage/SinglePage"
const SinglePage=lazy(()=>import("./components/singlePage/SinglePage"))
// import LoginPage from "./components/LoginPage/LoginPage"
const LoginPage=lazy(()=>import("./components/LoginPage/LoginPage"))
// import MultiPage from "./components/MultiPage/MultiPage"
const MultiPage=lazy(()=>import("./components/MultiPage/MultiPage"))
// import ListsPage from "./components/ListsPage/ListsPage"
const ListsPage=lazy(()=>import("./components/ListsPage/ListsPage"))
// import BoxofficePage from "./components/BoxofficePage/BoxofficePage"
const BoxofficePage=lazy(()=>import("./components/BoxofficePage/BoxofficePage"))
// import BestOfIMDB from "./components/BestOfIMDB/BestOfIMDB"
const BestOfIMDB=lazy(()=>import("./components/BestOfIMDB/BestOfIMDB"))
// import PeoplePage from "./components/PeoplePage/PeoplePage"
const PeoplePage=lazy(()=>import("./components/PeoplePage/PeoplePage"))
// import InformationPage from "./components/InformationPage/InformationPage"
const InformationPage=lazy(()=>import("./components/InformationPage/InformationPage"))
// import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
const NotFoundPage=lazy(()=>import("./components/NotFoundPage/NotFoundPage"))
// import AllPeoplePage from "./components/AllPeoplePage/AllPeoplePage"
const AllPeoplePage=lazy(()=>import("./components/AllPeoplePage/AllPeoplePage"))
// import NotificationPage from "./components/NotificationPage/NotificationPage"
const NotificationPage=lazy(()=>import("./components/NotificationPage/NotificationPage"))
// import UserPanelPage from "./components/UserPanelPage/UserPanelPage"
const UserPanelPage=lazy(()=>import("./components/UserPanelPage/UserPanelPage"))
// import LicensesPage from "./components/LicensesPage/LicensesPage"
const LicensesPage=lazy(()=>import("./components/LicensesPage/LicensesPage"))
// import LicensesComp from "./components/LicensesComp/LicensesComp"
const LicensesComp=lazy(()=>import("./components/LicensesComp/LicensesComp"))
// import WatchlistComp from "./components/WatchlistComp/WatchlistComp"
const WatchlistComp=lazy(()=>import("./components/WatchlistComp/WatchlistComp"))
// import DashboardComp from "./components/DashboardComp/DashboardComp"
const DashboardComp=lazy(()=>import("./components/DashboardComp/DashboardComp"))
// import SearchResultPage from "./components/SearchResultPage/SearchResultPage"
const SearchResultPage=lazy(()=>import("./components/SearchResultPage/SearchResultPage"))


const Routes=[
    {path:"/", element:<Suspense><HomePage/></Suspense>},
    {path:"/series/:moviesName", element:<Suspense><SinglePage isSeries={true}/></Suspense>},
    {path:"/movies/:moviesName", element:<Suspense><SinglePage isSeries={false}/></Suspense>},
    {path:"/login", element:<Suspense><LoginPage isRegister={false}/></Suspense>},
    {path:"/register", element:<Suspense><LoginPage isRegister={true}/></Suspense>},
    {path:"/series/page/:page", element:<Suspense><MultiPage subject={'series'}/></Suspense>},
    {path:"/movies/page/:page", element:<Suspense><MultiPage subject={'movies'}/></Suspense>},
    {path:"/collection/:collectionName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'collection'}/></Suspense>},
    {path:"/list/:listName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'list'}/></Suspense>},
    {path:"/genres/:genresName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'genres'}/></Suspense>},
    {path:"/suggested/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'suggested'}/></Suspense>},
    {path:"/movie-dub/:page", element:<Suspense><MultiPage subject={'movie-dub'}/></Suspense>},
    {path:"/series-dub/:page", element:<Suspense><MultiPage subject={'series-dub'}/></Suspense>},
    {path:"/korean-series/:page", element:<Suspense><MultiPage subject={'korean-series'}/></Suspense>},
    {path:"/series-cancelled/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'series-cancelled'}/></Suspense>},
    {path:"/series-end/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'series-end'}/></Suspense>},
    {path:"/series-current/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'series-current'}/></Suspense>},
    {path:"/series-renewed/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'series-renewed'}/></Suspense>},
    {path:"/country/:countryName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'country'}/></Suspense>},
    {path:"/language/:languageName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'language'}/></Suspense>},
    {path:"/streamer/:streamerName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'streamer'}/></Suspense>},
    {path:"/age/:ageName/:page", element:<Suspense><MultiPage hasItemCount={true} subject={'age'}/></Suspense>},
    {path:"/collection/:page", element:<Suspense><ListsPage subject={'collection'}/></Suspense>},
    {path:"/list/:page", element:<Suspense><ListsPage subject={'list'}/></Suspense>},
    {path:"/boxoffice", element:<Suspense><BoxofficePage/></Suspense>},
    {path:"/250movies/:page", element:<Suspense><BestOfIMDB isSeries={false}/></Suspense>},
    {path:"/250series/:page", element:<Suspense><BestOfIMDB isSeries={true}/></Suspense>},
    {path:"/people/:peopleName/:page", element:<Suspense><PeoplePage/></Suspense>},
    {path:"/director/:peopleName/:page", element:<Suspense><PeoplePage/></Suspense>},
    {path:"/people/:page", element:<Suspense><AllPeoplePage/></Suspense>},
    {path:"/search/:searchParam/:page", element:<Suspense><SearchResultPage subject={'search'}/></Suspense>},
    {path:"/year/:year/:page", element:<Suspense><SearchResultPage subject={'year'}/></Suspense>},
    {path:"/common-question/", element:<Suspense><InformationPage subject={'common-question'}/></Suspense>},
    {path:"/dmca/", element:<Suspense><InformationPage subject={'dmca'}/></Suspense>},
    {path:"/contact-us/", element:<Suspense><InformationPage subject={'contact-us'}/></Suspense>},
    {path:"/notifications/", element:<Suspense><NotificationPage/></Suspense>},
    {path:"/panel/", element:<Suspense><UserPanelPage/></Suspense>, children:[
        {path:"dashboard", element:<Suspense><DashboardComp/></Suspense>},
        {path:"buy-license", element:<Suspense><LicensesComp/></Suspense>},
        {path:"watchlist/:page", element:<Suspense><WatchlistComp/></Suspense>},
    ]},
    {path:"/buy-license/", element:<Suspense><LicensesPage/></Suspense>},
    {path:"*", element:<Suspense><NotFoundPage/></Suspense>},

]
export default Routes





