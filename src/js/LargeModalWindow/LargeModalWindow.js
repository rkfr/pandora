import Tabs from './Tabs/Tabs';

function startLargeModal(el) {
    el.addEventListener('click', () => {
        const {productId: data} = el.dataset,
            modalWinndowSelector = `[data-modal-window-id="${data}"]`,
            modalWindow = document.querySelector(modalWinndowSelector);

        showModalWindow(modalWindow, '#modal-windows');
    });
}

function showModalWindow(el, selector) {
    const modalWrapper = document.querySelector(selector),
        body = document.querySelector('body');
    
    body.classList.add('overflow-off');    
    modalWrapper.classList.add('modal-active');
    el.classList.add('modal-active');
    
    closeModalWindow({body, el, modalWrapper});
}

function closeModalWindow(data) {    
    const {el: modalWindow} = data,
        closeButton = modalWindow.querySelector('.close-button'),
        getInstallButton = modalWindow.querySelector('.open-modal'),
        getCostButton = modalWindow.querySelector('.large-modal-open');

        closeModal(closeButton, data);
        closeModal(getInstallButton, data);
        closeModal(getCostButton, data, showMidModal);
};

function closeModal(el, {body, el: modalWindow, modalWrapper}, fn) {
    el.addEventListener('click', () => {
        body.classList.remove('overflow-off');
        modalWrapper.classList.remove('modal-active');
        modalWindow.classList.remove('modal-active');

        if(fn) {
            fn(body);
        } 
    });
}


function showMidModal(body) {
    const midFormOverlay = document.querySelector('.big-form'),
        midForm = document.querySelector('.big-form__wrapp'),
        overlay = document.querySelector('.big-form__overlay');
    
    body.classList.add('overflow-off');  
    midFormOverlay.classList.add('modal-active');
    midForm.classList.add('modal-opened');

    overlay.addEventListener('click', ()=> {
        body.classList.remove('overflow-off'); 
        midFormOverlay.classList.remove('modal-active');
        midForm.classList.remove('modal-opened');
    });
}

// inicialize tabs for one window
const containerIs670 = document.getElementById("is-670"),
    is670Tabs = new Tabs(containerIs670);

// find current botton to start window
const  buttonToStartIs670 = document.querySelector('[data-product-id="is-670"]');

// launching event loop
startLargeModal(buttonToStartIs670);

// #2

const containerIs5771 = document.getElementById("is-5771"),
    is5771Tabs = new Tabs(containerIs5771);

const  buttonToStartIs5771 = document.querySelector('[data-product-id="is-5771"]');

startLargeModal(buttonToStartIs5771);

// #3

const containerIs5771_two = document.getElementById("is-5771-2"),
    is5771Tabs_two = new Tabs(containerIs5771_two);

const  buttonToStartIs5771_two = document.querySelector('[data-product-id="is-5771-2"]');

startLargeModal(buttonToStartIs5771_two);

// #4

const containerIs5771_three = document.getElementById("is-5771-3"),
    is5771Tabs_three = new Tabs(containerIs5771_three);

const  buttonToStartIs5771_three = document.querySelector('[data-product-id="is-5771-3"]');

startLargeModal(buttonToStartIs5771_three);