
function RatingNumbers({mainClasses,rateClasses,rate,maxRate}){
    
    return <span className={`${mainClasses}`}><span className={`${rateClasses}`}>{rate}</span>/{maxRate}</span>
}
export default RatingNumbers