'use strict';

const htmlSliderParams = {
    cardsToShow: 4,
    cardWidth: 0,
    cardsCount: getCards().length,
    windowWidth: window.innerWidth,
    breakPoint1: 1200,
    breakPoint2: 768,
    breakPoint3: 460
};

function getCards() {
    return document.querySelectorAll('.html-slider__card');
}

function setBgPosition({param, slider,  currentSliderPosition}) {
    let newSliderPosition = 0;
    const {cardWidth, cardsCount, cardsToShow} = htmlSliderParams;
    const oneCardWidth = parseInt(cardWidth);
    const sliderLength = oneCardWidth * (cardsCount - cardsToShow);

    switch(param) {
        case 'right':
            newSliderPosition = currentSliderPosition - oneCardWidth;
            if (newSliderPosition < -sliderLength) {
                newSliderPosition = 0;
            }
            slider.style.left = `${newSliderPosition}px`;
        break;
        case 'left':
            newSliderPosition = currentSliderPosition + oneCardWidth;
            if (newSliderPosition > 0) {
                newSliderPosition = -sliderLength;
            } 
            slider.style.left = `${newSliderPosition}px`;
        break;
    }
    
}


function sliderButtonsHandler(leftButton, rightButton) {
    
    setTimeout(() => {
        const {slider} = setDefaultSliderStyle();

        leftButton.addEventListener('click', e => {
            setBgPosition({
                param: 'left',
                slider,
                currentSliderPosition: styleToNum(slider.style.left)
            });
        });
    
        rightButton.addEventListener('click', e => {
            setBgPosition({
                param: 'right',
                slider,
                currentSliderPosition: styleToNum(slider.style.left)
            });
        });

    }, 200);
    
}

function cardsCountHandler(screenWidth) {
    const {breakPoint1: large, breakPoint2: mid, breakPoint3: small} = htmlSliderParams;
    let cardsCount = 0;

    if (screenWidth >= large) {
        cardsCount = 4;
    }
    if (screenWidth <= large) {
        cardsCount = 3;
    }
    if (screenWidth <= mid) {
        cardsCount = 2;
    }
    if (screenWidth <= small) {
        cardsCount = 1;
    }
    
    return cardsCount;
}

function setDefaultSliderStyle() {
    const {cardWidth, cardsCount} = htmlSliderParams;
    const oneCardWidth = parseInt(cardWidth);
    const slider = document.querySelector('.html-slider');
                                    
    slider.style.width = `${oneCardWidth * cardsCount}px`;
    slider.style.left = '0';

    return {
        slider
    }
}

function cardSizeHandler(card, idx) {
    const cardsToShow = cardsCountHandler(window.innerWidth);
    const startCardWidth = (window.innerWidth / cardsToShow) * 0.78;

    htmlSliderParams.cardWidth = startCardWidth;

    window.addEventListener('load', () => {
        card.style.left = `${startCardWidth * idx}px`;
        card.style.top = `10px`;
        card.style.width  =`${startCardWidth}px`;
        setDefaultSliderStyle();
    });
    
    cardsCountHandler(startCardWidth);

    window.addEventListener('resize', debounce(function(e) {
        const {innerWidth: width} = e.target;
        htmlSliderParams.cardsToShow = cardsCountHandler(width);
        const cardWidth = (width / htmlSliderParams.cardsToShow) * 0.78;

        setDefaultSliderStyle();
        htmlSliderParams.windowWidth = width;
        card.style.width = `${cardWidth}px`;
        card.style.left = `${cardWidth * idx}px`;
        htmlSliderParams.cardWidth = cardWidth;
    }, 20));
}

function htmlSlider() {
    const leftButton = document.querySelector('.html-slider__general-button_left');
    const rightButton = document.querySelector('.html-slider__general-button_right');
    const cards = getCards();
    
    sliderButtonsHandler(leftButton, rightButton);

    let cardIdx = 0;
    for (let card of cards) {
        cardSizeHandler(card, cardIdx);
        ++cardIdx;
    }
};

htmlSlider();


// utils

function styleToNum(str) {
    return +str
    .split('')
    .filter(p => p !== 'p' && p !== 'x')
    .join('');
}

function debounce(f, ms) {

    let timer = null;
  
    return function (...args) {
      const onComplete = () => {
        f.apply(this, args);
        timer = null;
      }
  
      if (timer) {
        clearTimeout(timer);
      }
  
      timer = setTimeout(onComplete, ms);
    };
}