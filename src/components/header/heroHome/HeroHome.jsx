import './HeroHome.css'
import { useState ,lazy,Suspense} from 'react'
// import HeroSwiper from './heroSwiper/HeroSwiper'
const HeroSwiper = lazy(() =>import("./heroSwiper/HeroSwiper"));
// import HeroDetail from './heroDetail/HeroDetail'
const HeroDetail = lazy(() =>import("./heroDetail/HeroDetail"));
// import HeroShadow from './heroShadow/HeroShadow'
const HeroShadow = lazy(() =>import("./heroShadow/HeroShadow"));

function HeroHome({movieArr}){
    const[heroHomeBg,setHeroHomeBg]=useState('')
    const[activeSlideIndex,setActiveSlideIndex]=useState(0)

    function heroBgHandler(index){
        setHeroHomeBg(movieArr[index].bgCover)
        setActiveSlideIndex(index) 
    }

    return(
        <div className='hero-home-cont' style={{backgroundImage:`url(../../../../${heroHomeBg})`}}>
            <div className='hero-swiper-cont'>
                <Suspense>
                <HeroSwiper onHeroBg={(index)=>heroBgHandler(index)} movieArr={movieArr} />
                </Suspense>
            </div>                <Suspense>

            <HeroDetail {...movieArr[activeSlideIndex]}/>                </Suspense>
                <Suspense>
            <HeroShadow/>                </Suspense>
        </div>
    )
}

export default HeroHome