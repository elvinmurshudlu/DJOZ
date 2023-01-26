let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")



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
    if(window.scrollY>200){
        // navbar.style.backgroundColor = "#fff"
        navbar.classList.add("scrollNav")
    }else{
        // navbar.style.backgroundColor = "none"
        navbar.classList.remove("scrollNav")

    }
})

let loadingScreen = document.querySelector(".loadingScreen")
setTimeout(()=>{
    loadingScreen.classList.add("hidden")
},2000)


let subsForm = document.querySelector(".subscribeFooter")
let subsEmail = document.querySelector(".subscribeEmail")
subsForm.onsubmit = ()=>{
    return subsFormBtn()
}

function subsFormBtn(){
    let correctEmailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(correctEmailRE.test(subsEmail.value)){
        return true
    }else{
        return false
    }
}