function docReady() {
    // addCss('/css/main.css', 'all');

    document.body.querySelector('#menu-bars').addEventListener('click', toogleMenu);
    document.body.querySelector('#menu').addEventListener('click', toogleMenu);
    document.body.querySelectorAll('.post-list article').forEach(function (entry) {
        entry.addEventListener('click', function (event) {
            const url = this.querySelector('div.data h1 a').href;
            window.location.href = url;
        });
    });

    initLazyImage();
}

function addCss(cssFile, media) {
    var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('media', media);
    node.setAttribute('href', cssFile);

    document.head.appendChild(node);
}

function initLazyImage() {
    var imgs = document.querySelectorAll("#main img[data-src]");
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        imgs.forEach(function(img) {
            observer.observe(img);
        });
    }
    else {
        imgs.forEach(img => {
            img.addEventListener('load', loadImage);
        });
    }
}

function toogleMenu() {
    document.body.querySelector('#menu').parentElement.classList.toggle('open');
}

function loadImage() {
    const that = this;

    setTimeout(function () {
        that.src = that.dataset.src;
    }, 50);
    this.removeEventListener('load', loadImage);
}

if (document.readyState === "loading") {  // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", docReady);
} else {  // `DOMContentLoaded` has already fired
    docReady();
}