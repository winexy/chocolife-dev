"use strict";
const path              = location.pathname;
const searchFormInput   = document.querySelector('.search-form > .input');
const activeCategory    = document.querySelector('.categories__active-element');
const categories        = document.querySelectorAll('.categories__item');
const anchor            = document.querySelector('.anchor');
const PADDING           = 20; // padding between categories buttons
let activeCategoryWidth = categories[0].clientWidth + PADDING;
const blur              = document.querySelector('.categories__blur');
const categoryBlock     = document.querySelector('.categories');
const rulesTrigger      = document.querySelector('#rules') || null;
const tabs              = document.querySelector('.tabs');
const offersInfoDark    = document.querySelectorAll('.offers__info--dark');




// fixed categories block
anchor.addEventListener('click', handleAnchorClick);
window.addEventListener('scroll', handleScroll);
searchFormInput.addEventListener('focus', handleSearchFormFocus);
searchFormInput.addEventListener('blur', handleSearchFormBlur);
categories.forEach(c => c.addEventListener('mouseover', handleCategoryHover));
categoryBlock.addEventListener('mouseenter', handleCategoryBlurOn);
categoryBlock.addEventListener('mouseleave', handleCategoryBlurOff);




offersInfoDark.forEach(offer => {
    offer.addEventListener('mouseover', event => {
        if (event.target !== offer) return;
        event.stopPropagation();
        let block = event.target;
        block.style.height = '80px';

        const sold = block.querySelector('.offers__sold');
        const rating = block.querySelector('.offers__rating');
        sold.style.opacity = '1';

        if (rating) rating.style.opacity = '1';
    });
    offer.addEventListener('mouseleave', event => {
        event.stopPropagation();
        let block = event.target;

        const sold = block.querySelector('.offers__sold');
        const rating = block.querySelector('.offers__rating');
        sold.style.opacity = '0';
        if (rating) rating.style.opacity = '0';

        setTimeout(() =>   block.style.height = '50px', 150);
    });
});


function handleAnchorClick() {
    const interval = setInterval(function() {
        if (window.scrollY <= 0) return clearInterval(interval);
        window.scrollTo(0, window.scrollY - 50);
    }, 5);
} // anchor link to top
function handleRulesOpen(event) {
    const label = event.target.previousElementSibling;
    label.children[0].classList.toggle('rules__caret--show');
}
function handleScroll() {
    let scroll = window.scrollY;
    let categories = document.querySelector('.categories');


    if (scroll > 137) {
        if (categories.classList.contains('categories--fixed')) return;

        categories.classList.add('categories--fixed');
        anchor.style.display = 'block';
    } else {
        if (!categories.classList.contains('categories--fixed')) return;

        categories.classList.remove('categories--fixed');
        anchor.style.display = 'none';
    }
} // handles categories block fixing while scrolling and showing ancho link
function handleSearchFormFocus(event) {
    event.target.classList.add('focus');
    event.target.nextElementSibling.classList.add('focus');
    event.target.parentElement.classList.add('search-form--shadow');
} // handling search form focus and blur events
function handleSearchFormBlur(event) {
    event.target.classList.remove('focus');
    event.target.nextElementSibling.classList.remove('focus');
    event.target.parentElement.classList.remove('search-form--shadow');
} // handling search form focus and blur events
function handleCategoryHover(event) {
    let cat = event.target;
    activeCategoryWidth = cat.clientWidth + PADDING;
    activeCategory.style.width = activeCategoryWidth + 'px';
    activeCategory.style.left = cat.offsetLeft - 10 + 'px';
}
function handleCategoryBlurOn() {
    blur.style.display = 'block';
    setTimeout(() => blur.style.opacity = '1', 100 );
}
function handleCategoryBlurOff () {
    blur.style.opacity = '0';
    setTimeout(() => blur.style.display = 'none', 300);
}



(function INIT() {
    activeCategory.style.width = activeCategoryWidth + 'px';
    activeCategory.style.left = categories[0].offsetLeft - 10 + 'px';

    blur.style.height = document.querySelector('body').clientHeight - 36 + 'px';

    if (rulesTrigger) rulesTrigger.addEventListener('change', handleRulesOpen);

    if (tabs) {
        const tabsButtons = [...(tabs.querySelectorAll('.tabs__button'))];
        const tabsList = [...(tabs.querySelectorAll('.tabs__item'))];
        let previousTabController = tabsButtons[0];
        const handleTabChange = (event) => {
            const currentTabController = event.target;
            const index = currentTabController.dataset.tabFor;

            previousTabController.classList.remove('single-offer-content__menu-item--active');
            currentTabController.classList.add('single-offer-content__menu-item--active');

            const previousTab = tabsList.find(tab => tab.dataset.tabIndex === previousTabController.dataset.tabFor);
            const currentTab = tabsList.find(tab => tab.dataset.tabIndex === index);

            previousTab.style.display = 'none';
            currentTab.style.display = 'block';

            previousTabController = currentTabController;
        }

        tabsButtons.forEach(btn => btn.addEventListener('click', handleTabChange));
    }
})();
