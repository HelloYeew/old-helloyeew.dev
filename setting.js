// Get the video
var video = document.getElementById("videoBackground");
var source = document.createElement('source');

video.appendChild(source);

source.setAttribute('src', 'assets/background/ano-yume.mp4');

// Get the button
var btn = document.getElementById("videoButton");
var mode_btn = document.getElementById("videoModeButton");
var background_button = document.getElementById("background-setting");
var playing_text = document.getElementById("now-playing");

let ConfirmSelection = new Audio("assets/sound/confirm-selection.wav");
let ScratchDisc = new Audio("assets/sound/scratch-disc.wav");
let VideoControl = new Audio("assets/sound/video-control.wav");

function videoFunction() {
    videoControl();
    if (videoMode === false && video.paused) {
        removeBackground()
        hideBackgroundButton()
        document.getElementById("warning-background").innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in video mode. Please change to normal mode first.";
        video.style.opacity = '0.5';
        videoMode = true;
    }
    if (video.paused) {
        video.play();
        // btn.innerHTML = "<i class=\"fas fa-pause\"></i>";
        document.getElementById("setting-play").innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-pause"></i></button>'
    } else {
        video.pause();
        // btn.innerHTML = "<i class=\"fas fa-play\"></i>";
        document.getElementById("setting-play").innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>'
    }
}

function changeMode() {
    if (videoMode === true) {
        currentMode = 'normal';
        scratchDisc();
        videoMode = false;
        video.style.opacity = '0';
        changeBackground(currentBackground)
        playing_text.innerHTML = "Now Playing : None"
        mode_btn.innerHTML = "Video Mode"
        document.getElementById("warning-background").innerHTML = "";
        if (video.play) {
            video.pause();
        }
        showBackgroundButton()
        hideVideoButton()
        document.getElementById("warning-video").innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in normal mode. Please change to video mode first.";
        background_button.disabled = false;
        changeKeyboardShortcutText("normal")
    } else {
        currentMode = 'video';
        scratchDisc();
        removeBackground();
        nowPlayingText()
        video.style.opacity = '0.4';
        mode_btn.innerHTML = "Normal Mode"
        video.play();
        background_button.disabled = true;
        videoMode = true;
        document.getElementById("warning-background").innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in video mode. Please change to normal mode first.";
        document.getElementById("warning-video").innerHTML = "";
        hideBackgroundButton()
        showVideoButton()
        if (video.muted) {
            document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>';
        } else {
            document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
        }
        changeKeyboardShortcutText("video")
    }
}

function videoSound() {
    videoControl();
    if (video.muted) {
        video.muted = false;
        // mute_button.innerHTML = '<i class="fas fa-volume-up"></i>'
        document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>'
    } else {
        video.muted = true;
        // mute_button.innerHTML = '<i class="fas fa-volume-mute"></i>'
        document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>'
    }
}

function hideBackgroundButton() {
    background_button.innerHTML = "";
}

function showBackgroundButton() {
    background_button.innerHTML =
        "<h3>Click to change a background</h3>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('yourname.png')>Your Name</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('yourname.gif')>Your Name (GIF)</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('snow_miku.jpeg')>Snow Miku</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('snow_mountain.jpeg')>Snow Mountain</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('firework_festival_girl.jpg')>Firework Festival Girl</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('hanabi.jpeg')>Fireworks (Anime)</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('firework.jpeg')>Firework</button>\n" +
        "<button class=\"btn_one background-setting\" onmouseover=settingMouseOver() onclick=changeBackground('sword-art-online.png')>Sword Art Online</button>"
}

function hideVideoButton() {
    document.getElementById("now-playing").innerHTML = ""
    document.getElementById("setting-play").innerHTML = ''
    document.getElementById("setting-mute").innerHTML = ''
    document.getElementById("video-setting-text").innerHTML = ''
    document.getElementById("video-change").innerHTML = ""
    document.getElementById("age-notice").innerHTML = ""
}

function showVideoButton() {
    document.getElementById("now-playing").innerHTML = "Now Playing : None"
    document.getElementById("setting-play").innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>'
    document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>'
    document.getElementById("video-setting-text").innerHTML = 'Click to change video'
    document.getElementById("video-change").innerHTML = "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('ano-yume.mp4')>あの夢をなぞって</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('jumping-heart.mp4')>青空Jumping Heart (OP)</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('mopemope.mp4')>もぺもぺ</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('alicization.mp4')>ADAMAS (OP)</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('umaru.mp4')>かくしん的☆めたまるふぉ～ぜっ！(OP)</button>"
    if (currentVideo === "mopemope.mp4") {
        document.getElementById("age-notice").innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    }
    nowPlayingText()
}

function changeVideo(filename) {
    confirmSelection()
    video.pause();
    currentVideo = filename;
    source.setAttribute('src', 'assets/background/' + filename);
    nowPlayingText()
    video.load();
    video.play();
    if (currentVideo === "mopemope.mp4") {
        document.getElementById("age-notice").innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    }
}

function nowPlayingText() {
    if (currentVideo === 'ano-yume.mp4') {
        playing_text.innerHTML = "Now Playing : あの夢をなぞって"
    } else if (currentVideo === 'jumping-heart.mp4') {
        playing_text.innerHTML = "Now Playing : 青空Jumping Heart (OP)"
    } else if (currentVideo === 'mopemope.mp4') {
        playing_text.innerHTML = "Now Playing : もぺもぺ"
    } else if (currentVideo === "alicization.mp4") {
        playing_text.innerHTML = "Now Playing : ADAMAS (OP)"
    } else if (currentVideo === 'umaru.mp4') {
        playing_text.innerHTML = "Now Playing : かくしん的☆めたまるふぉ～ぜっ！(OP)"
    } else {
        playing_text.innerHTML = "null"
    }
    if (currentVideo === 'mopemope.mp4') {
        document.getElementById("age-notice").innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    } else {
        document.getElementById("age-notice").innerHTML = ''
    }
}

function confirmSelection() {
    ConfirmSelection.play();
}

function scratchDisc() {
    ScratchDisc.play();
}

function videoControl() {
    VideoControl.play();
}

function changeKeyboardShortcutText(mode) {
    if (mode === "normal") {
        document.getElementById("keyboard-shortcut").innerHTML = '<h3>Esc - Close any box</h3>\n' +
            '                <h3>Q - Change mode between normal and video mode</h3>\n'
    } else if (mode === "video") {
        document.getElementById("keyboard-shortcut").innerHTML = '<h3>Esc - Close any box</h3>\n' +
            '                <h3>Q - Change mode between normal and video mode</h3>\n' +
            '                <h3>P - Play or pause the video</h3>\n' +
            '                <h3>M - Mute or unmute the video</h3>'
    }
}

video.addEventListener('play', event => {
    if (currentMode === 'video') {
        document.getElementById("setting-play").innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-pause"></i></button>';
    }
    videoPlaying = true;
});
video.addEventListener('pause', event => {
    if (currentMode === 'video') {
        document.getElementById("setting-play").innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>';
    }
    videoPlaying = false;
});
video.addEventListener('muted', event => {
    document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
});

document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;

    // press p to play or pause

    if (keyName === 80 && videoPlaying === true && videoMode === true) {
        video.pause();
        videoControl();
    } else if (keyName === 80 && videoPlaying === false && videoMode === true) {
        video.play();
        videoControl();
    }

    // press m to muted

    if (keyName === 77 && video.muted && videoMode === true) {
        console.log("if (keyName === 77 && video.muted) in setting.js")
        video.muted = false;
        document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
        videoControl();
    } else if (keyName === 77 && video.muted === false && videoMode === true) {
        console.log("else if (keyName === 77 && video.muted === false) in setting.js")
        video.muted = true;
        document.getElementById("setting-mute").innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>';
        videoControl();
    }

    // press q to change mode

    if (keyName === 81) {
        changeMode();
    }

}, false);