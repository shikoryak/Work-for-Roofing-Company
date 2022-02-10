function initGallery(id, hasDots = false) {
    const gallery = document.querySelector(id);

    const previus = gallery.querySelector('.previus');
    const next = gallery.querySelector('.next');

    const cardFeedback = gallery.querySelector('.gallery-container-inner');
    const cards = cardFeedback.querySelectorAll('.card');

    const dotsContainer = gallery.querySelector('.gallery-dots');

    let translate = 0;

    const galleryWidth = parseFloat(window.getComputedStyle(gallery).width);
    const cardWidth = parseFloat(window.getComputedStyle(cards[0]).width);
    const gap = parseFloat(window.getComputedStyle(cardFeedback).gap);
    const visibleCards = Math.floor(galleryWidth / cardWidth);
    const maxTranslate = 0 - ((cards.length - visibleCards) * (cardWidth + gap));

    if (next) {
        next.onclick = function () {
            if (translate > maxTranslate) {
                translate = translate - cardWidth - gap;
            } else {
                translate = 0;
            }
            setTransform();
            if (hasDots) {
                activateButton()
            }
        }
    }

    if (previus) {
        previus.onclick = function () {
            if (translate < 0) {
                translate = translate + cardWidth + gap;
            } else {
                translate = maxTranslate;
            }
            setTransform();
            if (hasDots) {
                activateButton()
            }
        }
    }

    function setTransform() {
        cardFeedback.style.transform = `translateX(${translate}px)`;
    }

    //dots

    if (hasDots) {

        for (let i = 0; i <= (cards.length - visibleCards); i++) {
            const dot = document.createElement('button');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.onclick = function () {
                translate = 0 - (cardWidth + gap) * i;
                setTransform();
                clearButtonStatus();

                dot.classList.add('active');
            }
            dotsContainer.append(dot);
        }

        function clearButtonStatus() {
            Array.from(dotsContainer.children).forEach((button) => {
                button.classList.remove('active');
            });
        }

        function activateButton() {
            clearButtonStatus();
            const dot = dotsContainer.children[translate ? Math.abs(translate / (cardWidth + gap)) : 0];
            dot.classList.add('active');
        }
    }
}

initGallery('#cardFeedbackGallery');
initGallery('#aboutFeedbackGallery');
initGallery('#aboutGalleryWork');
initGallery('#cooperationWork', true);