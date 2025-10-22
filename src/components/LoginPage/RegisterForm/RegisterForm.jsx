import "./RegisterForm.css";
import { MdAlternateEmail } from "react-icons/md";
import { RiDoorLockLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { RiUserSmileLine } from "react-icons/ri";
import { MdPhoneIphone } from "react-icons/md";
import LoginInput from "../LoginInput/LoginInput";
import useForm from "../../../Hooks/useForm";
import validationFunc from "../../../validators/validationFuncs";
import { showLoginToast } from "../../../toast";
import { EnToFaNums } from "../../../ulits";
import { useEffect, useReducer, useRef } from "react";
import { useContext } from "react";
import { authContext } from "../../../contextApi";
import { useNavigate } from "react-router-dom";

const inputReduceHand = (state, action) => {
  switch (action.type) {
    case "INPUTS":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          value: action.value,
          isValid: action.isValid.isValid,
          errorModalText: action.isValid.validationErrorText,
        },
      };
  }
};

const RegisterForm = () => {
   
  const AuthContext=useContext(authContext)  
  const navigate=useNavigate()
  const [formValidation, formGetInputs] = useForm();
  const isGetInputs = useRef(false);
  const checkFormValidation = useRef(false);
  const [inputReducer, dispatch] = useReducer(inputReduceHand, {
    name: {
      value: "",
      validations: [
        {
          type: "min",
          value: 3,
          errorText: `نام و نام‌خانوادگی باید حداقل ${EnToFaNums(
            3
          )} حرف داشته باشد `,
        },
        {
          type: "required",
          errorText: "وارد کردن نام و نام‌خانوادگی الزامی است",
        },
      ],
      isValid: false,
      errorModalText: "",
    },
    username: {
      value: "",
      validations: [
        {
          type: "required",
          errorText: "وارد کردن نام کاربری الزامی است",
        },
       
      ],
      isValid: false,
      errorModalText: "",
    },
    email: {
      value: "",
      validations: [
        { type: "email", errorText: "ایمیل وارد شده معتبر نیست" },
        { type: "required", errorText: "وارد کردن ایمیل الزامی است" },
      ],
      isValid: false,
      errorModalText: "",
    },
    phone: {
      value: "",
      validations: [
        { type: "phoneNumber", errorText: "شماره موبایل وارد شده معتبر نیست" },
        { type: "required", errorText: "وارد کردن شماره موبایل الزامی است" },
      ],
      isValid: false,
      errorModalText: "",
    },
    password: {
      value: "",
      validations: [
        {
          type: "min",
          value: 8,
          errorText: `رمزعبور باید حداقل ${EnToFaNums(8)} حرف داشته باشد `,
        },
        {
          type: "max",
          value: 12,
          errorText: `رمزعبور باید حداکثر ${EnToFaNums(12)} حرف داشته باشد `,
        },
        { type: "required", errorText: "وارد کردن رمزعبور الزامی است" },
      ],
      isValid: false,
      errorModalText: "",
    },
    checkPassword: {
      value: "",
      validations: [
        {
          type: "checkPassword",
          errorText: "وارد کردن رمزعبور در هر دو فیلد به صورت یکسان الزامی است",
        },
        { type: "required", errorText: "وارد کردن تکرار رمزعبور الزامی است" },
      ],
      isValid: false,
      errorModalText: "",
    },
  });

  useEffect(() => {
    isGetInputs.current && formGetInputs(inputReducer);
    isGetInputs.current = true;
  }, [inputReducer]);

  useEffect(() => {
    checkFormValidation.current &&
      (formValidation.isFormValid
        ? addNewUserFetch(formValidation.inputs)
        : showLoginToast(formValidation.loginModalText));
    checkFormValidation.current = true;
  }, [formValidation]);

  const formSubmitHand = (e) => {
    e.preventDefault();
    for (const inputElem of e.target.elements) {
      inputElem.id &&
        dispatch({
          type: "INPUTS",
          id: `${inputElem.id}`,
          value: inputElem.value,
          isValid: validationFunc(
            inputReducer[inputElem.id].validations,
            inputElem.value,
            inputElem.id
          ),
        });
    }
  };
  const checkingUniqueValue=(name)=>{
    name=="userName"?
    showLoginToast('این نام‌کاربری قبلا در سایت ثبت شده')
    :name=="email"?
    showLoginToast('این ایمیل قبلا در سایت ثبت شده')
    :showLoginToast('این شماره موبایل قبلا در سایت ثبت شده')
  }
  const addNewUserFetch = (userObj) => {
    const newUser = {
      nickName: userObj.name.value,
      userName: userObj.username.value,
      password: userObj.password.value,
      phoneNumber: +(userObj.phone.value),
      email: userObj.email.value
    };
    fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      }
    ).then((res) => res.json())
    .then((data)=>{
      if(!data.id )
       checkingUniqueValue(data.errorData.columnName)
    else{
      AuthContext.login(data)
      navigate('/')
    }
    })
  };
  return (
    <>
      <form
        className="login-box-form"
        onSubmit={(e) => {
          formSubmitHand(e);
        }}
      >
        <LoginInput
          {...{
            inputIcon: <RiUserSmileLine />,
            inputType: "text",
            inputPlaceHolder: "نام خود را وارد کنید",
            inputLegend: "نام و نام‌خانوادگی",
            inputExtra: "",
            id: "name",
          }}
        />
        <LoginInput
          {...{
            inputIcon: <RiUserSmileLine />,
            inputType: "text",
            inputPlaceHolder: "نام کاربری را وارد کنید",
            inputLegend: "نام کاربری",
            inputExtra: "",
            id: "username",
          }}
        />
        <LoginInput
          {...{
            inputIcon: <MdAlternateEmail />,
            inputType: "text",
            inputPlaceHolder: "آدرس ایمیل خود را وارد کنید",
            inputLegend: "پست الکترونیک",
            inputExtra: "",
            id: "email",
          }}
        />
        <LoginInput
          {...{
            inputIcon: <MdPhoneIphone />,
            inputType: "text",
            inputPlaceHolder: "شماره همراه خود را وارد کنید",
            inputLegend: "شماره موبایل",
            inputExtra: "",
            id: "phone",
          }}
        />

        <LoginInput
          {...{
            inputIcon: <RiDoorLockLine />,
            inputType: "password",
            inputPlaceHolder: "رمز‌عبور را وارد کنید",
            inputLegend: "رمز‌عبور",
            inputExtra: "eyeIcon",
            id: "password",
          }}
        />
        <LoginInput
          {...{
            inputIcon: <RiDoorLockLine />,
            inputType: "password",
            inputPlaceHolder: "مجددا رمز‌عبور را وارد کنید",
            inputLegend: "تکرار رمز‌عبور",
            inputExtra: "eyeIcon",
            id: "checkPassword",
          }}
        />
        <button className={"login-box-btns login-form-submit-btn"}>
          <span className="login-box-btns-title">عضویت در آوا مووی</span>
          <FaArrowLeft className="login-box-btns-icon" />
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
