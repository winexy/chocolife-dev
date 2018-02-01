// init blur block height
const blur = document.querySelector('.categories__blur');
blur.style.height = document.querySelector('body').clientHeight - 64 + 'px';


// fixed categories block
window.addEventListener('scroll', () => {
    let scroll = window.scrollY;
    let categories = document.querySelector('.categories');


    if (scroll >= 75) {

        if (categories.classList.contains('categories--fixed')) return;

        categories.classList.add('categories--fixed');
    } else {

        if (!categories.classList.contains('categories--fixed')) return;

        categories.classList.remove('categories--fixed');

    }
});


// form hover effect
const searchFormInput = document.querySelector('.search-form > .input');

searchFormInput.addEventListener('focus', event => {
    event.target.classList.add('focus');
    event.target.nextElementSibling.classList.add('focus');
    event.target.parentElement.classList.add('search-form--shadow');
});
searchFormInput.addEventListener('blur', event => {
    event.target.classList.remove('focus');
    event.target.nextElementSibling.classList.remove('focus');
    event.target.parentElement.classList.remove('search-form--shadow');
});
//


// categories active element
const activeCategory = document.querySelector('.categories__active-element')
const categories = document.querySelectorAll('.categories__item');
categories.forEach(c => c.addEventListener('mouseover', selectCategory));

//
const PADDING = 20;
var activeCategoryWidth = categories[0].clientWidth + PADDING;
activeCategory.style.width = activeCategoryWidth + 'px';
activeCategory.style.left = categories[0].offsetLeft - 10 + 'px';

function selectCategory(event) {
    let cat = event.target;
    activeCategoryWidth = cat.clientWidth + PADDING;
    activeCategory.style.width = activeCategoryWidth + 'px';
    activeCategory.style.left = cat.offsetLeft - 10 + 'px';
}

//



