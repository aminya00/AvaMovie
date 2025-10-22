import { useState } from 'react';
import './CommentSpoilBox.css'
import { RiAlarmWarningLine } from "react-icons/ri";

function CommentSpoilBox({isSpoiler}){
    const [hasSpoil,setHasSpoil]=useState(isSpoiler)
    return(
        <div className={`comment-box-spoil-cover ${hasSpoil?'is-spoil':''}`}>
                <span className="comment-box-spoil-text">
                  <RiAlarmWarningLine />
                  <span>نظر حاوی اسپویل می‌باشد!</span>
                </span>
                <div className="comment-box-spoil-btn" onClick={()=>{setHasSpoil(prev=>!prev)}}>مشاهده</div>
              </div>
    )
}
export default CommentSpoilBox