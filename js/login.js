const elForm=document.querySelector(".login__form");
const elEmailInput=document.querySelector(".input__email");
const elPasswordInput=document.querySelector(".input__password");


elForm.addEventListener("submit",(evt)=>{
    evt.preventDefault()

    const emailInput=elEmailInput.value.trim();
    const passwordInput=elEmailInput.value.trim();

    fetch("https://reqres.in/api/login",{
     method:"POST",
     headers:{
         "Content-Type":'application/json',
     },
     body:JSON.stringify({
         email:emailInput,
         password:passwordInput,
     })
 }).then((response)=>response.json())
 .then((data)=>{
     if(data?.token){
         window.localStorage.setItem("token",data.token)
         window.location.replace("index.html")
     }
 })
});

