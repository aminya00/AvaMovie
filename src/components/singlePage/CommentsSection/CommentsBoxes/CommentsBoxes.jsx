import "./CommentsBoxes.css";
import { EnToFaNums } from "../../../../ulits";
import { CgSortAz } from "react-icons/cg";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox/CommentBox";

function CommentsBoxes({ comments, commentsCount ,subCommentDataHandler}) {
  const [commentSort, setCommentSort] = useState([
    "جدیدترین",
    "قدیمی‌ترین",
    "مفیدترین",
  ]);
  const [activeSort, setActiveSort] = useState("جدیدترین");
  const [sortedComments, useSortedComments] = useState(comments.toReversed());
  const time=new Date()

  useEffect(()=>{
    useSortedComments(comments.toReversed())
  },[comments])

  const sortHandler = (title) => {
    if(title != activeSort){
      setActiveSort(title);      
     title == "جدیدترین"
       ? useSortedComments(comments.toReversed())
       : title == "قدیمی‌ترین"
       ? useSortedComments(comments)
       : useSortedComments(comments.toSorted(() => 0.5 - Math.random()));
    }

  };
  const commentDateHandler=(createDate)=>{
   let createdTime=new Date(createDate)
   let yearPast=time.getFullYear()-createdTime.getFullYear()
   let monthPast=time.getMonth()-createdTime.getMonth()
   let dayPast=time.getDate()-createdTime.getDate()
   
  return yearPast>0?
   `${EnToFaNums(yearPast)} سال پیش`:
   monthPast>0?
   `${EnToFaNums(monthPast)} ماه پیش`:
   dayPast>0?
   `${EnToFaNums(dayPast)} روز پیش`:
   "امروز"
    
  }
  return (
    <>
    {
      Boolean(commentsCount) &&
      <div className="comments-sort-container">
        <div className="comments-sort-content">
          <div className="comments-sort-content-title">
            <CgSortAz />
            <span>مرتب‌سازی بر اساس:</span>
          </div>
          <div className="comments-sort-content-btns">
            {commentSort.map((title,index) => (
              <div
              key={index}
                className={`comments-sort-content-btn ${
                  activeSort == title ? "active" : ""
                }`}
                onClick={() => sortHandler(title)}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
        <div className="comments-sort-comment-count">
          {EnToFaNums(commentsCount)} نظر
        </div>
      </div>
    }
      <div className="comments-container">
        {sortedComments.map((comment) => (
          <CommentBox key={comment.id} comment={comment} commentDateHandler={commentDateHandler} subCommentDataHandler={subCommentDataHandler}/>
        ))}
      </div>
    </>
  );
}
export default CommentsBoxes;
