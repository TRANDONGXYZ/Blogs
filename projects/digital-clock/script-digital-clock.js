window.onload = function() {
    updateTime();
    var interval = setInterval(updateTime, 1000);
}

function updateTime() {
    var hours = document.getElementById("number-hours");
    var minutes = document.getElementById("number-minutes");
    var seconds = document.getElementById("number-seconds");
    var ampm = document.getElementById("ampm");

    var hours_current = new Date().getHours();
    var minutes_current = new Date().getMinutes();
    var seconds_current = new Date().getSeconds();
    var ampm_current = "AM";
    if (hours_current >= 12)
        ampm_current = "PM";

    if (hours_current < 10)
        hours_current = "0" + hours_current;
    if (minutes_current < 10)
        minutes_current = "0" + minutes_current;
    if (seconds_current < 10)
        seconds_current = "0" + seconds_current;

    hours.innerHTML = hours_current;
    minutes.innerHTML = minutes_current;
    seconds.innerHTML = seconds_current;
    ampm.innerHTML = ampm_current;
}

