/**
 * Created by jahir on 6/29/17.
 */

$(window).scroll(function () {
    var home = $('#home');
    var about = $('#about');
    var skills = $('#skills');
    var portfolio = $('#portfolio');
    var services = $('#services');
    var milestones = $('#milestones');
    var supporters = $('#supporters');
    var blog = $('#blog');
    var contact = $('#contact');

    if (hasScrolledIntoHome()) {
        $('#tha-nav').addClass('in-home');
        $('.fab-to-top').fadeOut();
        updateComponents('home');
    } else {
        $('#tha-nav').removeClass('in-home');
        $('.fab-to-top').fadeIn(500);
        if (hasScrolledIntoView(about)) {
            updateComponents('about');
        } else if (hasScrolledIntoView(skills)) {
            updateComponents('skills');
        } else if (hasScrolledIntoView(portfolio)) {
            updateComponents('portfolio');
        } else if (hasScrolledIntoView(services)) {
            updateComponents('services');
        } else if (hasScrolledIntoView(milestones)) {
            updateComponents('milestones');
        } else if (hasScrolledIntoView(supporters)) {
            updateComponents('supporters');
        } else if (hasScrolledIntoView(blog)) {
            updateComponents('blog');
        } else if (hasScrolledIntoView(contact)) {
            updateComponents('contact');
        }
    }
});

function hasScrolledIntoHome() {
    var docViewTop = $(window).scrollTop();
    var elemTop = $('#home').offset().top;
    var elemBottom = elemTop + $('#home').height();
    return docViewTop <= (elemBottom - 320);
}

function hasScrolledIntoView(elem) {
    return isElementInView(elem, false);
}

function isElementInView(element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();
    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= (pageTop + 100)));
    }
}

function scrollToItem(itemId) {
    var rest = 0;
    if (itemId === 'home' || itemId === 'about') {
        rest = 48
    }
    $('html, body').animate({
                                scrollTop: $("#" + itemId).offset().top - $('#toolbar').height()
                                           - rest
                            }, 1000);
    updateComponents(itemId);
}