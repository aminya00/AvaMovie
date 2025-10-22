import { memo, useEffect, useReducer, useState } from "react";
import "./LoginInput.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const LoginInput = ({
  inputIcon,
  inputType,
  inputPlaceHolder,
  inputLegend,
  inputExtra,
  id,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div
      className={`login-form-input-box ${isActiveInput ? "activeInput" : ""}`}
    >
      <div className="login-form-input-icon">{inputIcon}</div>
      <div className="login-form-input-line"></div>
      <input
        type={isShowPassword ? "text" : inputType}
        className="login-form-input"
        placeholder={inputPlaceHolder}
        value={inputValue}
        id={id}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onFocus={() => setIsActiveInput(true)}
        onBlur={() => setIsActiveInput(false)}
      />
      <div className="login-input-legend">{inputLegend}</div>
      {inputExtra == "eyeIcon" ? (
        <div
          className="login-input-eye-icon"
          onClick={() => {
            setIsShowPassword((prev) => !prev);
          }}
        >
          {isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      ) : inputExtra == "captcha" ? (
        <div className="login-input-captcha">
          <img src="/assets/captcha/captcha code.jpg" alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default LoginInput;
