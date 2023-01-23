let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")

let loggedAccoundID = localStorage.getItem("loggedAccoundID")

let registeredAccountsJSON = localStorage.getItem("registeredAccounts")
let registeredAccounts = JSON.parse(registeredAccountsJSON)

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


let authorName = document.querySelector(".author")
let songName = document.querySelector(".song")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b55fbc228cmsh6bcd7c3456eb9dfp1b041fjsn76a603594717',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

async function  getMusicDetail(){
    let songs 
    let response = await fetch('https://shazam.p.rapidapi.com/artists/get-summary?id=1116295799&l=en-US', options)
    let data = await response.json()
    songs =Object.keys(data.resources.songs) 
    
    let responseSong = await fetch(`https://shazam.p.rapidapi.com/songs/v2/get-details?id=${songs[7]}&l=en-US`, options)
    let dataSong = await responseSong.json()

    let songDetails = dataSong.data[0].attributes
    console.log(songDetails)
    authorName.innerHTML = songDetails.artistName
    songName.innerHTML = songDetails.albumName
}
getMusicDetail()
