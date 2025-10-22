import './BoxesRating.css'
import { lazy,Suspense } from 'react';
// import RatingNumbers from '../../../../RatingNumbers/RatingNumbers'
const RatingNumbers = lazy(() => import("../../../../RatingNumbers/RatingNumbers"));

function BoxesRating({avaRating,imdb}){
    
    return(
            <div className="rating-box-cont">
                <div>
                    <Suspense>
                    <RatingNumbers {...{mainClasses:'',rateClasses:'max-rating',maxRate:10,rate:avaRating}}/>
                    <img src="/assets/rating/ava-min.png" alt="" />
                    </Suspense>
                </div>
                <div>
                    <Suspense>
                    <RatingNumbers {...{mainClasses:'',rateClasses:'max-rating',maxRate:10,rate:imdb}}/>
                    <img src="/assets/rating/imdb-min.png" alt="" />
                    </Suspense>
                </div>
            </div>
       
    )
}
export default BoxesRating