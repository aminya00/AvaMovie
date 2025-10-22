import "./LoginPage.css";
import { lazy,Suspense } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import useForm from "../../Hooks/useForm";
// import LoginForm from "./LoginForm/LoginForm";
const LoginForm=lazy(()=>import("./LoginForm/LoginForm"))
// import RegisterForm from "./RegisterForm/RegisterForm";
const RegisterForm=lazy(()=>import("./RegisterForm/RegisterForm"))

const LoginPage = ({ isRegister }) => {
  const navigate = useNavigate()
  return (
    <div className="login-page-container">
      <div
        className="login-go-back-container"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="login-go-back-icon">
          <IoIosArrowForward />
        </div>
        <div className="login-go-back-title">
          <span>رفتن به عقب</span>
        </div>
      </div>
      <div className="login-content-container">
        <div className="login-box-container">
          <div className="login-box-title">
            {isRegister ? "عضویت در آوا مووی" : "ورود به پنل کاربری"}
          </div>
          {isRegister ? (
            <Suspense>
              <RegisterForm />
            </Suspense>
          ) : (
            <>
            <Suspense>
              <LoginForm />
            </Suspense>
              <div className="login-box-links">
                <Link to={""}>
                  <div className="forget-password">
                    <MdOutlineLock className="forget-password-icon" />
                    <span className="forget-password-title">
                      فراموشی رمز عبور
                    </span>
                  </div>
                </Link>
              </div>
            </>
          )}
          <div className="login-box-line"></div>
          <Link
            to={isRegister ? "/login" : "/register"}
            className="login-box-btns login-box-btn"
          >
            <span className="login-box-btns-title">
              {isRegister ? "ورود به پنل" : "عضویت در آوامووی"}
            </span>
            <RiUserAddLine className="login-box-btns-icon" />
          </Link>
          <div className="login-box-icon-container">
            <img src="/assets/icon/logo-x3.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
