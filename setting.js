// Get the video
let video = document.getElementById("videoBackground");
let source = document.createElement('source');

video.appendChild(source);

// Set a default video route
source.setAttribute('src', 'assets/background/ano-yume.mp4');

// Get the button and text id in setting container
// Change mode button
let mode_button = document.getElementById("videoModeButton");
let current_mode_text = document.getElementById("current_mode")
// Change background setting
let warning_background = document.getElementById("warning-background");
let background_button = document.getElementById("background-setting");
// Video mode setting
let warning_video = document.getElementById("warning-video");
let video_setting_text = document.getElementById("video-setting-text");
let age_notice_text = document.getElementById("age-notice")
let playing_text = document.getElementById("now-playing");
let play_setting = document.getElementById("setting-play");
let mute_setting = document.getElementById("setting-mute");
let keyboard_shortcut_text = document.getElementById("keyboard-shortcut");
let video_change_button = document.getElementById("video-change")

// Video control function (play/pause)
function videoFunction() {
    console.log("videoFunction() [setting.js]")
    videoControl();
    if (videoMode === false && video.paused) {
        console.log("if (videoMode === false && video.paused) in videoFunction() [setting.js]")
        removeBackground()
        hideBackgroundButton()
        warning_background.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in video mode. Please change to normal mode first.";
        video.style.opacity = '0.5';
        videoMode = true;
    }
    if (video.paused) {
        console.log("if (video.paused) in videoFunction() [setting.js]")
        video.play();
        play_setting.innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-pause"></i></button>'
    } else {
        console.log("else in videoFunction() [setting.js]")
        video.pause();
        play_setting.innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>'
    }
    console.log("-------")
}

// Change mode between normal and video
function changeMode() {
    if (videoMode === true) {
        console.log("if (videoMode === true) in changeMode() [setting.js]")
        currentMode = 'normal';
        scratchDisc();
        videoMode = false;
        showBackgroundButton()
        hideVideoButton()
        video.style.opacity = '0';
        changeBackground(currentBackground)
        current_mode_text.innerHTML = 'Current Mode : Normal Mode';
        mode_button.innerHTML = "Change to Video Mode"
        warning_background.innerHTML = "";
        if (video.play) {
            video.pause();
        }
        warning_video.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in normal mode. Please change to video mode first.";
        background_button.disabled = false;
        changeKeyboardShortcutText("normal")
        console.log("-------")
    } else {
        console.log("else in changeMode() [setting.js]")
        currentMode = 'video';
        scratchDisc();
        removeBackground();
        nowPlayingText()
        video.style.opacity = '0.4';
        current_mode_text.innerHTML = 'Current Mode : Video Mode';
        mode_button.innerHTML = "Change to Normal Mode"
        video.play();
        background_button.disabled = true;
        videoMode = true;
        hideBackgroundButton()
        showVideoButton()
        warning_background.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i>You are in video mode. Please change to normal mode first.";
        warning_video.innerHTML = "";

        if (video.muted) {
            mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>';
        } else {
            mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
        }
        changeKeyboardShortcutText("video")
        console.log("-------")
    }
}

// Video sound setting
function videoSound() {
    console.log("videoSound() [setting.js]")
    console.log("-------")
    videoControl();
    if (video.muted) {
        console.log("if (video.muted) in videoSound() [setting.js]")
        video.muted = false;
        mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>'
    } else {
        console.log("else in videoSound() [setting.js]")
        video.muted = true;
        mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>'
    }
}

// Hide background setting when change to video mode (Make it blank and put up warn message)
function hideBackgroundButton() {
    console.log("hideBackgroundButton() [setting.js]")
    background_button.innerHTML = "";
}

// Show background setting when change to background mode (show everything in background setting)
function showBackgroundButton() {
    console.log("showBackgroundButton() [setting.js]")
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

// Hide video setting when change to normal mode (Make it blank and put up warn message)
function hideVideoButton() {
    console.log("hideVideoButton() [setting.js]")
    playing_text.innerHTML = ""
    play_setting.innerHTML = ''
    mute_setting.innerHTML = ''
    video_setting_text.innerHTML = ''
    video_change_button.innerHTML = ""
    age_notice_text.innerHTML = ""
}

// Show video setting when change to video mode (show everything in video setting)
function showVideoButton() {
    console.log("showVideoButton() [setting.js]")
    playing_text.innerHTML = "Now Playing : None"
    play_setting.innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>'
    mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>'
    video_setting_text.innerHTML = 'Click to change video'
    video_change_button.innerHTML = "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('ano-yume.mp4')>あの夢をなぞって</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('jumping-heart.mp4')>青空Jumping Heart (OP)</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('mopemope.mp4')>もぺもぺ</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('takagi-san.mp4')>からかい上手の高木さん２ (OP)</button>" +
        "<button class='btn_one' onmouseover=settingMouseOver() onclick=changeVideo('umaru.mp4')>かくしん的☆めたまるふぉ～ぜっ！(OP)</button>"
    if (currentVideo === "mopemope.mp4") {
        age_notice_text.innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    }
    nowPlayingText()
}

// Change video source, load resource and start playing a new video
function changeVideo(filename) {
    console.log("changeVideo(filename) [setting.js]")
    console.log("-------")
    confirmSelection()
    video.pause();
    currentVideo = filename;
    source.setAttribute('src', 'assets/background/' + filename);
    nowPlayingText()
    video.load();
    video.play();
    if (currentVideo === "mopemope.mp4") {
        console.log('if (currentVideo === "mopemope.mp4") in changeVideo(filename) [setting.js]')
        age_notice_text.innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    }
}

// Change 'Now Playing:' text, just call this function and it will change
// This function if it's a clip that is requires warning it will occured `age-notice` element too
function nowPlayingText() {
    console.log("nowPlayingText() [setting.js]")
    if (currentVideo === 'ano-yume.mp4') {
        console.log("if (currentVideo === 'ano-yume.mp4') in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "Now Playing : あの夢をなぞって"
    } else if (currentVideo === 'jumping-heart.mp4') {
        console.log("else if (currentVideo === 'jumping-heart.mp4') in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "Now Playing : 青空Jumping Heart (OP)"
    } else if (currentVideo === 'mopemope.mp4') {
        console.log("else if (currentVideo === 'mopemope.mp4') in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "Now Playing : もぺもぺ"
    } else if (currentVideo === 'umaru.mp4') {
        console.log("else if (currentVideo === 'umaru.mp4') in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "Now Playing : かくしん的☆めたまるふぉ～ぜっ！(OP)"
    } else if (currentVideo === 'takagi-san.mp4') {
        console.log("else if (currentVideo === 'takagi-san.mp4') in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "Now Playing : からかい上手の高木さん２ (OP)"
    } else {
        // If it's show null it must have an fatal error with `currentVideo` or more
        console.log("else in nowPlayingText() [setting.js]")
        playing_text.innerHTML = "null"
    }
    // Warning text target to `age-notice`
    if (currentVideo === 'mopemope.mp4') {
        console.log("if (currentVideo === 'mopemope.mp4') in nowPlayingText() [setting.js]")
        age_notice_text.innerHTML = '<i class=\"fas fa-exclamation-circle\"></i>This video is NOT for children!'
    } else {
        console.log("else in nowPlayingText() [setting.js]")
        age_notice_text.innerHTML = ''
    }
}

// Change Keyboard shortcut text
function changeKeyboardShortcutText(mode) {
    if (mode === "normal") {
        console.log('if (mode === "normal") in changeKeyboardShortcutText(mode) [setting.js]')
        keyboard_shortcut_text.innerHTML = '<h3>Esc - Close any box</h3>\n' +
            '                <h3>Q - Change mode between normal and video mode</h3>\n'
    } else if (mode === "video") {
        console.log('else if (mode === "video") in changeKeyboardShortcutText(mode) [setting.js]')
        keyboard_shortcut_text.innerHTML = '<h3>Esc - Close any box</h3>\n' +
            '                <h3>Q - Change mode between normal and video mode</h3>\n' +
            '                <h3>P - Play or pause the video</h3>\n' +
            '                <h3>M - Mute or unmute the video</h3>'
    }
}

// EventListener
video.addEventListener('play', event => {
    console.log("% change videoButton text to pause symbol by video.addEventListener('play') [setting.js]");
    if (currentMode === 'video') {
        play_setting.innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-pause"></i></button>';
    }
    videoPlaying = true;
});
video.addEventListener('pause', event => {
    console.log("% change videoButton text to play symbol by video.addEventListener('pause') [setting.js]");
    if (currentMode === 'video') {
        play_setting.innerHTML = '<button class="btn_one" id="videoButton" onmouseover=settingMouseOver() onclick=videoFunction()><i class="fas fa-play"></i></button>';
    }
    videoPlaying = false;
});
video.addEventListener('muted', event => {
    console.log("% change VideoMuted text to volumeup symbol by video.addEventListener('muted') [setting.js]");
    mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
});
document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;

    // press p to play or pause

    if (keyName === 80 && videoPlaying === true && videoMode === true) {
        console.log("% videoControl() from keydown P [setting.js]");
        video.pause();
        videoControl();
    } else if (keyName === 80 && videoPlaying === false && videoMode === true) {
        console.log("% videoControl() from keydown P [setting.js]");
        video.play();
        videoControl();
    }

    // press m to muted

    if (keyName === 77 && video.muted && videoMode === true) {
        console.log("% videoControl() from keydown M [setting.js]")
        video.muted = false;
        mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-up"></i></button>';
        videoControl();
    } else if (keyName === 77 && video.muted === false && videoMode === true) {
        console.log("% videoControl() from keydown M [setting.js]")
        video.muted = true;
        mute_setting.innerHTML = '<button class="btn_one" id="VideoMuted" onmouseover=settingMouseOver() onclick=videoSound()><i class="fas fa-volume-mute"></i></button>';
        videoControl();
    }

    // press q to change mode

    if (keyName === 81) {
        console.log("% changeMode() from keydown q [setting.js]")
        changeMode();
    }

}, false);