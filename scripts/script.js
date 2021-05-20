var hamburger, menu;

window.onload = function() {
    menu = document.getElementById("menu");
    hamburger = document.getElementById("hamburger");
    handleNavLink.isOpen = false;
    hamburger.onclick = handleNavLink;
}

function handleNavLink() {
    if (handleNavLink.isOpen == false) {
        menu.setAttribute("style", "display: flex;");
        menu.setAttribute("style", "transform: translateX(-100%);");
        handleNavLink.isOpen = true;
        console.log(handleNavLink.isOpen);
    }
    else {
        menu.setAttribute("style", "display: none;");
        menu.setAttribute("style", "transform: translateX(70%);");
        handleNavLink.isOpen = false;
        console.log(handleNavLink.isOpen);
    }
}