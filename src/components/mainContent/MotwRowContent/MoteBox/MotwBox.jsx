import './MotwBox.css'

function MotwBox({name,year,cover}){
    return(
        <div className='motw-box'>
         <div className='motw-box-img-cont'>
            <img src={`${cover}`} alt="" />
         </div>
         <div className='motw-box-info'>
            <span className='motw-box-name'>{name}</span>
            <span className='motw-box-year'>{year}</span>
         </div>
        </div>
       
    )
}
export default MotwBox