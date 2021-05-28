let hamburger = document.getElementById('hamburger');
let nav_links = document.getElementById('nav-links');
let mode = document.getElementById('mode');
let body = document.getElementsByTagName('body')[0];
let header = document.getElementsByTagName('header')[0];
let posts_explores = document.getElementById('posts-explores');
let format = document.getElementById('format');
let posts = document.getElementById('posts');

let old_y = window.scrollY, new_y = window.scrollY, pos_scroll = 0;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav_links.classList.toggle('open');
})

mode.addEventListener('click', () => {
    mode.classList.toggle('dark');
    body.classList.toggle('dark');
    header.classList.toggle('dark');
    if (posts_explores)
        posts_explores.classList.toggle('dark');

    if (mode.getAttribute('class') == 'dark') {
        let link_img = $('#mode img').attr('src');
        link_img = link_img.replace('moon', 'sun');
        $('#mode img').attr('src', link_img);
        $('#mode').attr('title', 'Light mode');
    }
    else {
        let link_img = $('#mode img').attr('src');
        link_img = link_img.replace('sun', 'moon');
        $('#mode img').attr('src', link_img);
        $('#mode').attr('title', 'Dark mode');
    }
})

if (format) {
    format.addEventListener('click', () => {
        if (format.getAttribute('class') == 'grid') {
            let link_img = $('#format div img').attr('src');
            link_img = link_img.replace('list', 'grid');
            $('#format p').html('Grid');
            $('#format div img').attr('src', link_img);
        }
        else {
            let link_img = $('#format div img').attr('src');
            link_img = link_img.replace('grid', 'list');
            $('#format p').html('List');
            $('#format div img').attr('src', link_img);
        }
        format.classList.toggle('grid');
        posts.classList.toggle('grid');
    })
}

document.addEventListener('scroll', () => {
    new_y = window.scrollY;
    if (new_y < old_y) {
        $('header').css('top', '0');
    }
    else {
        $('header').css('top', '-60px');
    }
    old_y = new_y;
});











let prefix = document.getElementById('css-file');
let address_files = [];
if (prefix != null) {
    prefix = prefix.getAttribute('href');
    prefix = prefix.substring(0, prefix.indexOf('css'));
    console.log(prefix);

    let common_elements = document.querySelectorAll('*[address-file][src]');
    for (let i = 0; i < common_elements.length; i++)
        address_files.push(common_elements[i].getAttribute('address-file'));
    for (let i = 0; i < common_elements.length; i++) {
        common_elements[i].setAttribute('src', prefix + address_files[i]);
        console.log(prefix + address_files[i]);
    }

    address_files = [];
    common_elements = document.querySelectorAll('*[address-file][href]');
    for (let i = 0; i < common_elements.length; i++)
        address_files.push(common_elements[i].getAttribute('address-file'));
    for (let i = 0; i < common_elements.length; i++)
        common_elements[i].setAttribute('href', prefix + address_files[i]);
}







let links_anchor = document.getElementsByClassName('link-anchor');
for (let i = 0; i < links_anchor.length; i++)
    links_anchor[i].addEventListener('click', () => {
        for (let j = 0; j < links_anchor.length; j++)
            links_anchor[j].classList.remove('active');
        links_anchor[i].classList.add('active');
    })