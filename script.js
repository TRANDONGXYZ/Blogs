var overlay = document.getElementById("overlay");
var hamburger = document.getElementById("hamburger");
var nav_links = document.getElementById("nav-links");
var mode = document.getElementById("mode");
var body = document.getElementsByTagName("body")[0];
var links = document.getElementsByTagName("a");
var main = document.getElementById("main");
var header = document.getElementById("header");
var format = document.getElementById("format");
var grid = document.getElementsByClassName("grid")[0];
var tools_button = document.getElementById("tools-button");

overlay.isOpen = false;

// let progress = document.getElementById("progress-bar");
// let totalHeight = document.body.scrollHeight - window.innerHeight;

// window.onscroll = function() {
//     let progressHeight = (window.pageYOffset / totalHeight) * 100;
//     progress.style.height = progressHeight + "%";
// }

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
    header.classList.toggle("dark");
    main.classList.toggle("dark");

    for (var i = 0; i < links.length; i++) {
        links[i].classList.toggle("dark");
    }
})

format.addEventListener('click', () => {
    if (grid.getAttribute("class").indexOf("grid-format") == -1) {
        format.innerHTML = 'List<div><img src="./img/list.png" alt=""></div>';
    }
    else {
        format.innerHTML = 'Grid<div><img src="./img/grid.png" alt=""></div>';
    }
    grid.classList.toggle("grid-format");
})

tools_button.addEventListener('click', () => {
    if (overlay.isOpen) {
        $(overlay).css("width", "100px");
        $(overlay).css("height", "100px");
        $(overlay).css("border-radius", "0 50px 0 0");
        $(overlay).css("left", "-50px");
        $(overlay).css("bottom", "-50px");
        overlay.isOpen = false;
    }
    else {
        $(overlay).css("width", "100vw");
        $(overlay).css("height", "100vh");
        $(overlay).css("border-radius", "0");
        $(overlay).css("left", "0");
        $(overlay).css("bottom", "0");
        overlay.isOpen = true;
    }
})