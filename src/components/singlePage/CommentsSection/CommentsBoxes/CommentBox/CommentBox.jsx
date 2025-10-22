import './CommentBox.css'
import CommentSpoilBox from '../../CommentSpoilBox/CommentSpoilBox'
import SubCommentBox from '../SubCommentBox/SubCommentBox'
import { BiMessageRounded } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { EnToFaNums } from '../../../../../ulits';
import { useState } from 'react';
const commentBox=({comment,commentDateHandler,subCommentDataHandler})=>{
    const [likes,setLikes]=useState(comment.likes)
    const [dislikes,setDislikes]=useState(comment.dislikes)
    
    return(
        <div className="comments-group-box" >
                    <div className="comments-box ">
                      <div className="comment-box-photo-container">
                        <div className="comment-box-img">
                          <img src="/assets/user-photo/male-avatar.png" alt="" />
                        </div>
                      </div>
                      <div className="comment-box-content-container">
                        <div className="comment-box-content-text">
                          <span className="comment-box-content-text-name">
                            {comment.owner}
                          </span>
                          <span className="comment-box-content-text-body">
                            {comment.commentText}
                          </span>
                        </div>
                        <div className="comment-box-content-btns-container">
                          <div className="comment-box-answer-btn" onClick={()=>subCommentDataHandler(comment.objectId,comment.owner,comment.subComments)}>پاسخ</div>
                          <div className="comment-box-answer-count">
                            <BiMessageRounded />
                            <span>{comment.subComments?EnToFaNums(comment.subComments.length):0}</span>
                          </div>
                          <div className="comment-box-likes-container">
                            <div className="comment-box-likes like" onClick={()=>{setLikes(prev=>prev+1)}}>
                              <BiLike />
                              <span className="comment-box-likes-count">
                                {EnToFaNums(likes)}
                              </span>
                            </div>
                            <div className="comment-box-likes dislike" onClick={()=>{setDislikes(prev=>prev+1)}}>
                              <BiDislike />
                              <span className="comment-box-likes-count">
                                {EnToFaNums(dislikes)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comment-box-date-container">
                        <div className="comment-box-date-content">
                          {
                            Boolean(comment.score) &&
                          <div className="comment-box-score">
                            <span>امتیاز {EnToFaNums(comment.score)} از ۱۰</span>
                          </div>
                          
                          }
                          <span>
                            {commentDateHandler(comment.created)}
                          </span>
                        </div>
                      </div>
                      <CommentSpoilBox isSpoiler={comment.isSpoiler}/>
                    </div>
                    {comment.subComments && comment.subComments.map((subComment, index) => (
                        <SubCommentBox key={index} subComment={subComment} index={index} subCommentDataHandler={subCommentDataHandler} commentDateHandler={commentDateHandler} comment={comment}/>
                    ))}
                  </div>
    )
}
export default commentBox