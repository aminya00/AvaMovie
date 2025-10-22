import './GridBoxIcons.css'
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsCcCircleFill } from "react-icons/bs";
import { PiMicrophoneFill } from "react-icons/pi";

function GridBoxIcons({hasDub,hasSub,hasOnline}){
    return(
        <div className="row-box-icons-cont">
                <div className='row-box-icons-right'>
                {hasDub && <PiMicrophoneFill />}
                {hasSub && <BsCcCircleFill />}
                </div>
                <div className='row-box-icons-left'>
                {hasOnline && <FaRegCirclePlay />}
                </div>
            </div>
    )
}

export default GridBoxIcons