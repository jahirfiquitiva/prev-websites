var dark = false;
var hasLoadedTheme = false;

loadTheme();

function loadParticles() {
    particlesJS.load('particles-bg',
                     dark ? '/assets/config/particles-dark.json'
                         : '/assets/config/particles.json',
                     function () {
                         console.log('Particles ready! :D');
                         // setCookie("theme", dark, 7);
                     });
}

function toggleTheme() {
    localStorage.setItem('theme', !dark ? 'dark' : 'light');
    loadTheme();
}

function loadTheme() {
    var saved = localStorage.getItem('theme');
    dark = saved !== null && saved !== undefined && saved === 'dark';
    
    if (!dark && !hasLoadedTheme) {
        hasLoadedTheme = true;
        loadParticles();
        return;
    }

    var theme = dark ? "#212121" : "#F5F5F5";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", theme);
    document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content", theme);
    document.querySelector('meta[name="msapplication-navbutton-color"]')
        .setAttribute("content", theme);
        
    try {
        var snack = dark ? "snackbar-dark" : "snackbar";
        document.getElementById('snack_css').href = "/assets/css/" + snack + ".css";
    } catch (err) {
    }

    var name = dark ? "jahir-dark" : "jahir";
    document.getElementById('theme_css').href = "/assets/css/" + name + ".css";

    var logoName = dark ? "logo-small-white" : "logo-small";
    document.getElementById('logo').setAttribute("src", "/assets/img/" + logoName + ".svg");
    
    hasLoadedTheme = true;
    loadParticles();
}

function scrollToItem(itemId) {
    try {
        var top = 0;
        if (itemId !== null && itemId !== undefined) {
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = document.getElementById(itemId).getBoundingClientRect();
            top = elemRect.top - bodyRect.top;
            // top = $("#" + itemId).offset().top;
            top = top - convertRemToPixels(7);
        }
        // $('html, body').stop().animate({scrollTop: top}, 1000);
        document.body.scrollTop = document.documentElement.scrollTop = top;
    } catch (err) {
    }
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function submitForm() {
    var email = document.getElementById('email').value;
    if (email !== null && email !== undefined) {
        if (validateEmail(email)) {
            var response = grecaptcha.getResponse();
            if (response === null || response === undefined || response.length === 0) {
                showSnack("captcha-snack");
                return false;
            } else {
                return true;
            }
        } else {
            showSnack("email-snack");
            return false;
        }
    } else {
        return false;
    }
}

function showSnack(elementId) {
    var x = document.getElementById(elementId);
    if (x !== null) {
        x.className = "snackbar show";
        setTimeout(function () {
            x.className = x.className.replace("snackbar show", "snackbar");
        }, 3000);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}