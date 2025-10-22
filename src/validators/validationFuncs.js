import {emailRegex,phoneNumberRegex} from '../regex'

let passwordValue=''
const validationFunc = (validations, inputValue,inputId) => {
  let isValidArr = [];
  validations.forEach(rule => {
    inputId=='password'? passwordValue=inputValue.trim():null    

    if (rule.type == "min") {
      inputValue.trim().length < rule.value && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
    } else if (rule.type == "max") {
      inputValue.trim().length > rule.value && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
    } else if (rule.type == "email") {
       !emailRegex(inputValue.trim()) && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
    }else if (rule.type == "required") {      
        !(inputValue.trim().length) && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
        
    }else if (rule.type == "phoneNumber") {        
      !phoneNumberRegex(inputValue.trim()) && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
    }else if (rule.type == "checkPassword") {        
        (inputValue.trim())!= passwordValue && isValidArr.push({isValid:false,validationErrorText:rule.errorText});
    }
  })
  if (isValidArr.length) {
    
    return isValidArr.reverse()[0];
  }else{
    return {isValid:true,validationErrorText:''}
  } 
};

export default validationFunc;
