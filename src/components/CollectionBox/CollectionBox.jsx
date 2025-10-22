import './CollectionBox.css'
import { EnToFaNums } from '../../ulits'
import { memo } from 'react';

const CollectionBox=memo(({name,movies})=>{
    
    return(
        <div className='collection-box'>
                <img className='collection-box-background' src={movies[0].cover} alt="" />
            <div className="collection-box-img-container">
                <img src={movies[0].cover} alt="" />
            </div>
            <div className="collection-box-name">{name}</div>
            <div className="collection-box-count-box">
                <div className="collection-box-count-title">تعداد:</div>
                <div className="collection-box-count-num">{EnToFaNums(movies.length)}</div>
            </div>
        </div>
    )
})

export default CollectionBox