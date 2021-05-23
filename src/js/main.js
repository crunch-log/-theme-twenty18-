function docReady() {
    document.body.querySelector('#menu-bars').addEventListener('click', toggleMenu);
    document.body.querySelector('.menu-blur').addEventListener('click', toggleMenu);
    document.body.querySelectorAll('.post-list article').forEach(function (entry) {
        entry.addEventListener('mousedown', function (event) {
            var url = this.querySelector('div.data h1 a').href;
            switch (event.which) {
                case 1:
                    event.preventDefault();
                    window.location.href = url;
                    break;
                case 2:
                    event.preventDefault();
                    window.open(url);
                    break;
                default:
                    break;
            }
        });
    });

    initLazyImage();
}

function initLazyImage() {
    var imgs = document.querySelectorAll("#main img[data-src]");
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        imgs.forEach(function (img) {
            observer.observe(img);
        });
    }
    else {
        imgs.forEach(function (img) {
            img.addEventListener('load', loadImage);
        });
    }
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function loadImage() {
    var that = this;

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