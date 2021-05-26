var hamburger = document.getElementById('hamburger');
var nav_links = document.getElementById('nav-links');
var mode = document.getElementById('mode');
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var posts_explores = document.getElementById('posts-explores');
var format = document.getElementById('format');
var posts = document.getElementById('posts');

var old_y = window.scrollY, new_y = window.scrollY, pos_scroll = 0;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav_links.classList.toggle('open');
})

mode.addEventListener('click', () => {
    mode.classList.toggle('dark');
    body.classList.toggle('dark');
    header.classList.toggle('dark');
    posts_explores.classList.toggle('dark');

    if (mode.getAttribute('class') == 'dark') {
        $('#mode img').attr('src', './img/sun.svg');
        $('#mode').attr('title', 'Light mode');
    }
    else {
        $('#mode img').attr('src', './img/moon.svg');
        $('#mode').attr('title', 'Dark mode');
    }
})

format.addEventListener('click', () => {
    if (format.getAttribute('class') == 'grid') {
        $('#format p').html('Grid');
        $('#format div img').attr('src', './img/grid.png');
    }
    else {
        $('#format p').html('List');
        $('#format div img').attr('src', './img/list.png');
    }
    format.classList.toggle('grid');
    posts.classList.toggle('grid');
})

document.addEventListener('scroll', () => {
	// var scroll_position = window.scrollY;
	// if (scroll_position > 250) {
	// 	header.style.backgroundColor = '#29323c';
	// } else {
	// 	header.style.backgroundColor = 'transparent';
	// }


    new_y = window.scrollY;
    if (new_y < old_y && pos_scroll == 0)
        pos_scroll = old_y;
    if (new_y < old_y) {
        if (Math.abs(new_y - pos_scroll) < 60)
            $('header').css('top', (Math.max(0, pos_scroll - 60)) + 'px');
        else
            $('header').css('top', new_y + 'px');
    }
    else {
        pos_scroll = 0;
    }
    old_y = new_y;
});