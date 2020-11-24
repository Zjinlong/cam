
   const isuser= e => {
        return  /^[_0-9a-zA-Z\_]{3,18}$/.test(e)
    }
   const ispass = e =>{
       return  /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[_\-!@#$%^&*()=])[a-zA-Z0-9_\-!@#$%^&*()=]{6,18}$/.test(e)
    // return /^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}/.test(e)
   }
   const isemail = e =>{
       return  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(e)
   }
   const isphone = e =>{
    return  /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e)
}
   
  
export {
    isuser,
    ispass,
    isemail,
    isphone
}