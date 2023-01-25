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

let profileBtns = document.querySelectorAll(".profileButtons button")
let profileForms = document.querySelectorAll("[data-formname]")


let oldPasswd = document.querySelector("#oldPasswd")
let newPasswd = document.querySelector("#newPasswd")
let confirmPasswd = document.querySelector("#confirmNewPasswd")

let changePasswdForm = document.querySelector(".changePasswd")

let musicData = (JSON.parse(localStorage.getItem("savedMusicData")))[loggedAccoundID]
let musicDataCategory = Object.keys(musicData)
let totalValuesArr = Object.values(musicData)
let totalValue = 0


let progressBarsNums = document.querySelector(".progressBars-nums")
let progressBarsSection = document.querySelector(".progressBars-bars")
let totalTime = document.querySelector("#totalListenedTme")


profileBtns.forEach((profileBtn)=>{
    profileBtn.addEventListener("click",()=>{
        
        profileForms.forEach((form)=>{
            
            
            if(profileBtn.id == form.dataset.formname){
                form.classList.remove("hidden")
            }else{
                form.classList.add("hidden")
            }
        })
    })
})



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



for(let a of totalValuesArr){
    totalValue += (+a)
}
totalTime.innerText = generateTime(totalValue)

function generateCategory(catagoryName,musicTime,originalTime){
    console.log(musicTime)
    let total = document.createElement("span")
    let category = document.createElement("span")
    let time = document.createElement("span")

    let percentage = document.createElement("span")

    category.classList.add("category")
    time.classList.add("time")
    total.appendChild(category)
    total.appendChild(time)

    category.innerText = catagoryName
    time.innerText = ": " + musicTime

    progressBarsNums.appendChild(total)

    let progressBar = document.createElement("div")
    let bar = document.createElement("div")

    progressBar.classList.add("progressBar")
    bar.classList.add("bar")
    console.log("musicTime",musicTime,"totalTime ",totalTime)
    
    setTimeout(()=>{
        bar.style.width = `${(originalTime/totalValue)*100}% `
        percentage.innerText = `${Math.floor((originalTime/totalValue)*100)}% `
    },100)
    percentage.classList.add("percentage")
    progressBar.appendChild(bar)
    progressBar.appendChild(percentage)
    // progressBarsSection.appendChild(progressBar)
    progressBarsNums.appendChild(progressBar)


}

function generateTime(seconds){

    let minute = Math.floor(seconds/60)
    if(minute<10){
        minute = "0"+ minute
    }
    
    let second = Math.floor(seconds%60)
    if(second<10){
        second = "0"+ second
    }
    return minute + ":" +second

}

console.log(musicData)

function startStatistic(){
    for (let a =0;a<musicDataCategory.length;a++){
        generateCategory(musicDataCategory[a].toUpperCase(),generateTime(musicData[musicDataCategory[a]]),musicData[musicDataCategory[a]])
    }
    
}
startStatistic()

let musicBox = document.querySelector(".musicBox")
let likedMusicData = JSON.parse(localStorage.getItem("likedMusic"))
let likedMusic
let addLike = false
if(likedMusicData !=null){
    likedMusic = likedMusicData[loggedAccoundID]
    if(likedMusic.length ==0){
        addLike = false
    }else{
        addLike = true
    }
}

let music = [

    
    {
        musicName:"Marlboro",
        musicAuthor:"Miyagi",
        musicSrc:"./music/Miyagi - Marlboro (Official Audio).mp3",
        type:"rap",
        id:"miyagi"
        ,
        coverImg:"./musicCover/miyagi.jpg"
    },{
        musicName:"Бэйба судьба",
        musicAuthor:"Miyagi",
        musicSrc:"./music/Miyagi & Эндшпиль - Бэйба судьба (Lyric video) Andy Panda.mp3"
        ,type:"rap",
        id:"miyagi"
        ,
        coverImg:"./musicCover/miyagi.jpg"
    },
    {
        musicName:"I got love",
        musicAuthor:"Miyagi",
        musicSrc:"./music/Miyagi & Эндшпиль feat. Рем Дигга - I Got Love (Official Video).mp3"
        ,type:"rap",
        id:"miyagi"
        ,
        coverImg:"./musicCover/miyagi.jpg"
    }
,

    {musicName:"Lose Yourself",
    musicAuthor:"Eminem",
    musicSrc:"./music/Eminem - Lose Yourself [HD].mp3"
    ,type:"rap",
        id:"eminem"
        ,
        coverImg:"./musicCover/eminem.jpg"
    },{
        musicName:"Not Afraid",
        musicAuthor:"Eminem",
        musicSrc:"./music/Eminem - Not Afraid.mp3"
        ,type:"rap",
        id:"eminem"
        ,
        coverImg:"./musicCover/eminem.jpg"
    },
    {
        musicName:"The Real Slim Shady",
        musicAuthor:"Eminem",
        musicSrc:"./music/Eminem - The Real Slim Shady (Official Video - Clean Version).mp3"
        ,type:"rap",
        id:"eminem"
        ,
        coverImg:"./musicCover/eminem.jpg"
    }
,

    {musicName:"Fırtınadayım",
    musicAuthor:"Mabel Matiz",
    musicSrc:"./music/Mabel Matiz - Fırtınadayım.mp3"
    ,type:"love",
        id:"mabelMatiz"
        ,
        coverImg:"./musicCover/mabelmatiz.jpg"

    },{
        musicName:"Gel",
        musicAuthor:"Mabel Matiz",
        musicSrc:"./music/Mabel Matiz - Gel.mp3"
        ,type:"love",
        id:"mabelMatiz"
        ,
        coverImg:"./musicCover/mabelmatiz.jpg"
    },
    {
        musicName:"Öyle kolaysa",
        musicAuthor:"Mabel Matiz",
        musicSrc:"./music/Mabel Matiz - Öyle Kolaysa.mp3"
        ,type:"love",
        id:"mabelMatiz"
        ,
        coverImg:"./musicCover/mabelmatiz.jpg"
    }
,

    {musicName:"Kül",
    musicAuthor:"Cem Adrian",
    musicSrc:"./music/Cem Adrian & Mark Eliyahu - KÜL.mp3"
    ,type:"love",
        id:"cemAdrian"
        ,
        coverImg:"./musicCover/cemadrian.jpg"
    },{
        musicName:"ince Buz üstünde yürüyorum",
        musicAuthor:"Cem Adrian",
        musicSrc:"./music/Cem Adrian & Şebnem Ferah - İnce Buz Üstünde Yürüyorum (Official Audio).mp3"
        ,type:"love",
        id:"cemAdrian"
        ,
        coverImg:"./musicCover/cemadrian.jpg"
    },
    {
        musicName:"Derinlerde",
        musicAuthor:"Cem Adrian",
        musicSrc:"./music/Mark Eliyahu & Cem Adrian - Derinlerde.mp3"
        ,type:"love",
        id:"cemAdrian"
        ,
        coverImg:"./musicCover/cemadrian.jpg"
    }

,

     
    {
        musicName:"Du Hast",
        musicAuthor:"Rammstein",
        musicSrc:"./music/Rammstein - Du Hast (Official Video).mp3"
        ,type:"rock",
        id:"rammstein"
        ,
        coverImg:"./musicCover/rammstein.jpg"
    },{
        musicName:"Links 2 3 4",
        musicAuthor:"Rammstein",
        musicSrc:"./music/Rammstein - Links 2 3 4 (Official Video).mp3"
        ,type:"rock",
        id:"rammstein",
        coverImg:"./musicCover/rammstein.jpg"

    },
    {
        musicName:"Asche zu Asche",
        musicAuthor:"Rammstein",
        musicSrc:"./music/Rammstein - Asche zu Asche (Official Lyric Video).mp3"
        ,type:"rock",
        id:"rammstein",
        coverImg:"./musicCover/rammstein.jpg"
    }, 

]

function generateLikedMusics(artist,song,type,musicSrc,id,coverImg){
    console.log("coverImg",coverImg)

    let music = document.createElement("div")
    let musicImg = document.createElement("div")
    let img = document.createElement("img")
    let musicContent = document.createElement("div")
    let authorName = document.createElement("div")
    let musicName = document.createElement("div")

    music.setAttribute("data-author",artist)
    music.setAttribute("data-music",song)
    music.setAttribute("data-type",type)
    music.setAttribute("data-musicSrc",musicSrc)
    music.setAttribute("data-id",id)
    img.src = coverImg
    console.log("imageSrc",img.src)
    musicImg.appendChild(img)
    music.appendChild(musicImg)
    music.appendChild(musicContent)

    musicContent.appendChild(authorName)
    musicContent.appendChild(musicName)

    authorName.innerText = artist
    musicName.innerText = song

    music.classList.add("music")
    musicImg.classList.add("musicImg")
    musicContent.classList.add("musicContent")          

    
    musicBox.appendChild(music)




}

if(addLike){
    for(let a = 0;a<likedMusic.length;a++){
        let musicOne = music[likedMusic[a]]
        console.log(musicOne)
        
        generateLikedMusics(musicOne.musicAuthor,musicOne.musicName,musicOne.type, musicOne.musicSrc,musicOne.id,musicOne.coverImg)
    }

}


