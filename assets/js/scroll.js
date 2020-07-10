window.addEventListener('scroll', function () {
    let yPosition = (window.pageYOffset | document.body.scrollTop) + 2;
    let portfolioTop = getElementTop('portfolio');
    let contactTop = getElementTop('contact');
    if (yPosition < portfolioTop) {
        toggleLink('home');
    } else if (yPosition < contactTop) {
        toggleLink('portfolio');
    } else {
        let ele = document.getElementById('contact');
        if (ele !== null && ele !== undefined) {
            toggleLink('contact');
        }
    }
});

function getElementTop(itemId) {
    let elementTop = 0;
    if (itemId !== null && itemId !== undefined) {
        try {
            let bodyRect = document.body.getBoundingClientRect(),
                elemRect = document.getElementById(itemId).getBoundingClientRect();
            elementTop = elemRect.top - bodyRect.top;
        } catch (e) {
            // Ignore errors here :P
        }
        // elementTop = $("#" + itemId).offset().top;
        // elementTop = top - convertRemToPixels(7);
    }
    return elementTop;
}

function scrollToItem(itemId, toggle = true) {
    try {
        let navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll('.navbar-burger'), 0);
        if (navbarBurgers.length > 0) {
            navbarBurgers.forEach(function (el) {
                let target = el.dataset.target;
                let rTarget = document.getElementById(target);
                el.classList.remove('is-active');
                rTarget.classList.remove('is-active');
            });
        }

        let elementTop = getElementTop(itemId);
        /*
        // $('html, body').stop().animate({scrollTop: top}, 1000);
        document.body.scrollTop = document.documentElement.scrollTop = elementTop;
        */
        window.scroll({top: elementTop, left: 0, behavior: 'smooth'});
        if (toggle !== null && toggle !== undefined) {
            if (toggle) {
                toggleLink(itemId);
            }
        }
    } catch (err) {
    }
}

function toggleLink(itemId) {
    let navLinks = document.getElementsByClassName('navbar-item');
    for (let i = 0; i < navLinks.length; i++) {
        let ele = navLinks[i];
        if (ele !== null && ele !== undefined) {
            ele.classList.remove('is-active');
        }
    }
    let ele = document.getElementById(itemId + "-link");
    if (ele !== null && ele !== undefined) {
        ele.classList.add("is-active");
    }
}

function togglePortfolio(itemId) {
    let portfolioFilters = document.getElementsByClassName('portfolio-filter');
    for (let i = 0; i < portfolioFilters.length; i++) {
        portfolioFilters[i].classList.remove('is-active');
    }

    let portfolioSections = document.getElementsByClassName('portfolio-section');
    for (let i = 0; i < portfolioSections.length; i++) {
        let ele = portfolioSections[i];
        if (ele.id !== 'portfolio-' + itemId && ele.style.display !== 'none') {
            fade(portfolioSections[i], 'out', 100);
        }
        // portfolioSections[i].style.display = "none";
    }
    for (let j = 0; j < 2000; j++) {
    }
    // document.getElementById("portfolio-" + itemId).style.display = "flex";
    fade(document.getElementById("portfolio-" + itemId), 'in', 750, "flex");
    document.getElementById(itemId + "-filter").classList.add("is-active");
}