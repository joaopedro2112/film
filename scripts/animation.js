const icon_menu_on = document.querySelector('.icon-menu-on')
const icon_menu_off = document.querySelector('.icon-menu-off')
const menu = document.querySelector('.menu')
icon_menu_on.onclick = function() {
    menu.classList.toggle('menu-active')
}
icon_menu_off.onclick = function() {
    menu.classList.remove('menu-active')
}
const nav_bar = document.querySelector('.nav-bar')
window.addEventListener('scroll', function() {
    let position = window.scrollY
    if (position == 25) {
        nav_bar.classList.add('nav-active')
    }else {
        nav_bar.classList.remove('nav-active')
    }
})
const photo = document.querySelector('.photo')
photo.onclick = function() {
    photo.classList.toggle('photo-active')
}
photo.onclick = function() {
    photo.classList.remove('photo-active')
}