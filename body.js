function showsetting(){
    if (openSetting === true) {
        console.log("Setting closed by showsetting() [body.js]")
        console.log("-------")
        closesetting()
    } else {
        console.log("Setting open by showsetting() [body.js]")
        console.log("-------")
        SettingIn.play();
        openSetting = true;
        $("#setting_container").css("display","inherit");
        $("#setting_container").addClass("animated slideInLeft");
        setTimeout(function(){
            $("#setting_container").removeClass("animated slideInLeft");
        },800);
        openSetting = true;
    }
}
function closesetting(){
    console.log("Setting closed by closesetting() [body.js]")
    console.log("-------")
    openSetting = false;
    WaveOut.play();
    $("#setting_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#setting_container").removeClass("animated slideOutLeft");
        $("#setting_container").css("display","none");
    },800);
}