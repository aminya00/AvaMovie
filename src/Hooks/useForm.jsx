import { useEffect, useState } from "react"
import { useReducer } from "react"

const formValidationHand=(state,action)=>{
    const formIsValidArr=[]
    let loginModalText=''
    const inputs=action.data
    switch (action.type) {
        case "INPUTS":
            for(const input in action.data){
                if(!action.data[input].isValid){
                    formIsValidArr.push(false)
                    loginModalText=inputs[input].errorModalText
                    break;
                }
            }
            if(formIsValidArr.length){
            return(
                {inputs,isFormValid:false,loginModalText}
            )
            }else{
            return(
                {inputs,isFormValid:true,loginModalText:''}
            )
            }


    }
}

function useForm(){
    const [formValidation,dispatch]=useReducer(formValidationHand,{inputs:[],isFormValid:false,loginModalText:''})    
    
        const formGetInputs=(inputs)=>{
            dispatch({type:"INPUTS",data:inputs})
        }
    
    return [formValidation,formGetInputs]
}

export default useForm

