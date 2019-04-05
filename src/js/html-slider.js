'use strict';

class HtmlSlider {
    constructor(container, params) {
        this.state = {
            container: container,
            oneCardSize: null,
            cards: null,
            cardsToShow: null,
            sliderWidth: null,
            maxPosition: null,
            diff: null
        };

        this.params = {...params};

        this.setState();
        this.resizeWatcher();
    }

    setState() {
        const windowWidth = window.innerWidth;

        this.state.cards = this.getCards().length;
        this.mediaHandler(windowWidth);
        this.cardSizeHandler(windowWidth);
        this.sliderWidthHandler();
        this.setDomCardsProps();
        this.slideHandler();
        this.setLeftPosition();
        this.setSliderSpecs();
    }

    resizeWatcher() {
        window.addEventListener('resize', ({target}) => {
            const {innerWidth: windowWidth} = target;

            this.mediaHandler(windowWidth);
            this.cardSizeHandler(windowWidth);
            this.sliderWidthHandler();
            this.setDomCardsProps();
            this.setLeftPosition();
            this.setSliderSpecs();
        });
    }

    slideHandler() {
        const {container} = this.state,
            slider = container.querySelector('.html-slider'),
            leftBtn = container.querySelector('.html-slider__general-button_left'),
            rightBtn = container.querySelector('.html-slider__general-button_right');
            
            let newPosition = 0;

            rightBtn.addEventListener('click', () => {
                const currentPosition = this.getPositionLeft(slider);
                
                newPosition = currentPosition - this.state.oneCardSize;
                if (newPosition < this.state.maxPosition) {
                    newPosition = this.state.maxPosition;    
                }
                // console.log(newPosition, this.state.maxPosition);
                slider.style.left = `${newPosition}px`;
            });
            leftBtn.addEventListener('click', () => {
                const currentPosition = this.getPositionLeft(slider);

                newPosition = currentPosition + this.state.oneCardSize;
                if (newPosition > 0) {
                    newPosition = 0;
                }

                slider.style.left = `${newPosition}px`;
            });
    }

    cardSizeHandler(windowWidth) {
        const {cardsToShow} = this.state;
        this.state.oneCardSize = parseInt((windowWidth / cardsToShow) * 0.8);
    }

    sliderWidthHandler() {
        const {oneCardSize, cards} = this.state;
        this.state.sliderWidth = oneCardSize * cards;
    }

    mediaHandler(windowWidth) {
        const {media} = this.params;

        if (windowWidth > media.lg.point) {
            this.state.cardsToShow = this.params.slidesToShow;
        }

        if (windowWidth < media.lg.point) {
            this.state.cardsToShow = media.lg.value;
        }

        if (windowWidth < media.md.point) {
            this.state.cardsToShow = media.md.value;
        }

        if (windowWidth < media.sm.point) {
            this.state.cardsToShow = media.sm.value;
        }
    }

    getCards() {
        return this.state.container.querySelectorAll('.html-slider__card');
    }

    getPositionLeft(elem) {
        const left = +elem.style.left
                        .split('')
                        .filter(s => s !== 'p' && s !== 'x')
                        .join('');
        return Math.floor(left); 
    }

    setLeftPosition() {
        const {container} = this.state,
            slider = container.querySelector('.html-slider');
        
        slider.style.left = '0';
    }

    setSliderSpecs() {
        const {sliderWidth, oneCardSize, cardsToShow} = this.state,
            diff = oneCardSize * cardsToShow,
            maxPosition = -sliderWidth + diff;

        this.state.diff = diff;
        this.state.maxPosition = maxPosition;
    }

    setDomCardsProps() {
        const cards = this.getCards();
        
        let cardIndex = 0;
        for (let card of cards) {
            this.setDomCardProps(card, cardIndex);
            ++cardIndex;
        }
    }

    setDomCardProps(card, idx) {
        const {oneCardSize} = this.state,
            cardPosition = oneCardSize * idx;
        
        card.style.left = `${cardPosition}px`;
        card.style.width = `${oneCardSize}px`;
    }
}

const immobilizer = document.getElementById('immobilizer-slider'),
    imbSlider = new HtmlSlider(immobilizer, {
        slidesToShow:  4,
        media: {
            lg: {
                point: 1200,
                value: 3
            },
            md: {
                point: 890,
                value: 2
            },
            sm: {
                point: 560,
                value: 1
            }
        }
    });

const remoteAlarm = document.getElementById('remote-alarm-slider'),
    remAlrmSlider = new HtmlSlider(remoteAlarm, {
        slidesToShow:  4,
        media: {
            lg: {
                point: 1200,
                value: 3
            },
            md: {
                point: 890,
                value: 2
            },
            sm: {
                point: 560,
                value: 1
            }
        }
    });