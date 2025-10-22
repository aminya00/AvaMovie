import './MoviesListRowBox.css'
import { EnToFaNums } from '../../../../ulits';
import { memo } from 'react';
import { miladiTojalaali } from '../../../../ulits';

const MoviesListRowBox=memo(({name,owner,movies,created})=>{
    
    return(
        <div className='movies-list-row-box'>
         <div className='movies-list-row-box-img-cont'>
            {
                [...movies.slice(0,4)].map((movie)=>(
                    <img key={movie.id} src={`${movie.cover}`} alt="" />
                ))
            }
           
         </div>
         <div className='movies-list-row-box-info'>
            <div className="movies-list-box-title">{name}</div>
            <div className="movies-list-box-desc">
            <div className="movies-list-box-decs-item">
                <span>آیتم‌ها</span>
                <span>{movies.length}</span>
            </div>
            <div className="movies-list-box-decs-item">
                <span>ایجاد</span>
                <span>{miladiTojalaali(new Date(created))}</span>
            </div>
            <div className="movies-list-box-decs-item">
                <span>توسط</span>
                <span className='movies-list-box-owner-name'>{owner.nickName}</span>
            </div>

            </div>
         </div>
        </div>
       
    )
})
export default MoviesListRowBox