import "./SubCommentBox.css";
import CommentSpoilBox from "../../CommentSpoilBox/CommentSpoilBox";
import { BiMessageRounded } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { EnToFaNums } from "../../../../../ulits";
import { useState } from "react";

const SubCommentBox = ({
  subComment,
  subCommentDataHandler,
  commentDateHandler,
  comment,
}) => {
  const [likes, setLikes] = useState(subComment.likes);
  const [dislikes, setDislikes] = useState(subComment.dislikes);
  return (
    <div className="comments-box sub-comment-box">
      <div className="comment-box-photo-container">
        <div className="comment-box-img">
          <img src="/assets/user-photo/male-avatar.png" alt="" />
        </div>
      </div>
      <div className="comment-box-content-container">
        <div className="comment-box-content-text">
          <div className="comment-box-content-text-name-cont">
            <span className="comment-box-content-text-name">
              {subComment.owner}
            </span>
            <span className="comment-box-content-text-name">
              در پاسخ به <span>{subComment.to} </span>
            </span>
          </div>
          <span className="comment-box-content-text-body">
            {subComment.commentText}
          </span>
        </div>
        <div className="comment-box-content-btns-container">
          <div
            className="comment-box-answer-btn"
            onClick={() =>
              subCommentDataHandler(
                comment.objectId,
                subComment.owner,
                comment.subComments
              )
            }
          >
            پاسخ
          </div>
          <div className="comment-box-answer-count">
            <BiMessageRounded />
            <span>{EnToFaNums(0)}</span>
          </div>
          <div className="comment-box-likes-container">
            <div className="comment-box-likes like" onClick={()=>{setLikes(prev=>prev+1)}}>
              <BiLike />
              <span className="comment-box-likes-count">
                {EnToFaNums(likes)}
              </span>
            </div>
            <div className="comment-box-likes dislike"  onClick={()=>{setDislikes(prev=>prev+1)}}>
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
          {Boolean(subComment.score) && (
            <div className="comment-box-score">
              <span>امتیاز {EnToFaNums(subComment.score)} از ۱۰</span>
            </div>
          )}
          <span>{commentDateHandler(comment.created)}</span>
        </div>
      </div>
      <CommentSpoilBox isSpoiler={subComment.isSpoiler} />
    </div>
  );
};

export default SubCommentBox;
