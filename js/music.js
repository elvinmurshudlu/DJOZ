let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")

let loggedAccoundID = localStorage.getItem("loggedAccoundID")

let registeredAccountsJSON = localStorage.getItem("registeredAccounts")
let savedMusicDataJson = localStorage.getItem("savedMusicData")
let savedMusicData = JSON.parse(savedMusicDataJson)

let registeredAccounts = JSON.parse(registeredAccountsJSON)

mobileMenuBar.addEventListener("click",mobileMenuToggle)
function mobileMenuToggle(){
    // console.log("Login")
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


// let authorName = document.querySelector(".author")
// let songName = document.querySelector(".song")

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'b55fbc228cmsh6bcd7c3456eb9dfp1b041fjsn76a603594717',
// 		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
// 	}
// };

// async function  getMusicDetail(){
//     let songs 
//     let response = await fetch('https://shazam.p.rapidapi.com/artists/get-summary?id=1116295799&l=en-US', options)
//     let data = await response.json()
//     songs =Object.keys(data.resources.songs) 
    
//     let responseSong = await fetch(`https://shazam.p.rapidapi.com/songs/v2/get-details?id=${songs[7]}&l=en-US`, options)
//     let dataSong = await responseSong.json()

//     let songDetails = dataSong.data[0].attributes
//     console.log(songDetails)
//     authorName.innerHTML = songDetails.artistName
//     songName.innerHTML = songDetails.albumName
// }
// getMusicDetail()
let musicBox = document.querySelector(".musicBox")

function musicGenerate(artist,song,type,musicSrc,id,coverImg){
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

                  ///music DIV style
    // music.style.width = "150px"
    // music.style.height = "200px"
    // music.style.backgroundColor = "red"
    // music.style.borderRadius = "10px"

                    ///musicImg DIV style
    // musicImg.style.width = "100%"
    // musicImg.style.height = "70%"
    
                    ///img style
    // img.style.width =  "100%"
    // img.style.height = "100%"

                     //musicContent style

    // musicContent.style.width = "100%"
    // musicContent.style.height = "30%"
    // musicContent.style.display = "flex"
    // musicContent.style.flexDirection = "column"
    // musicContent.style.alignItems = "center"

    
    musicBox.appendChild(music)




}

// musicGenerate("Miyagi","Marlboro","rap","./music","miyagi","./")
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

let filterBtns = document.querySelectorAll(".filterBtn")
let allMusic 
let playableMusic

for(let a = 0;a<music.length;a++){
    let selectedMusic = music[a]
    musicGenerate(selectedMusic.musicAuthor,selectedMusic.musicName,selectedMusic.type,selectedMusic.musicSrc,selectedMusic.id,selectedMusic.coverImg)
}
allMusic = document.querySelectorAll(".music")

function setPlayableMusic(){
    playableMusic = []
    for(let a = 0;a<allMusic.length;a++){
        if(!allMusic[a].classList.contains("hidden")){
            playableMusic.push(allMusic[a])
        }
    }

    // console.log(playableMusic)
    // console.log(playableMusic)
    playableMusic.forEach((music,index)=>{
        music.onclick = () =>{
            // console.log(index)
            currentMusic = index
            load(currentMusic)
            if(isMusicPlaying){
                mainMusic.play()
            }
        }
    })
    
}
setPlayableMusic()
 


//!MusicPlayer
let mainMusic = document.querySelector("#mainMusic")
let playButton = document.querySelector(".play")

let musicProgressBar = document.querySelector(".progressBar")
let musicProgress = document.querySelector(".musicPlayer_progress")
let musicVolSym = document.querySelector(".fa-volume-up")
let musicVolRange = document.querySelector(".fa-volume-up input")

let mainMusicDurationMinute = document.querySelector(".timer_duration_minute")
let mainMusicDurationSecond = document.querySelector(".timer_duration_second")

let mainMusicCurrentMinute = document.querySelector(".timer_current_minute")
let mainMusicCurrentSecond = document.querySelector(".timer_current_second")
let currentMusic = 0
let isClickedVolSym = false

let nextMusic = document.querySelector(".music_controls .fa-step-forward")
let prevMusic = document.querySelector(".music_controls .fa-step-backward")
let isMusicPlaying = false

let isMouseDown = false

let musicName = document.querySelector(".name")
let musicAuthor = document.querySelector(".author")
let isNotFirstMusic = false

let moreListeningMusicTypeDuration
let moreListenedMusics = {

}


//!MusicPlayer End

musicVolRange.addEventListener("input",()=>{
    // console.log(musicVolRange.value)
    mainMusic.volume = musicVolRange.value/100
})

musicVolSym.addEventListener("click",()=>{
    if(isClickedVolSym){
        isClickedVolSym=false
        musicVolRange.classList.add("hidden")
    }else{
        isClickedVolSym=true
        musicVolRange.classList.remove("hidden")

    }
})

function load(currentMsc=0){

    if(isNotFirstMusic){
        if(isLogged){
            savedMusicDataJson = localStorage.getItem("savedMusicData")
            savedMusicData = JSON.parse(savedMusicDataJson)
            // console.log(savedMusicData[loggedAccoundID])

            if(savedMusicData==null){
                savedMusicData = {}
                moreListenedMusics ={}
            }else{
                if(savedMusicData[loggedAccoundID] == undefined){
                moreListenedMusics ={}

                }else{
                    moreListenedMusics = savedMusicData[loggedAccoundID]

                }
                
            }


            if(moreListenedMusics[mainMusic.dataset.type]>0){
                moreListenedMusics[mainMusic.dataset.type] += moreListeningMusicTypeDuration
                
            }else{
                moreListenedMusics[mainMusic.dataset.type] = moreListeningMusicTypeDuration
            }
            savedMusicData[loggedAccoundID] = moreListenedMusics
            localStorage.setItem("savedMusicData",JSON.stringify(savedMusicData))
        }
    }


    mainMusic.src= playableMusic[currentMsc].dataset.musicsrc
    mainMusic.setAttribute("data-type",playableMusic[currentMsc].dataset.type) 
    musicName.innerText = playableMusic[currentMsc].dataset.music
    musicAuthor.innerText = playableMusic[currentMsc].dataset.author
    musicProgressBar.style.width =0
    isNotFirstMusic = true     
    moreListeningMusicTypeDuration = 0

    
    setTimeout(()=>{
        let minute = Math.floor(mainMusic.duration/60)
        let second = Math.floor(mainMusic.duration%60)
        if(minute<10){
            minute = "0"+minute
        }
        if(second<10){
            second = "0"+second
        }
        mainMusicDurationMinute.innerText = minute
        mainMusicDurationSecond.innerText = second
        
    },500)

    
}
load()

window.addEventListener("scroll",()=>{
    if(window.scrollY>200){
        navbar.style.backgroundColor = "#5219a2"
    }else{
        navbar.style.backgroundColor = "#5219a2b4"

    }
})

function nextMusicFunc(){
    // console.log(moreListeningMusicTypeDuration/60)
    currentMusic++
    if(currentMusic>=playableMusic.length){
        currentMusic=0
    }
    load(currentMusic)
    if(isMusicPlaying){
        playPause()
    }
}
function prevMusicFunc(){
    if(mainMusic.currentTime<10){
        currentMusic--
        if(currentMusic<0){
            currentMusic=playableMusic.length-1
        }
    }

    load(currentMusic)
    if(isMusicPlaying){
        playPause()
    }
}

nextMusic.addEventListener("click",nextMusicFunc)
prevMusic.addEventListener("click",prevMusicFunc)




mainMusic.addEventListener("timeupdate",()=>{    
    moreListeningMusicTypeDuration = mainMusic.currentTime
    let percentage = +(mainMusic.currentTime) / +(mainMusic.duration)
    musicProgressBar.style.width = `${percentage*100}%`
    if(mainMusic.ended){
        
        nextMusicFunc()
    }
         if(isLogged){
            moreListeningMusicTypeDuration = mainMusic.currentTime
         }
        // moreListenedSaver(mainMusic,moreListeningMusicTypeDuration)

        let minute = Math.floor(mainMusic.currentTime/60)
        let second = Math.floor(mainMusic.currentTime%60)
        if(second <10){
            second = "0" + second
        } if(minute <= 0){
            minute = "0" + minute

        }
        mainMusicCurrentMinute.innerText = minute
        mainMusicCurrentSecond.innerText = second
})


musicProgress.addEventListener("mousedown",()=>{
    isMouseDown = true
    

})

musicProgress.addEventListener("mouseup",()=>{
   isMouseDown = false
   

})
musicProgress.addEventListener("mousemove",(e)=>{
    if(isMouseDown){
    let percentage = (e.offsetX / musicProgress.offsetWidth)*100
    mainMusic.currentTime = (mainMusic.duration*percentage)/100
    
    } 
})
musicProgress.addEventListener("click",(e)=>{    
    let percentage = (e.offsetX / musicProgress.offsetWidth)*100
    mainMusic.currentTime = (mainMusic.duration*percentage)/100 
     
})

function moreListenedSaver(mainMusic,data){ 
    // console.log(data)   
    let currentType = mainMusic.dataset.type
    if(data ==0){
        moreListenedMusics[currentType] = data
    }else{
        moreListenedMusics[currentType] =  moreListenedMusics[currentType] + data
    }
    
}


function playPause(){
    let playSym = document.querySelector(`.${playButton.classList[0]} .fa-solid`)
    if(mainMusic.paused){
        mainMusic.play()
        playSym.classList.remove("fa-play")
        playSym.classList.add("fa-pause")
        isMusicPlaying = true

    }else{
        mainMusic.pause()
        playSym.classList.add("fa-play")
        playSym.classList.remove("fa-pause")
        isMusicPlaying = false

    }
}

playButton.addEventListener("click",playPause)


//!Music Functions End




filterBtns.forEach(filterBtn=>{
    filterBtn.addEventListener("click",()=>{        
        if(filterBtn.id =="all"){

            
            allMusic.forEach((music)=>{
                music.classList.remove("hidden")
            })
        }else{        
            
            allMusic.forEach((music)=>{
                // console.log(music.dataset.id)
                if(music.dataset.id!=filterBtn.id){
                    music.classList.add("hidden")
                }else{
                    music.classList.remove("hidden")
                }
            })
        }
        setPlayableMusic()
        filterBtns.forEach((selectedBtn)=>{
            if(selectedBtn.id == filterBtn.id){
                selectedBtn.classList.add("selected")
            }else{
                selectedBtn.classList.remove("selected")
            }
        })
    })
})


