import './ImgBoxComp.css'

function ImgBoxComp({imgUrl,imgNumber}){
    return(
        <>
        <div className="img-box-container">
                <img src={imgUrl} alt="" />
                <div className="img-box-number-box">
                {imgNumber}
                </div>
        </div>
        </>
    )
}

export default ImgBoxComp