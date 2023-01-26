let navbar = document.querySelector("nav")
let mobileMenuBar = document.querySelector(".mobileMenuBar")
let mobileMenu = document.querySelector(".mobileMenu")

let loggedAccoundID = localStorage.getItem("loggedAccoundID")

let registeredAccountsJSON = localStorage.getItem("registeredAccounts")
let savedMusicDataJson = localStorage.getItem("savedMusicData")
let savedMusicData = JSON.parse(savedMusicDataJson)


let registeredAccounts = JSON.parse(registeredAccountsJSON)
let currentAccount
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
    if(window.scrollY>200){
        // navbar.style.backgroundColor = "#fff"
        navbar.classList.add("scrollNav")
    }else{
        // navbar.style.backgroundColor = "none"
        navbar.classList.remove("scrollNav")

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


let video = document.querySelector(".mainVideo")
let mainVideo = document.querySelector(".video")
let videoControl = document.querySelector(".videoControl")
let progressBar = document.querySelector(".progress_bar")
let progress = document.querySelector(".progress")
let playPauseBtn = document.querySelector(".playPauseBtn")
let volumeBtn = document.querySelector(".volumeBtn")
let videoVolume = document.querySelector(".videoVolume")
let curretTime = document.querySelector(".currentTime")
let durationTime = document.querySelector(".durationTime")
let captureTime = document.querySelector(".capture_time")
let captureVideo = document.querySelector(".capture_video")
let captureVideoScene = document.getElementById("capture_video")
let capture = document.querySelector(".capture")
let videoLists = document.querySelectorAll("[data-src]")
let videoList = document.querySelector(".videoList")
let prevBtn = document.querySelector(".fa-backward")
let nextBtn = document.querySelector(".fa-forward")
let fullScreenBtn = document.querySelector(".fullScreen")
let PiPBtn = document.querySelector(".fa-up-right-and-down-left-from-center")

let mouseLeftBtnClicked = false
let currentVideo = 0
let videoControlDuration = 2000
let videoPlayed = false
let hideControl
let mouseMoveDetect

selectVideo()

function loadVideo(){
    video.src = videoLists[currentVideo].dataset.src
    captureVideoScene.src = videoLists[currentVideo].dataset.src
    setTimeout(()=>{
    durationTime.innerHTML = secondToMinute(video.duration)

    },2000)
}
loadVideo()

function setVolume(volume){
    video.volume = volume
}

function secondToMinute(secondValue){
    let result = []
    let second = Math.floor(secondValue%60)
    if(second<10){
        second = "0"+second
    }
    let minutePart = Math.floor(secondValue/60)
    let hour = Math.floor(minutePart/60)
    let minute = minutePart%60
    if(minute<10){
        minute = "0"+minute
    }
    if(hour<10){
        hour = "0"+hour
    }

    if(hour!=0){
        result.push(hour)
    }
    
        result.push(minute)
    
    
        result.push(second)
    
    return result.join(":")
}



function playPause(){
    if(video.paused || video.ended){
        video.play()
        videoControlHidden()
        videoPlayed = true
        playPauseBtn.classList.remove("fa-play")
        playPauseBtn.classList.add("fa-pause")
        
    }else{
        video.pause()
        videoPlayed = false
        videoControlShow()
        clearTimeout(mouseMoveDetect)
        playPauseBtn.classList.add("fa-play")
        playPauseBtn.classList.remove("fa-pause")


    }
}
function videoControlHidden(videoPaused = true){
    if(videoPaused){
        
    videoControl.classList.remove("showVideoControl")    

    }    
}
function videoControlShow(){
    videoControl.classList.add("showVideoControl")    
    
}

video.addEventListener("click",playPause)



mainVideo.addEventListener("mouseenter",()=>{
    if(!videoPlayed){        
        videoControlShow()
    }
})
mainVideo.addEventListener("mouseleave",()=>{
    if(videoPlayed){
        videoControlHidden()
    }
})

video.addEventListener("timeupdate",()=>{
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    curretTime.innerHTML = secondToMinute(video.currentTime)
    
    
    
})

video.addEventListener("mousemove",()=>{
    if(!video.paused){
        videoControlShow()
        clearTimeout(mouseMoveDetect)
        mouseMoveDetect = setTimeout(()=>videoControlHidden(hideControl),videoControlDuration)
    }
})

progress.addEventListener("mouseenter",()=>{
    hideControl = false
    videoControlShow()
    capture.classList.remove("hidden")
})

progress.addEventListener("mouseleave",()=>{
    hideControl = true   
    capture.classList.add("hidden")

})

playPauseBtn.addEventListener("click",()=>{
    playPause()
    videoControlShow()
})

videoVolume.addEventListener("input",()=>{
    let currentVolume = videoVolume.value/100
    if(videoVolume.value>70){
        volumeBtn.classList.add("fa-volume-high")
        volumeBtn.classList.remove("fa-volume-low")
        volumeBtn.classList.remove("fa-volume-off")
    }
    else if(videoVolume.value>0){
        volumeBtn.classList.remove("fa-volume-high")
        volumeBtn.classList.add("fa-volume-low")
        volumeBtn.classList.remove("fa-volume-off")
    }
    else{
        volumeBtn.classList.remove("fa-volume-high")
        volumeBtn.classList.remove("fa-volume-low")
        volumeBtn.classList.add("fa-volume-off")
    }
    setVolume(currentVolume)
})

function videoSkipMouse(event,find=true){
    let interest = event.offsetX/progress.offsetWidth
    if(find){
        video.currentTime = video.duration*interest

    }
    return interest
}

progress.addEventListener("click",(event)=>videoSkipMouse(event))
progress.addEventListener("mousedown",()=>{
    mouseLeftBtnClicked = true
})

progress.addEventListener("mousemove",(event)=>{
    if(mouseLeftBtnClicked){
        videoSkipMouse(event)
    }
    captureTime.innerHTML = secondToMinute(video.duration*videoSkipMouse(event,false))
    captureVideoScene.currentTime = video.duration*videoSkipMouse(event,false)
    captureMovement(event)

})

function captureMovement(event){
    let captionLeft = event.offsetX-(capture.offsetWidth/2)
    if(captionLeft<0){
        captionLeft=0
    }
    else if(captionLeft>(progress.offsetWidth-capture.offsetWidth)){
        captionLeft = progress.offsetWidth-capture.offsetWidth
    }

    capture.style.left = `${captionLeft}px`  

}

progress.addEventListener("mouseup",()=>{
mouseLeftBtnClicked= false
})


videoList.addEventListener("click",()=>{
    selectVideo()
})

prevBtn.addEventListener("click",()=>{
    currentVideo--
    if(currentVideo<0){
        currentVideo = 0
    }
    loadVideo()
    selectVideo()
})

nextBtn.addEventListener("click",()=>{
    currentVideo++
    if(currentVideo>videoLists.length-1){
        currentVideo = videoLists.length-1
    }
    loadVideo()
    selectVideo()
})

function selectVideo(){
    videoLists.forEach((selectedVideo,index)=>{
        if(index==currentVideo){
            selectedVideo.style.backgroundColor = "rgb(93 114 147)"
        }else if(index != currentVideo){
            console.log(index)
            videoLists[index].style.backgroundColor = "#536580"
    
        }
        selectedVideo.addEventListener("click",()=>{
            currentVideo = index
            selectedVideo.style.backgroundColor = "#21251D"
            loadVideo()
        })
    })
}

document.addEventListener("keydown",(event)=>{
    // if(event.keyCode ==32){
    //     playPause()
    // }
    if(event.keyCode==39){
        console.log("qwert")
        video.currentTime +=10
    }
    if(event.keyCode==37){
        console.log("qwert")
        video.currentTime -=10
    }
})



function fullScreen(){
    video.requestFullscreen()
}
function pictureİnPicture(){
    
    video.requestPictureInPicture()
}

fullScreenBtn.addEventListener("click",fullScreen)
PiPBtn.addEventListener("click",pictureİnPicture)

let comments = document.querySelector(".comments")
let savedComments = JSON.parse(localStorage.getItem("savedComments"))

let savedCommentsDates
let commentImport 
let commentBox = document.querySelector(".commentBox")
let sendComment = document.querySelector(".sendComment")

if(savedComments == null){
    savedComments = {}
    commentImport = false
    
}else{
    commentImport = true
    savedCommentsDates = Object.keys(savedComments)
}

function generateComment(username,time,content){
    let comment = document.createElement("div")
    let commentHeader = document.createElement("div")
    let commentHeaderName = document.createElement("div")
    let commentHeaderTime = document.createElement("div")
    let commentContent = document.createElement("div")

    

    commentHeader.appendChild(commentHeaderName)
    commentHeader.appendChild(commentHeaderTime)
    comment.appendChild(commentHeader)
    comment.appendChild(commentContent)
    comments.appendChild(comment)



    commentHeaderName.innerHTML = username
    commentHeaderTime.innerHTML = time
    commentContent.innerHTML = content
    comment.classList.add("comment")
    commentHeader.classList.add("comment_header")
    commentHeaderName.classList.add("comment_header_name")
    commentHeaderTime.classList.add("comment_header_time")
    commentContent.classList.add("comment_content")





}

// generateComment("Elvin Murshudlu","12:56","salam")

sendComment.addEventListener("click",(e)=>{
    if((commentBox.value).trim() =="" ){
        console.log("Comment yaz;n")
    }else{
        console.log("working")
        savedComments[Date.now()]={"username":registeredAccounts[loggedAccoundID].name + " " + registeredAccounts[loggedAccoundID].surname,"comment":(commentBox.value).trim()} 
        localStorage.setItem("savedComments",JSON.stringify(savedComments))
        let newComment = JSON.parse(localStorage.getItem("savedComments"))
        let keys = Object.keys(newComment)
        let latestComment = newComment[keys[keys.length-1]]

        console.log(latestComment,keys[keys.length-1])
        importCommets(latestComment["username"],keys[keys.length-1],latestComment["comment"])
        commentBox.value =""
    }
})

function commentLoad(){
    console.log(savedComments)
    if(Object.keys(savedComments) ==0){
        savedComments = {}
        commentImport = false
        
    }else{
        commentImport = true
        savedCommentsDates = Object.keys(savedComments)
    }
    console.log(commentImport,"importable")
    if(commentImport){
        savedComments = JSON.parse(localStorage.getItem("savedComments"))
        

        savedCommentsDates = Object.keys(savedComments)
        for(let a of savedCommentsDates){
            let date = a
            let commenttor =  savedComments[a].username
            let msg = savedComments[a].comment
            importCommets(commenttor,date,msg)
        }
    }
}

function importCommets(user,time,msg){
    console.log("Time",time)
        let currentCommentTimeDivided = ((new Date(+time)).toISOString()).split("T")
        let currentCommentTimeYear = currentCommentTimeDivided[0]
        let currentCommentTimeDay = currentCommentTimeDivided[1].split(".")[0]

        let currentCommentTime= currentCommentTimeYear+ " "+ currentCommentTimeDay
        let username = user
        let content = msg
        generateComment(username,currentCommentTime,content)
}

    commentLoad()
 