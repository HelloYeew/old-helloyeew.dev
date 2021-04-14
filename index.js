// Sound variable

let WaveIn = new Audio("assets/sound/enter.wav");
let WaveOut = new Audio("assets/sound/back.wav");
let Hover = new Audio("assets/sound/hover.wav");
let Select = new Audio("assets/sound/select.wav");
let Welcome = new Audio("assets/sound/welcome.wav");
let SettingIn = new Audio("assets/sound/settings-in.wav");
let SettingOnClick = new Audio("assets/sound/settings-noclick.wav");
let SettingSelect = new Audio("assets/sound/settings-select.wav");
let Error = new Audio("assets/sound/error.wav");
let NowPlaying = new Audio("assets/sound/now-playing.wav");
let ConfirmSelection = new Audio("assets/sound/confirm-selection.wav");
let ScratchDisc = new Audio("assets/sound/scratch-disc.wav");
let VideoControl = new Audio("assets/sound/video-control.wav");
let InPageHover = new Audio("assets/sound/in-page-hover.wav");
let InPageSelect = new Audio("assets/sound/in-page-select.wav");

let openWork = false;
let openContact = false;
let openAbout = false;
let openSetting = false;
let currentBackground = 'yourname.gif'; // This variable must be same as default background
let currentVideo = 'ano-yume.mp4'; // This variable must be same as default video
let currentMode = 'normal';
let videoMode = false;
let videoPlaying = false;

// TODO: Add video time on player
// TODO: Change color

const soundFileUrls = [
    'assets/enter.wav',
    'assets/back.wav',
    'assets/hover.wav',
    'assets/select.wav',
    'assets/welcome.wav'
];

// Sound pre-cache for better experience in website
window.caches.open('sound-pre-cache')
    .then(cache => Promise.all(soundFileUrls.map(soundFileUrl => fetchAndCache(soundFileUrl, cache))));

function fetchAndCache(soundFileUrl, cache) {
    // Check first if video is in the cache.
    return cache.match(soundFileUrl)
        .then(cacheResponse => {
            // Let's return cached response if video is already in the cache.
            if (cacheResponse) {
                return cacheResponse;
            }
            // Otherwise, fetch the video from the network.
            return fetch(soundFileUrl)
                .then(networkResponse => {
                    // Add the response to the cache and return network response in parallel.
                    cache.put(soundFileUrl, networkResponse.clone());
                    return networkResponse;
                });
        });
}

function showabout(){
    console.log("showabout() [index.js]")
    console.log("-------")
    WaveIn.play();
    openAbout = true;
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    console.log("closeabout() [index.js]")
    console.log("-------")
    WaveOut.play();
    openAbout = false;
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    console.log("showwork() [index.js]")
    console.log("-------")
    WaveIn.play();
    openWork = true;
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    console.log("closework() [index.js]")
    console.log("-------")
    WaveOut.play();
    openWork = false;
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    console.log("showcontact() [index.js]")
    console.log("-------")
    WaveIn.play();
    openContact = true;
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    console.log("closecontact() [index.js]")
    console.log("-------")
    WaveOut.play();
    openContact = false;
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
      $("#setting").removeClass("animated fadeIn");
    },1000);
},1500);

// Sound effect function
function mouseOver() {
    console.log("- mouseOver() [index.js]")
    Hover.play();
}

function mouseSelect() {
    console.log("- mouseSelect() [index.js]")
    Select.play();
}

function sayWelcome() {
    console.log("- sayWelcome() [index.js]")
    Welcome.play();
}

function settingMouseOver() {
    console.log("- settingMouseOver() [index.js]")
    SettingOnClick.play();
}

function settingSelect() {
    console.log("- settingSelect() [index.js]")
    SettingSelect.play();
}

function errorSound() {
    console.log("- errorSound() [index.js]")
    Error.play();
}

function nowPlayingSound() {
    console.log("- nowPlayingSound() [index.js]")
    NowPlaying.play();
}

function confirmSelection() {
    console.log("- confirmSelection() [index.js]")
    ConfirmSelection.play();
}

function scratchDisc() {
    console.log("- scratchDisc() [index.js]")
    ScratchDisc.play();
}

function videoControl() {
    console.log("- videoControl() [index.js]")
    VideoControl.play();
}

function changeBackground(filename) {
    console.log("changeBackground(" + filename + ") [index.js]")
    if (videoMode === true) {
        errorSound();
        document.body.style.background = 'linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("assets/background/black.svg") center center';
    } else {
        settingSelect();
        document.body.style.background = 'linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("assets/background/' + filename + '") center center';
        currentBackground = filename;
    }
    // TODO: Support if we don't have that file (This support typo or if someone play something with JS in console)
    console.log("-------")
}

function removeBackground() {
    console.log("removeBackground() [index.js]")
    settingSelect();
    document.body.style.background = 'linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("assets/background/black.svg") center center';
}

document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;

    // Press ESC to close container

    if (keyName === 27 && openWork === true) {
        console.log("% close windows from keydown ESC [index.js]");
        closework();
        openWork = false;
    } else if (keyName === 27 && openContact === true) {
        console.log("% close windows from keydown ESC [index.js]");
        closecontact();
        openContact = false;
    } else if (keyName === 27 && openAbout === true) {
        console.log("% close windows from keydown ESC [index.js]");
        closeabout();
        openAbout = false;
    } else if (keyName === 27 && openSetting === true) {
        console.log("% close windows from keydown ESC [index.js]");
        closesetting()
        openSetting = false;
    }
}, false);

// Function set so you can open only 1 real windows

function checkAndOpen(target_windows) {
    if (openWork === false && openContact === false && openAbout === false && openSetting === false) {
        console.log("(openWork === false && openContact === false && openAbout === false && openSetting === false) => Open " + target_windows)
        console.log("-------")
        if (target_windows === "work") {
            showwork();
        } else if (target_windows === "contact") {
            showcontact();
        } else if (target_windows === "about") {
            showabout();
        } else if (target_windows === "setting") {
            showsetting();
        }
    } else if (openSetting === true) {
        // This condition is specific for setting button that can click to both close and open setting windows
        console.log("(openWork === false && openContact === false && openAbout === false && openSetting === true) => Close setting by its function (target_windows = " + target_windows + ")")
        showsetting()
    } else {
        console.log("(openWork === " + openWork + " && openContact === " + openContact + " && openAbout === " + openAbout + " && openSetting === " + openSetting + ") => Not open " + target_windows)
        console.log("-------")
    }
}

