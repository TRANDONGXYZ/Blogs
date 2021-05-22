const days_in_month = [31, 28, 31, 30, 31, 60, 31, 31, 30, 31, 30, 31];



window.onload = function() {
    updateTime();
    setInterval(updateTime, 1000);
}

function updateTime() {
    const newYears = "1 Jan " + (new Date().getFullYear() + 1);
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    if (currentYear % 400 == 0 || (currentYear % 100 != 0 && currentYear % 4 == 0))
        days_in_month[1] = 29;


    var delta_seconds = Math.floor((newYearsDate - currentDate) / 1000);
    console.log(delta_seconds);

    var delta_months = 11 - currentMonth;
    if (delta_months < 10)
        delta_months = "0" + delta_months;
    for (var i = currentMonth + 2; i < 12; i++)
        delta_seconds -= 3600 * 24 * days_in_month[i - 1];

    var delta_days = Math.floor(delta_seconds / 3600 / 24);
    if (delta_days < 10)
        delta_days = "0" + delta_days;
    delta_seconds -= delta_days * 3600 * 24;

    var delta_hours = Math.floor(delta_seconds / 3600);
    if (delta_hours < 10)
        delta_hours = "0" + delta_hours;
    delta_seconds -= delta_hours * 3600;

    var delta_minutes = Math.floor(delta_seconds / 60);
    if (delta_minutes < 10)
        delta_minutes = "0" + delta_minutes;
    delta_seconds -= delta_minutes * 60;
    if (delta_seconds < 10)
        delta_seconds = "0" + delta_seconds;





    var months = document.getElementById("months");
    var days = document.getElementById("days");
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");

    months.innerHTML = delta_months;
    hours.innerHTML = delta_hours;
    days.innerHTML = delta_days;
    minutes.innerHTML = delta_minutes;
    seconds.innerHTML = delta_seconds;
}