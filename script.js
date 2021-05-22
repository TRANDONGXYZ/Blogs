var hamburger = document.getElementById("hamburger");
var nav_links = document.getElementById("nav-links");
var mode = document.getElementById("mode");
var body = document.getElementsByTagName("body")[0];
var links = document.getElementsByTagName("a");

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("open");
    nav_links.classList.toggle("open");
})

mode.addEventListener('click', () => {
    if (mode.getAttribute("class") == "dark") {
        mode.title = "Dark mode";
    }
    else {
        mode.title = "Light mode";
    }
    mode.classList.toggle("dark");
    body.classList.toggle("dark");

    for (var i = 0; i < links.length; i++) {
        links[i].classList.toggle("dark");
    }
})