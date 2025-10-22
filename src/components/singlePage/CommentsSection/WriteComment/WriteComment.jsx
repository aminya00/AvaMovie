import "./WriteComment.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import { BiMessageRounded } from "react-icons/bi";
import { useContext } from "react";
import { authContext } from "../../../../contextApi";

function WriteComment({
  isSubcomment,
  subcommentObjectId,
  subCommentTo,
  subComments,
}) {
  const AuthContext = useContext(authContext);
  const [spoilIsActive, setSpoilIsActive] = useState(false);
  const [commentScore, setCommentScore] = useState(0);
  const [newCommentBody, setNewCommentBody] = useState("");
  const movieNameUrl = useParams();

  const clearInputs=()=>{
    setSpoilIsActive(false);
    setCommentScore(0);
    setNewCommentBody("");
  }
  const commnetScoreHandler = (e) => {
    setCommentScore(e.target.value);
  };
  const addCommentFetch = async (commentObj) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObj),
      }
    ).then((res) => console.log(res));
  };
  const addSubCommentFetch = async (subCommentObj) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Comments/${subcommentObjectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subComments?{subComments:[...subComments,subCommentObj]}:{subComments:[subCommentObj]}),
      }
    ).then((res) => console.log(res));
  };
  const addNewCommentHandler = () => {
    let newCommnet = {
      owner: AuthContext.userInfos.nickName,
      subComments: [],
      dislikes: 0,
      commentText: newCommentBody,
      movieNameUrl: movieNameUrl.moviesName,
      likes: 0,
      score: commentScore,
      isSpoiler:spoilIsActive
    };
    addCommentFetch(newCommnet);
    clearInputs()
  };
  const addNewSubCommentHandler = () => {
    let newSubCommnet = {
      to: subCommentTo,
      likes: 0,
      owner: AuthContext.userInfos.nickName,
      score: commentScore,
      dislikes: 0,
      commentText: newCommentBody,
      movieNameUrl: movieNameUrl.moviesName,
      isSpoiler:spoilIsActive
    };
    addSubCommentFetch(newSubCommnet);
    clearInputs()
  };
  return (
    <div className="write-comment-container">
      <div className="write-comment-header">
        <div className="write-comment-header-title">
          {isSubcomment && AuthContext.isLoggedIn ? (
            <span>
              ارسال پاسخ برای <strong>{subCommentTo}</strong>
            </span>
          ) : (
            <span>
              ثبت نظر <strong>برای این فیلم</strong>
            </span>
          )}
        </div>
        {AuthContext.isLoggedIn && (
          <div className="write-comment-header-spoil">
            <span>حاوی اسپویل</span>
            <div
              className={`spoil-switch ${spoilIsActive ? "active" : ""}`}
              onClick={() => {
                setSpoilIsActive((prev) => !prev);
              }}
            >
              <div
                className={`spoil-switch-circle ${
                  spoilIsActive ? "active" : ""
                }`}
              ></div>
            </div>
          </div>
        )}
      </div>
      {AuthContext.isLoggedIn ? (
        <div className="write-comment-body-is-login">
          <textarea
            className="write-comment-textarea"
            name="write-comment-textarea"
            id=""
            placeholder="متن نظر..."
            value={newCommentBody}
            onChange={(e) => {
              setNewCommentBody(e.target.value);
            }}
          ></textarea>
          <div className="write-comment-submit-container">
            <div className="write-comment-score-container">
              <span className="write-comment-score-title">امتیاز شما</span>
              <div className="write-comment-score">
                <div className="write-comment-score-lable">
                  <span className="comment-last-score">10</span>
                  <span className="comment-first-score">{commentScore}</span>
                </div>
                <Slider
                  onChange={commnetScoreHandler}
                  aria-label="Temperature"
                  defaultValue={0}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  value={commentScore}
                />
              </div>
            </div>
            <div
              className="write-comment-submit-btn"
              onClick={isSubcomment?addNewSubCommentHandler:addNewCommentHandler}
            >
              <span>ثبت نظر</span>
              <BiMessageRounded />
            </div>
          </div>
        </div>
      ) : (
        <div className="write-comment-body-no-login">
          <span>برای ثبت نظر ابتدا باید وارد حساب کاربری خود شوید</span>
          <div className="write-comment-body-no-login-btns">
            <Link to={"/login"}>
              <div className="write-comment-body-no-login-btn write-comment-sign-in-btn">
                ورود
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="write-comment-body-no-login-btn write-comment-register-btn">
                عضویت
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default WriteComment;
