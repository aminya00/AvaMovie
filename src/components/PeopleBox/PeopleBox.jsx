import './PeopleBox.css'
import { EnToFaNums } from '../../ulits'
import { memo } from 'react';

const PeopleBox=memo(({imgUrl,movies,name})=>{
    
    return(
        <div className='people-box-container'>
            <div className="people-box-img">
                <img src={imgUrl || '/assets/starring/no-avatar.jpg'} alt="" />
                <div className="people-box-movie-count">
                    {EnToFaNums(movies.length)} فیلم
                </div>
            </div>
            <div className="people-box-title">{name}</div>
        </div>
    )
})
export default PeopleBox