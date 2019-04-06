function showFullScreenImage(watchArea) {
    watchArea.addEventListener('click', ({target}) => {
        const {src} = target;

        // if (target.tagName !== 'IMG') return;

        if (src) {
            const modalWindow = renderWindow(src);
            watchArea.append(modalWindow);
            
            setTimeout( () =>  removeElement(modalWindow), 0);
        }

        
    });
}

function removeElement(el) {
    document.body.addEventListener('click', () => {
            el.remove();
    });
}

function renderWindow(data) {
    const imageWindow = document.createElement('div'),
        imageContainer = document.createElement('div'),
        image = document.createElement('img');

    imageWindow.classList.add('zoomed-photo');
    image.classList.add('zoomed-photo__image');
    imageContainer.classList.add('zoomed-photo__image-container');

    image.setAttribute('src', data);
    image.setAttribute('alt', data);

    imageContainer.append(image);
    imageWindow.append(imageContainer);

    return imageWindow;
}

const certificate = document.getElementById('certificate-alarm-slider'),
    outWorks = document.getElementById('our-works-alarm-slider');

showFullScreenImage(certificate);
showFullScreenImage(outWorks);