function showFullScreenImage(watchArea) {
    watchArea.addEventListener('click', ({target}) => {
        const {src} = target,
            body = document.body;

        if (body.contains(document.querySelector('.zoomed-photo'))) {
            document.querySelector('.zoomed-photo').remove();
            return;
        }

        if (target.tagName !== 'IMG') return;

        else if (src) {
            watchArea.append(renderWindow(src));
        }

        return;
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