'use strict';

const htmlSliderParams = {
    cardsToShow: 4,
    cardWidth: 0,
    cardsCount: getCards().length,
    windowWidth: window.innerWidth
};

function getCards() {
    return document.querySelectorAll('.html-slider__card');
}

function setBgPosition(param) {
    const {cardWidth, cardsToShow} = htmlSliderParams;
    const slider = document.querySelector('.html-slider');
    const sliderWidth = cardsToShow * cardWidth;
    let currentPosition = +slider.style.left
                            .split('')
                            .filter(s => s !== 'p' && s !== 'x')
                            .join('');

    if (currentPosition >= 0 ) {
        currentPosition = -cardWidth;
    }
    if (currentPosition <= -sliderWidth) {
        currentPosition = -sliderWidth + cardWidth;
    }

    switch(param) {
        case 'left':
            currentPosition += cardWidth;
            slider.style.left = `${currentPosition}px`;
        break;
        case 'right':
            currentPosition -= cardWidth;
            slider.style.left = `${currentPosition}px`;
        break;
    }
    console.log('sw', cardWidth);
        console.log('cp', currentPosition);
}


function sliderButtonsHandler(leftButton, rightButton) {
    const cards = getCards();

    leftButton.addEventListener('click', e => {
        setBgPosition('left')
    });

    rightButton.addEventListener('click', e => {
        setBgPosition('right')
    });
}

function cardSizeHandler(card, idx) {
    const {cardsToShow} = htmlSliderParams;
    const startCardWidth = (window.innerWidth / cardsToShow) * 0.78;

    htmlSliderParams.cardWidth = startCardWidth;

    window.addEventListener('load', () => card.style.width  =`${startCardWidth}px`);
    card.style.left = `${startCardWidth * idx}px`;
    card.style.top = `10px`;

    window.addEventListener('resize', debounce(function(e) {
        const {innerWidth: width} = e.target;
        const cardWidth = (width / cardsToShow) * 0.78;
    
        htmlSliderParams.windowWidth = width;
        card.style.width = `${cardWidth}px`;
        card.style.left = `${cardWidth * idx}px`;
        htmlSliderParams.cardWidth = cardWidth;
    }, 20));
}

function htmlSlider({cardsToShow}) {
    const leftButton = document.querySelector('.html-slider__general-button_left');
    const rightButton = document.querySelector('.html-slider__general-button_right');
    const cards = getCards();
    
    sliderButtonsHandler(leftButton, rightButton);

    let cardIdx = 0;
    for (let card of cards) {
        cardSizeHandler(card, cardIdx);
        ++cardIdx;
    }
}

htmlSlider(htmlSliderParams);


// utils

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