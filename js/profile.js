let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")

let loggedAccoundID = localStorage.getItem("loggedAccoundID")

let registeredAccountsJSON = localStorage.getItem("registeredAccounts")
let registeredAccounts = JSON.parse(registeredAccountsJSON)

let name = document.querySelector("#name")
let surName = document.querySelector("#surname")
let email = document.querySelector("#email")
let telephone = document.querySelector("#telephone")
let birthday = document.querySelector("#birthday")
let gender = document.querySelector("#gender")

let profileForm = document.querySelector("#profileDetail")

name.value = registeredAccounts[loggedAccoundID].name 
surname.value = registeredAccounts[loggedAccoundID].surname 
email.value = registeredAccounts[loggedAccoundID].email



mobileMenuBar.addEventListener("click",mobileMenuToggle)
function mobileMenuToggle(){
    console.log("Login")
    if(mobileMenu.offsetHeight >0){
        mobileMenu.style.height = "0"

    }else{
        mobileMenu.style.height = "250px"

    }
}

window.addEventListener("scroll",()=>{
    // console.log(window.scrollY)
    if(window.scrollY>40){
        navbar.style.backgroundColor = "#5219a2"
    }else{
        navbar.style.backgroundColor = "#5219a2b4"

    }
})


let isLogged = localStorage.getItem("isLogged")
let signInSignUpS = document.querySelectorAll(".signInSignUp")
let profileS = document.querySelectorAll(".profile")


if(isLogged =="true"){
    // signInSignUp.style.display = "none"
    // profile.style.display = "inline-block"
    signInSignUpS.forEach((signInSignUp)=>{
        signInSignUp.classList.add("hidden")
    })
    profileS.forEach((profile)=>{
        profile.classList.remove("hidden")

    })

}else{
    // profile.style.display = "none"
    // signInSignUp.style.display = "inline-block"
    signInSignUpS.forEach((signInSignUp)=>{
    signInSignUp.classList.remove("hidden")

    })
    profileS.forEach((profile)=>{
        profile.classList.add("hidden")

    })
}

function invalidElement(element,condition=true,msg="daxil edilməyib!"){
    if(condition){
        element.style.border = "2px solid red"
        
        
    }
    
    else{
        element.style.border = "1px solid black"
        

    }
    
}

function emailChecker(emailAddress,result){
    let correctEmailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
    if(correctEmailRE.test(emailAddress.value)){
        invalidElement(emailAddress,false)
        
    }else{
        result = false
        invalidElement(emailAddress)

    }
    return result
}


function accountDetails(){
    let result = true
    let correctPhoneNumber = /^\+994[0-9]{9}$/
    if(name.value == ""){
        
        result = false
        invalidElement(name)
    }else{
        invalidElement(name,false)
    }
    if(surName.value ==""){
        result = false
        invalidElement(surname)
    }else{
        invalidElement(surname,false)

    }
    if(!correctPhoneNumber.test(telephone.value)){
        result = false
        invalidElement(telephone)
    }else{
        invalidElement(telephone,false)

    }if(birthday.value == ""){
        invalidElement(birthday)
    }else{
        invalidElement(birthday,false)
    }
    if(gender.value =="none"){
        invalidElement(gender)
    }else{
        invalidElement(gender,false)
    }


    if(result){
        registeredAccounts[loggedAccoundID].name = name.value
        registeredAccounts[loggedAccoundID].surname = surname.value
        registeredAccounts[loggedAccoundID].birthday = birthday.value
        registeredAccounts[loggedAccoundID].telephone = birthday.telephone
        registeredAccounts[loggedAccoundID].gender = gender.value

        let saveAccounts = JSON.stringify(registeredAccounts)
        localStorage.setItem("registeredAccounts",saveAccounts)
    }


    return false
}


profileForm.onsubmit = ()=>{
    return accountDetails()
}


let oldPasswd = document.querySelector("#oldPasswd")
let newPasswd = document.querySelector("#newPasswd")
let confirmPasswd = document.querySelector("#confirmNewPasswd")

let changePasswdForm = document.querySelector(".changePasswd")

changePasswdForm.onsubmit = ()=>{

    return changePasswd()

}

function changePasswd(){
    let oldPasswdOnData = registeredAccounts[loggedAccoundID].password
    let result = true
    if(oldPasswdOnData !=oldPasswd.value ){
        result = false
        invalidElement(oldPasswd)
        console.log("KohnePasswdYanlisdir")
    }else{
        invalidElement(oldPasswd,false)
    }if(newPasswd.value == oldPasswdOnData){
        result = false
        invalidElement(newPasswd)
    }else{
        invalidElement(newPasswd,false)
    }if(newPasswd.value != confirmPasswd.value){
        result = false
        invalidElement(confirmPasswd)
        console.log("Tekrar sifre yanlistir")
    }else{
        invalidElement(confirmPasswd,false)
    }
    if(result){
        registeredAccounts[loggedAccoundID].password = newPasswd.value
        let savedData = JSON.stringify(registeredAccounts)
        localStorage.setItem("registeredAccounts",savedData)
    }


    return false


}

let logoutForm = document.querySelector("#signoutForm")
function logOut(){
    localStorage.setItem("isLogged","false")
}

logoutForm.onsubmit=()=>{
    logOut()
    logoutForm.setAttribute("action","./index.html") 
}