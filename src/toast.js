import { Slide, toast } from 'react-toastify';


const showLoginToast=(title)=>{  
  toast.error(title,{
    theme:"colored",
    autoClose:3000,
    position:"bottom-left",
    pauseOnHover:false,
    icon:false,
    closeButton:false,
    className:"login-toast error-toast",
    transition:Slide,
  })}
const showSuccessToast=(title)=>{  
  toast.success(title,{
    theme:"colored",
    autoClose:3000,
    position:"bottom-left",
    pauseOnHover:false,
    icon:false,
    closeButton:false,
    className:"login-toast success-toast",
    transition:Slide,
  })}
const showWarningToast=(title)=>{  
  toast.warning(title,{
    theme:"colored",
    autoClose:3000,
    position:"bottom-left",
    pauseOnHover:false,
    icon:false,
    closeButton:false,
    className:"login-toast warning-toast",
    transition:Slide,
  })}

  export {showLoginToast,showSuccessToast,showWarningToast}


  // if(year(now())-year(created)>0,year(now())-year(created),if(month(now())-month(created)>0,month(now())-month(created),DAYOFMONTH(now())-DAYOFMONTH(created)))