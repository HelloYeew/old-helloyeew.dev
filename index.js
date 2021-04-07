let WaveIn = new Audio("assets/sound/enter.wav");
let WaveOut = new Audio("assets/sound/back.wav");
let Hover = new Audio("assets/sound/hover.wav");
let Select = new Audio("assets/sound/select.wav");
let Welcome = new Audio("assets/sound/welcome.wav");
let SettingIn = new Audio("assets/sound/settings-in.wav");
let SettingOnClick = new Audio("assets/sound/settings-noclick.wav");
let SettingSelect = new Audio("assets/sound/settings-select.wav");

let openWork = false;
let openContact = false;
let openAbout = false;
let openSetting = false;

// TODO: Add variable to support the setting button afloat and not occur the other button event

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
    sayWelcome()
}

function showabout(){
    WaveIn.play();
    openAbout = true;
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    WaveOut.play();
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    WaveIn.play();
    openWork = true;
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    WaveOut.play();
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    WaveIn.play();
    openContact = true;
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    WaveOut.play();
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

// Mouse over sound
function mouseOver() {
    Hover.play();
}

function mouseSelect() {
    Select.play();
}

function sayWelcome() {
    Welcome.play();
}

function settingMouseOver() {
    SettingOnClick.play();
}

function settingSelect() {
    SettingSelect.play();
}

document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;

    if (keyName === 27 && openWork === true) {
        closework();
        openWork = false;
    } else if (keyName === 27 && openContact === true) {
        closecontact();
        openContact = false;
    } else if (keyName === 27 && openAbout === true) {
        closeabout();
        openAbout = false;
    } else if (keyName === 27 && openSetting === true) {
        closesetting()
        openSetting = false;
    }
}, false);

function changeBackground(filename) {
    settingSelect();
    document.body.style.background = 'linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("assets/background/' + filename + '") center center';
}