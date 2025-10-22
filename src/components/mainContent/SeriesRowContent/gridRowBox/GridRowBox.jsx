import './GridRowBox.css'
import { lazy,Suspense } from 'react';
// import GridBoxIcons from './GridBoxIcons/GridBoxIcons'
const GridBoxIcons = lazy(() => import("./GridBoxIcons/GridBoxIcons"));
// import BoxesRating from '../../moviesRowContent/MoviesRowBox/BoxesRating/BoxesRating'
const BoxesRating = lazy(() => import("../../moviesRowContent/MoviesRowBox/BoxesRating/BoxesRating"));

function GridRowBox({name,postScript,cover,avaRating,imdb,description,hasSub,hasDub,hasOnline,year}){
    
    return(
        <div className='grid-row-box'>
         <div className='grid-row-box-img-cont'>
            <img src={`${cover}`} alt="" />
            <div className='grid-row-box-shadow'>
                <div className='grid-row-box-shadow-desc'>{description}</div>
            </div>
            <Suspense>
            <GridBoxIcons {...{hasSub,hasDub,hasOnline}}/>
            </Suspense>
         </div>
         <div className='grid-row-box-info'>
            <span className='grid-row-box-ps'>{postScript.length?postScript[0]:year}</span>
            <span className='grid-row-box-name'>{name}</span>
            <Suspense>
            <BoxesRating {...{avaRating,imdb}}/>
            </Suspense>
         </div>
        </div>
       
    )
}
export default GridRowBox