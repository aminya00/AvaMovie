const emailRegex=(text)=>{
    const regex=/^([a-z0-9]+(\.?)[a-z0-9]+@[a-z]+\.[a-z]{2,3}$)/gi
    return regex.test(text)
}

const phoneNumberRegex=(number)=>{
    const regex=/^09[0-9]{9}$/g
    return regex.test(number)
}

export {emailRegex,phoneNumberRegex}

