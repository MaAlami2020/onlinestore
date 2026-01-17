
// script del menu responsive Abrir el menu
var btnMobile = document.getElementById('btn-mobile')
btnMobile.addEventListener('click', function (e) {
    e.preventDefault()
    let mySidenav = document.getElementById("mySidenav")
    mySidenav.classList.toggle("openOffCanvas")
})

// script del menu responsive sticky menu

var nav = document.getElementById('mySidenav')

window.addEventListener('scroll', function () {
    if (window.pageYOffset > nav.offsetTop) {
        nav.classList.add('nav-fixed')
    } else {
        nav.classList.remove('nav-fixed')
    }
})
 // script del menu responsive effecto accordeon
var submenu = document.getElementsByClassName('link-submenu')

for (var i = 0; i < submenu.length; i++) {
    submenu[i].onclick = function () {
        var content = this.nextElementSibling

        if (content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
        }

    }
}

// script del slider de producto
let activeImg = 0
function slider(n) {
    let images = document.getElementsByClassName("slider-img-container")
    for (i = 0; i < images.length; i++) {

        if (images[i].className.includes("active")) {
            images[i].className = images[i].className.replace("active", "")

            break
        }
    }

    activeImg = n
    images[n].className += " active"    
}



function next() {
    activeImg++
    let images = document.getElementsByClassName("slider-img-container")
    if (activeImg >= images.length) {
        activeImg = 0
    }
    slider(activeImg)
}

function previous() {
    //console.log(n)
    activeImg--
    let images = document.getElementsByClassName("slider-img-container")
    if (activeImg < 0) {
        activeImg = images.length - 1
    }
    slider(activeImg)
}

let currentIndex = 0
let totalItems = 0
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll(".slider-img-container1")
    totalItems = items.length;

    currentIndex = 0
});

function previousItem(){
    if (currentIndex > 0) {
        updateCarousel(currentIndex - 1)
    }
}

function nextItem(){
    if (currentIndex < totalItems - 1) {
        updateCarousel(currentIndex + 1)
    }
}

function updateCarousel(newIndex){
    document.getElementsByClassName("slider-img-container1").addClass('is-hidden').removeClass('active');
    document.getElementsByClassName("slider-img-container1 [attr.data-index]='" + newIndex + "'").removeClass('is-hidden').addClass('active');
    currentIndex = newIndex;
}

// script de la navegacipon por tabs
let tabs = Array.prototype.slice.apply(document.querySelectorAll('.tabs-item'))
let panels = Array.prototype.slice.apply(document.querySelectorAll('.tab-panel'))

document.getElementById('tabs').addEventListener('click', e => {
    if (e.target.classList.contains('tabs-item')) {
        let i = tabs.indexOf(e.target)
        tabs.map(tab => tab.classList.remove('active-tab'))
        tabs[i].classList.add('active-tab')
        panels.map(panel => panel.classList.remove('active-panel'))
        panels[i].classList.add('active-panel')
    }

})




