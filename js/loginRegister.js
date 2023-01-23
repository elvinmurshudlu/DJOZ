let loginBtn = document.querySelector("#loginBtn")
let registerBtn = document.querySelector("#registerBtn")
let loginForm = document.querySelector(".login")
let registerForm = document.querySelector(".register")
let loginEmail = document.getElementById("loginEmail")
let loginPasswd = document.getElementById("loginPasswd")

let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")

let isLogged = localStorage.getItem("isLogged")
let loggedAccoundID = localStorage.getItem("loggedAccoundID")


let registeredAccountsJSON = localStorage.getItem("registeredAccounts")
let registeredMailsJSON = localStorage.getItem("registeredMails")



// let account = {
//     username:"elvin@gmail.com",
//     password:123456
// }
// let string = `Default mail: ${account.username} and default passwd: ${account.password}` 

// alert(string)
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
// window.addEventListener("scroll",()=>{
//     if(window.scrollY>200){
//         navbar.style.backgroundColor = "#5219a2"
//     }else{
//         navbar.style.backgroundColor = "#5219a2b4"

//     }
// })

function loginRegister(event){
    console.log(event.id)
    if(event.id =="loginBtn"){
        loginBtn.classList.add("buttonFocused")
        registerBtn.classList.remove("buttonFocused")
        registerForm.classList.add("hidden")
        loginForm.classList.remove("hidden")
    }else if(event.id == "registerBtn"){
        loginBtn.classList.remove("buttonFocused")
        registerBtn.classList.add("buttonFocused")

        registerForm.classList.remove("hidden")
        loginForm.classList.add("hidden")
    }
}
function invalidElement(element,condition=true,msg="daxil edilməyib!"){
    if(condition){
        element.style.border = "2px solid red"
        if(element.labels[0]){
            element.labels[0].innerHTML = `${element.placeholder} ${msg} `
        }
    }
    
    else{
        element.style.border = "0"
        element.labels[0].innerHTML = ""

    }
    
}


function formSubmit(form,registerRequest = false){
    let correctEmailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/    
    // let elements = form.childNodes
    let elements = form.querySelectorAll(`.${form.classList[0]} *`)
    let isFirstPasswordSelected = false
    let firstPassword
    let result = true
    for(let a = 0;a<elements.length -1;a++){
        let element = elements[a]
        if(element.tagName =="INPUT" && element.type !="submit" && element.type !="checkbox" ){
            if(element.classList.contains("email")){
                if(!correctEmailRE.test(element.value)){
                    invalidElement(element)
                    result = false
                    // return false
                    
                }else{
                    invalidElement(element,false)
                }
            }
            else if(element.type !="password" && element.value.trim() ==""){
                // console.log("Xana bosdur")
                invalidElement(element)
                result = false
                // return false




            }else if(element.type =="password" && element.value ==""){
                // console.log("Password yazilmadi")
                invalidElement(element)
                result = false
                // return false

            }else{
                invalidElement(element,false)
            }

        }else if(element.tagName =="INPUT" && element.type =="checkbox"){
            if(!element.checked){
                result = false
                document.querySelector(".terms").style.color = "red"
                
            }else{
                document.querySelector(".terms").style.color = "black"

            }
        }
    }
    if(registerRequest){
        for(let a =0;a<elements.length-1;a++){
            let element = elements[a]
            if(element.type == "password"){
                if(isFirstPasswordSelected){
                    if(element.value !=firstPassword){

                        // console.log("Sifreler ferqlidir")
                        invalidElement(element)
                        element.labels[0].innerHTML = `${element.placeholder} yanlış daxil edilib`

                        result = false
                        // return false
                        
                    }
                }
                firstPassword = element.value
                isFirstPasswordSelected = true
            }
        }
    }
    
    return result
    // return true
}



loginBtn.addEventListener("click",()=>loginRegister(loginBtn))
registerBtn.addEventListener("click",()=>loginRegister(registerBtn))

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

let emailAddress = document.querySelector("#loginEmail")
let passwd = document.querySelector("#loginPasswd")

function loginSubmit(){
    
    let result = true   
    emailChecker(emailAddress,result)
    
    if(passwd.value == ""){
        invalidElement(passwd)
        result = false
    }else{
        invalidElement(passwd,false)
    }

    if(result){
        let mailData = JSON.parse(registeredMailsJSON)
        let accountsData = JSON.parse(registeredAccountsJSON)
        if(mailData.includes(emailAddress.value)){
            let accountİd = mailData.indexOf(emailAddress.value)
            let targetAccount = accountsData[accountİd]
            if(targetAccount.password == passwd.value){
                localStorage.setItem("isLogged","true")
                localStorage.setItem("loggedAccoundID",accountİd)
                loginForm.setAttribute("action","./index.html")
            }else{
                invalidElement(passwd,true,"sehvdir")
            }


        }else{
            result = false
            invalidElement(emailAddress,true,"qeydiyyatdan keçməyib!")
        }
    }

    // return result
    return true

}

let registerName = document.querySelector("#nameRegister")
let registerSurName = document.querySelector("#surnameRegister")
let registerEmail = document.querySelector("#emailRegister")
let registerPasswd = document.querySelector("#passwdRegister")
let confirmPasswd = document.querySelector("#repasswdRegister")
let terms = document.querySelector("#checkbox")

    

function registerSubmit(){
    registeredAccountsJSON = localStorage.getItem("registeredAccounts")
    registeredMailsJSON = localStorage.getItem("registeredMails")
    let registeredAccounts = JSON.parse(registeredAccountsJSON)                  
    let registeredMails = JSON.parse(registeredMailsJSON)
    let alreadyRegistered 
    if(registeredMails!=null){
        alreadyRegistered = registeredMails.includes(registerEmail.value)
    }

    // console.log("EMAIL DATA",registeredMails,"Registered email",registerEmail.value)
    
    let result = true
    emailChecker(registerEmail,result)

    if(registerName.value ==""){
        result = false
        invalidElement(registerName)
    }else{
        invalidElement(registerName,false)
    }
    if(registerSurName.value ==""){
        result = false
        invalidElement(registerSurName)
    }else{
        invalidElement(registerSurName,false)
    }
    if(registerPasswd.value==""){
        result = false
        invalidElement(registerPasswd)
    }else{
        invalidElement(registerPasswd,false)
    }if(confirmPasswd.value == ""|| confirmPasswd.value != registerPasswd.value){
        invalidElement(confirmPasswd)
        result = false
    }else{
        invalidElement(confirmPasswd,false)

    }if(!terms.checked){
        result = false
                document.querySelector(".terms").style.color = "red"
    }else{
        document.querySelector(".terms").style.color = "black"

    }
    // console.log(alreadyRegistered)
    if(alreadyRegistered){
        result = false
        invalidElement(registerEmail,true,"artıq istifadə edilib")
    }
    
    if(result){
        


        if(registeredAccounts!=null ){
            let accounts = registeredAccounts
            localStorageRegister(accounts,registeredMails)
            // let account = {}                            /////////////
            // account.id = accounts.length            
            // account.name = registerName.value
            // account.surname = registerSurName.value
            // account.email = registerEmail.value
            // account.password = registerPasswd.value
            // accounts.push(account)
            // registeredMails.push(registerEmail.value)

            // localStorage.setItem("registeredAccounts",JSON.stringify(accounts))
            // localStorage.setItem("registeredMails",JSON.stringify(registeredMails))////////////
        }else{
            let accounts = []
            let registeredEmails = []
            localStorageRegister(accounts,registeredEmails)
            // let account = {}
            
            // account.id = 1           
            // account.name = registerName.value
            // account.surname = registerSurName.value
            // account.email = registerEmail.value
            // account.password = registerPasswd.value
            // accounts.push(account)
            // registeredEmails.push(registerEmail.value)

            // localStorage.setItem("registeredAccounts",JSON.stringify(accounts))
            // localStorage.setItem("registeredMails",JSON.stringify(registeredEmails))
        }


    }

    // return false
    return result

}

function localStorageRegister(accounts,emails){
            let account = {}                            /////////////
            account.id = accounts.length            
            account.name = registerName.value
            account.surname = registerSurName.value
            account.email = registerEmail.value
            account.password = registerPasswd.value
            accounts.push(account)
            emails.push(registerEmail.value)
            localStorage.setItem("registeredAccounts",JSON.stringify(accounts))
            localStorage.setItem("registeredMails",JSON.stringify(emails))
}


loginForm.onsubmit = ()=>{    
    
    return loginSubmit()
    
    
}





registerForm.onsubmit = ()=>{  
     
    return registerSubmit()


}