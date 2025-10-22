import "./LoginForm.css";
import { MdAlternateEmail } from "react-icons/md";
import { RiDoorLockLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import LoginInput from "../LoginInput/LoginInput";
import { useReducer, useEffect, useRef } from "react";
import { authContext } from "../../../contextApi";
import { useContext } from "react";
import { showLoginToast } from "../../../toast";
import { useNavigate } from "react-router-dom";

const loginReduceHandler = (state, action) => {
  switch (action.type) {
    case "INPUT": {
      return { ...state, [action.id]: action.value };
    }
  }
};

const LoginForm = () => {
  const AuthContext = useContext(authContext);
  const navigate=useNavigate()
  const [loginInputReducer, dispatch] = useReducer(loginReduceHandler, {
    username: "",
    password: "",
  });
  const isCheckInputs = useRef(false);

  const loginFormSubmitHand = (e) => {
    e.preventDefault();
    for (const input of e.target.elements) {
      input.id &&
        dispatch({
          type: "INPUT",
          value: input.value,
          id: input.id,
        });
    }
  };
  const isLoginFetch = async (username, password) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?where=(userName%3D'${username}'%20%7C%7C%20email%3D'${username}')%20%26%26%20password%3D'${password}'&loadRelations=licenseType%2Cwatchlist`
    )
      .then((res) => res.json())
      .then((userInfo) =>{
        if(userInfo.length){
          AuthContext.login(userInfo[0])
          navigate('/')
        }else{
          showLoginToast('نام‌کاربری یا رمزعبور نادرست است')
        }
  });
  };
  useEffect(() => {
    isCheckInputs.current &&
      isLoginFetch(loginInputReducer.username, loginInputReducer.password);
    isCheckInputs.current = true;
  }, [loginInputReducer]);

  return (
    <>
    <form className="login-box-form" onSubmit={loginFormSubmitHand}>
      <LoginInput
        {...{
          id: "username",
          inputIcon: <MdAlternateEmail />,
          inputType: "text",
          inputPlaceHolder: "آدرس ایمیل",
          inputLegend: "نام‌کاربری یا پست الکترونیک",
          inputExtra: "",
        }}
      />
      <LoginInput
        {...{
          id: "password",
          inputIcon: <RiDoorLockLine />,
          inputType: "password",
          inputPlaceHolder: "رمز‌عبور",
          inputLegend: "رمز‌عبور",
          inputExtra: "eyeIcon",
        }}
      />
      <LoginInput
        {...{
          inputIcon: <RiDoorLockLine />,
          inputType: "text",
          inputPlaceHolder: "کپچا",
          inputLegend: "کد مقابل را وارد کنید",
          inputExtra: "captcha",
        }}
      />

      <button className="login-box-btns login-form-submit-btn">
        <span className="login-box-btns-title">ورود به پنل کاربری</span>
        <FaArrowLeft className="login-box-btns-icon" />
      </button>
    </form>
    </>
  );
};

export default LoginForm;
