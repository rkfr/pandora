import Tabs from './Tabs/Tabs';

function startLargeModal(el) {
    el.addEventListener('click', () => {
        const {productId: data} = el.dataset,
            modalWinndowSelector = `[data-modal-window-id="${data}"]`,
            modalWindow = document.querySelector(modalWinndowSelector);

        showModalWindow(modalWindow);
    });
}

function showModalWindow(el) {
    const modalWrapper = document.getElementById('modal-windows'),
        body = document.querySelector('body');

    body.classList.add('overflow-off');    
    modalWrapper.classList.add('modal-active');
    el.classList.add('modal-active');

    closeModalWindow({body, el, modalWrapper});
}

function closeModalWindow({body, el: modalWindow, modalWrapper}) {    
    const closeButton = modalWindow.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
        body.classList.remove('overflow-off');
        modalWrapper.classList.remove('modal-active');
        modalWindow.classList.remove('modal-active');
    });
};

// inicialize tabs for one window
const containerIs670 = document.getElementById("is-670"),
    is670Tabs = new Tabs(containerIs670);

// find current botton to start window
const  buttonToStartIs670 = document.querySelector('[data-product-id="is-670"]');

// launching event loop
startLargeModal(buttonToStartIs670);
