var hamburger = document.getElementById("hamburger");
var nav_links = document.getElementById("nav-links");
var mode = document.getElementById("mode");
var body = document.getElementsByTagName("body")[0];
var links = document.getElementsByTagName("a");

let progress = document.getElementById("progress-bar");
let totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = function() {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}

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