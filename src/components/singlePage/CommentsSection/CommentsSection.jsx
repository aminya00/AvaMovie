import "./CommentsSection.css";
import WriteComment from "./WriteComment/WriteComment";
import CommentsBoxes from "./CommentsBoxes/CommentsBoxes";
import { useState } from "react";

function CommentsSection({commentRef,comments,commentsCount,scrollToComment}) {
  const [isSubcomment,setIsSubcomment]=useState(false)
  const [subcommentObjectId,setSubcommentObjectId]=useState(false)
  const [subCommentTo,setSubCommentTo]=useState(false)
  const [subComments,setSubComments]=useState([])

  const subCommentDataHandler=(objectId,owner,subComments)=>{
    setIsSubcomment(true)
    setSubcommentObjectId(objectId)
    setSubCommentTo(owner)
    setSubComments(subComments)
    window.scrollTo({
      top: scrollToComment.current.offsetTop - 90,
      behavior: "smooth",
    });
    
  }

  return (
    <div className="comments-section-container" ref={commentRef}>
      <WriteComment { ...{isSubcomment,subcommentObjectId,subCommentTo,subComments}}/>
      <CommentsBoxes comments={comments} commentsCount={commentsCount} subCommentDataHandler={subCommentDataHandler}/>
    </div>
  );
}

export default CommentsSection;
