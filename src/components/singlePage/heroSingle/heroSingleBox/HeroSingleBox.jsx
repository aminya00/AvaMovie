import './HeroSingleBox.css'
import GridBoxIcons from '../../../mainContent/SeriesRowContent/gridRowBox/GridBoxIcons/GridBoxIcons'
import { HiMiniPlay } from "react-icons/hi2";


function HeroSingleBox({hasSub,hasDub,hasOnline,cover}){
    return(
        <div className='hero-single-box' style={{backgroundImage:`url(../../../../${cover})`}}>
            <div className='hero-single-play-icon'>
                <div className="play-icon-border play-icon-border-2" >
                <div className="play-icon-border play-icon-border-1" >
                    <HiMiniPlay />
                </div>
                </div>
            </div>
            <GridBoxIcons {...{hasSub,hasDub,hasOnline}}/>
        </div>
    )
}

export default HeroSingleBox