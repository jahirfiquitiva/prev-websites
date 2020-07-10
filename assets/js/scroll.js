window.addEventListener('scroll', function () {
    var yPosition = (window.pageYOffset | document.body.scrollTop) + 2;
    var skillsTop = getElementTop('skills');
    var portfolioTop = getElementTop('portfolio');
    var contactTop = getElementTop('contact');
    if (yPosition < skillsTop) {
        toggleLink('home');
    } else if (yPosition < portfolioTop) {
        toggleLink('skills');
    } else if (yPosition < contactTop) {
        toggleLink('portfolio');
    } else {
        toggleLink('contact');
    }
});

function getElementTop(itemId) {
    var elementTop = 0;
    if (itemId !== null && itemId !== undefined) {
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementById(itemId).getBoundingClientRect();
        elementTop = elemRect.top - bodyRect.top;
        // elementTop = $("#" + itemId).offset().top;
        // elementTop = top - convertRemToPixels(7);
    }
    return elementTop;
}

function scrollToItem(itemId) {
    try {
        var elementTop = getElementTop(itemId);
        /*
        // $('html, body').stop().animate({scrollTop: top}, 1000);
        document.body.scrollTop = document.documentElement.scrollTop = elementTop;
        */
        window.scroll({top: elementTop, left: 0, behavior: 'smooth'});
        toggleLink(itemId);
    } catch (err) {
    }
}

function toggleLink(itemId) {
    var navLinks = document.getElementsByClassName('navbar-item');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('is-active');
    }
    document.getElementById(itemId + "-link").classList.add("is-active");
}

function togglePortfolio(itemId) {
    var portfolioTabs = document.getElementsByClassName('portfolio-tab');
    for (var i = 0; i < portfolioTabs.length; i++) {
        portfolioTabs[i].classList.remove('is-active');
    }

    var portfolioSections = document.getElementsByClassName('portfolio-section');
    for (var i = 0; i < portfolioSections.length; i++) {
        portfolioSections[i].style.display = "none";
    }
    document.getElementById("portfolio-" + itemId).style.display = "flex";
    document.getElementById(itemId + "-tab").classList.add("is-active");
}