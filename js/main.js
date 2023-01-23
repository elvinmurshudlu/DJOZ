let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")
let homeSlides = document.querySelectorAll(".slider-main_slides-slide")
let mainMusic = document.querySelector("#mainMusic")
let playButton = document.querySelector(".play")
let musicLists = document.querySelectorAll(".musicLine")
let musicProgressBar = document.querySelector(".progressBar")
let musicProgress = document.querySelector(".musicPlayer_progress")
let musicVolSym = document.querySelector(".fa-volume-up")
let musicVolRange = document.querySelector(".fa-volume-up input")

let mainMusicDurationMinute = document.querySelector(".timer_duration_minute")
let mainMusicDurationSecond = document.querySelector(".timer_duration_second")

let mainMusicCurrentMinute = document.querySelector(".timer_current_minute")
let mainMusicCurrentSecond = document.querySelector(".timer_current_second")

let isClickedVolSym = false

let nextMusic = document.querySelector(".music_controls .fa-step-forward")
let prevMusic = document.querySelector(".music_controls .fa-step-backward")
let isMusicPlaying = false

let isMouseDown = false

let musicName = document.querySelector(".name")
let musicAuthor = document.querySelector(".author")

let monitorSize = 1
let currentSlide = 0
let currentMusic = 0

let mainVideoClose = document.querySelector("#close")
let videoPopUp = document.querySelector(".videoPopUp")

let mainVideo = document.querySelector("#mainVideo")
let isLogged = localStorage.getItem("isLogged")

 //login
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
//


mainVideoClose.addEventListener("click",()=>{
    mainVideo.currentTime = 0
    mainVideo.pause()

    videoPopUp.classList.add("hidden")
})

mainVideoClose.addEventListener("mouseenter",()=>{
    videoPopUp.children[0].style.border = "2px solid red"
})
mainVideoClose.addEventListener("mouseleave",()=>{
    videoPopUp.children[0].style.border = "0"
})

let selectedVideo =0
let videos = document.querySelectorAll(".youtubeFeevVideos")
videos.forEach((video,index)=>{
    video.addEventListener("mouseenter",()=>{
        video.volume = 0
        video.play()
    })
    video.addEventListener("mouseleave",()=>{
        video.currentTime = 0
        document.querySelector(".videoPlay .fa-solid").classList.add("fa-play")
        document.querySelector(".videoPlay .fa-solid").classList.remove("fa-pause")
        video.pause()
    })
    video.addEventListener("click",()=>{
        videoPopUp.classList.remove("hidden")
        loadVideo(video)
        // mainVideo.src = video.src
        selectedVideo = index
    })
})

let videoCurrentTime = document.querySelector(".videoTimeCurrent")
let videoDurationTime = document.querySelector(".videoTimeDuration")

function loadVideo(loadedVideo){
    let targetMinute = videoDurationTime.children[0]
    let targetSecond = videoDurationTime.children[1]
    mainVideo.src = loadedVideo.src
    let minute =  Math.floor(loadedVideo.duration/60)
    let second = Math.floor(loadedVideo.duration%60)
    if(minute<10){
        minute = "0"+minute
    }if(second<10){
        second = "0"+second
    }
    targetMinute.innerText = minute 
    targetSecond.innerText = second


}

// let ideo = document.querySelector("#vid")
// ideo.addEventListener("mouseenter",()=>{
//             ideo.volume = 0
//             ideo.play()
//         })

///test
let ismouseIn = false
let youtubeFeedVideos = document.querySelectorAll(".videos-video")
youtubeFeedVideos.forEach((youtubeFeedVideo)=>{
    
    youtubeFeedVideo.addEventListener("mouseenter",()=>{
        
        ismouseIn = true
    })
    youtubeFeedVideo.addEventListener("mouseleave",()=>{
        youtubeFeedVideo.style.transform = `rotate3d(0,0,0,0)`
        youtubeFeedVideo.style.boxShadow = "0 0 0 0"
    
        ismouseIn = false
    })
    youtubeFeedVideo.addEventListener("mousemove",(e)=>{
        let mousePositionX = e.offsetX
        // let mousePositionY = e.offsetY
    
        let centerXangle = youtubeFeedVideo.offsetWidth/2
        // let centerYangle = youtubeFeedVideo.offsetHeight/2
    
        
    
        let angle
        if(mousePositionX-centerXangle>0){
            angle = (mousePositionX-centerXangle)/10*1.5
            // console.log(angle,"derece",centerXangle,"orta",mousePositionX,"mousePose")
            youtubeFeedVideo.style.transform = `rotate3d(0,1,0,${angle}deg)`
            youtubeFeedVideo.style.boxShadow = "-25px 25px 51px #5c5c5c"
        }
        else if(mousePositionX-centerXangle<0){
            angle = (mousePositionX-centerXangle)/10*1.5
            // console.log(-angle,"derece",centerXangle,"orta",mousePositionX,"mousePose")
            youtubeFeedVideo.style.transform = `rotate3d(0,-1,0,${-angle}deg)`
            youtubeFeedVideo.style.boxShadow = "32px 32px 64px #5c5c5c"
    
        }
        else{
        youtubeFeedVideo.style.transform = `rotate3d(0,0,0,0)`
        youtubeFeedVideo.style.boxShadow = "0 0 0 0"
    
        }
    
        // console.log(mousePositionX,"x")
        // console.log(mousePositionY,"y")
        // console.log(youtubeFeedVideo.offsetWidth,"VideoWidth")
        // console.log(youtubeFeedVideo.offsetHeight,"VideoHeight")
    })
})



//test



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

musicLists.forEach((music)=>{
    let musicName = music.dataset.name
    let musicAuthor = music.dataset.author
    let targetMusicName = music.children[0].children[1].children[0]
    let targetMusicAuthor = music.children[0].children[1].children[1]

    targetMusicName.innerText = musicName
    targetMusicAuthor.innerText = musicAuthor
})


function load(currentMsc=0){
    mainMusic.src= musicLists[currentMsc].dataset.src
    musicName.innerText = musicLists[currentMsc].dataset.name
    musicAuthor.innerText = musicLists[currentMsc].dataset.author
    musicProgressBar.style.width =0
    musicLists.forEach((music,index)=>{
        let social = music.children[1].children[0]

        if(index==currentMsc){
            social.classList.remove("hidden")
            music.style.backgroundColor = "#262037"
        }else{            
            music.style.backgroundColor = "#0F0923"
            social.classList.add("hidden") 

        }
    })
    setTimeout(()=>{
        let minute = Math.floor(mainMusic.duration/60)
        let second = Math.floor(mainMusic.duration%60)
        mainMusicDurationMinute.innerText = minute
        mainMusicDurationSecond.innerText = second
        
    },500)

    
}
load()

musicLists.forEach((music,index)=>{
    music.addEventListener("click",()=>{
        currentMusic = index
        load(currentMusic)
    })
})

window.addEventListener("scroll",()=>{
    if(window.scrollY>200){
        navbar.style.backgroundColor = "#5219a2"
    }else{
        navbar.style.backgroundColor = "#5219a2b4"

    }
})

function nextMusicFunc(){
    currentMusic++
    if(currentMusic>=musicLists.length){
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
            currentMusic=musicLists.length-1
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

    let percentage = +(mainMusic.currentTime) / +(mainMusic.duration)
    musicProgressBar.style.width = `${percentage*100}%`
    if(mainMusic.ended){
        nextMusicFunc()
    }

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

function mobileMenuToggle(){
    // console.log("Worked")
    if(mobileMenu.offsetHeight >0){
        mobileMenu.style.height = "0"

    }else{
        mobileMenu.style.height = "250px"

    }
}
// function changeCurrentSlidePosition(currentSlide,num){
//     return currentSlide = num
// }

function slider(position=0){
    // console.log("funksiyaNum",currentSlide)
    // console.log(homeSlides.length-1,"slideNum")
    if(document.body.offsetWidth<900){
        monitorSize=1
    }else{
        monitorSize=3
    }
    // console.log(monitorSize)
    if(currentSlide > homeSlides.length-monitorSize){
        // console.log("S'rt' girdi")
        currentSlide = 0
        position = currentSlide    
    }
        
        // console.log("Deyisim funksiyas;")


        homeSlides.forEach((slide,index)=>{
            slide.style.transform = `translateX(${((index-position)*108.4)+1}%)`
        
        })
}
slider()

setInterval(()=>{
    // console.log(currentSlide)
    currentSlide ++
    slider(currentSlide)
},3000)


mobileMenuBar.addEventListener("click",mobileMenuToggle)



// console.log()

let videoPlayButton = document.querySelector(".videoPlay")
let videoNext = document.querySelector(".videoNext")
let videoPrev = document.querySelector(".videoPrev")
let nextTime = document.querySelector(".nextTime")
let prevTime = document.querySelector(".prevTime")
let videoProgressBar = document.querySelector(".videoProgressBar")
let videoMovementArea = document.querySelector(".progressVideo")
let areaClicked = false

videoNext.addEventListener("click",()=>{
    selectedVideo++
    if(selectedVideo>=videos.length){
        selectedVideo = 0
    }
    loadVideo(videos[selectedVideo])
})
videoPrev.addEventListener("click",()=>{
    selectedVideo--
    if(selectedVideo<0){
        selectedVideo = videos.length-1
    }
    loadVideo(videos[selectedVideo])
})

function videoPlayPause(){
    if(mainVideo.paused || mainVideo.ended){
        mainVideo.play()
        document.querySelector(".videoPlay .fa-solid").classList.remove("fa-play")
        document.querySelector(".videoPlay .fa-solid").classList.add("fa-pause")
    }else{
        document.querySelector(".videoPlay .fa-solid").classList.add("fa-play")
        document.querySelector(".videoPlay .fa-solid").classList.remove("fa-pause")
        mainVideo.pause()
    }
}

videoPlayButton.addEventListener("click",videoPlayPause)
nextTime.addEventListener("click",()=>{
    mainVideo.currentTime += 15
})
prevTime.addEventListener("click",()=>{
    mainVideo.currentTime -= 15
})

mainVideo.addEventListener("timeupdate",()=>{
    let percentage = (mainVideo.currentTime / mainVideo.duration)*100
    videoProgressBar.style.width = `${percentage}%`
    let minute = Math.floor(mainVideo.currentTime/60)
    let second = Math.floor(mainVideo.currentTime%60)
    if(minute<10){
        minute = "0"+minute
    }
    if(second<10){
        second = "0"+second
    }
    let targetMinute = videoCurrentTime.children[0]
    let targetSecond = videoCurrentTime.children[1]
    targetMinute.innerText = minute
    targetSecond.innerText = second



})

videoMovementArea.addEventListener("mousedown",()=>{
    areaClicked = true
})
videoMovementArea.addEventListener("mouseup",()=>{
    areaClicked = false
})
videoMovementArea.addEventListener("mousemove",(e)=>{
    if(areaClicked){
        let percentage = (e.offsetX/videoMovementArea.offsetWidth)
    mainVideo.currentTime = mainVideo.duration * percentage
    }
})

videoMovementArea.addEventListener("click",(e)=>{
    
        let percentage = (e.offsetX/videoMovementArea.offsetWidth)
    mainVideo.currentTime = mainVideo.duration * percentage
    
})

let endDate = new Date('February 23, 2023');
let daysTime = document.querySelector(".days").children[0]
let hoursTime = document.querySelector(".hours").children[0]
let munitesTime = document.querySelector(".minutes").children[0]
let secondsTime = document.querySelector(".seconds").children[0]


// Make the timer function update every second
setInterval(function(){
  // Calculate the remaining time
  let currentTime = new Date();
  let secondsRemaining = (endDate - currentTime) / 1000;
  let days = Math.floor(secondsRemaining / 86400);
  let hours = Math.floor((secondsRemaining % 86400) / 3600);
  let minutes = Math.floor(((secondsRemaining % 86400) % 3600) / 60);
  let seconds = Math.floor(((secondsRemaining % 86400) % 3600) % 60);
  if(days<10){
    days = "0"+days
  }
  if(hours<10){
    hours = "0"+hours
  }
  if(minutes<10){
    minutes = "0"+minutes
  }
  if(seconds<10){
    seconds = "0"+seconds
  }
  daysTime.innerText = days
  hoursTime.innerText = hours
  munitesTime.innerText = minutes
  secondsTime.innerText = seconds

},1000)

let targetMail = document.querySelector(".targetMail")
let sendmeMailForm = document.querySelector(".sendMeMail")
let correctEmailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 



sendmeMailForm.onsubmit = ()=>{
    if(correctEmailRE.test(targetMail.value)){
        return true
    }
    else{
        // console.log("tar")
        return false
    }
}



// fetch("https://api.ksoft.si/lyrics/artist/1991438/")
// .then((response)=>response.json())
// .then((data)=>console.log(data))



	// .then(response => response.json())
	// .then(response => {
    //     songs = Object.keys(response.resources.songs)
    //     console.log(songs)
    // })
	// .catch(err => console.error(err));


    
// setTimeout(()=>{
//     
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// },3000)

// async function test(){
//     let response = await fetch("https://elvinmurshudlu.github.io/PasswordGenerator/")
// console.log(response)
// }

// test()