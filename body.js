function showsetting(){
    if (openSetting === true) {
        closesetting()
    } else {
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
    WaveOut.play();
    $("#setting_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#setting_container").removeClass("animated slideOutLeft");
        $("#setting_container").css("display","none");
    },800);
    openSetting = false;
}