var it = 0;

window.onload = function() {
    updateTime();
    var interval = setInterval(updateTime, 1000);
}

function updateTime() {
    var hours_current = new Date().getHours();
    var minutes_current = new Date().getMinutes();
    var seconds_current = new Date().getSeconds();

    var deg_seconds_current = 6 * (seconds_current + 1) + 360 * it;
    var deg_mniutes_current = 6 * (minutes_current + seconds_current / 60);
    var deg_hours_current = 30 * (hours_current + (minutes_current + seconds_current / 60) / 60);
    if (deg_seconds_current % 360 == 0)
        it++;

    var hours = document.getElementById("box-hours");
    var minutes = document.getElementById("box-minutes");
    var seconds = document.getElementById("box-seconds");

    seconds.setAttribute("style", "transform: rotate(" + deg_seconds_current + "deg);");
    minutes.setAttribute("style", "transform: rotate(" + deg_mniutes_current + "deg);");
    hours.setAttribute("style", "transform: rotate(" + deg_hours_current + "deg);");
}