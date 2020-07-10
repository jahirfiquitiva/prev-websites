function setup() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let logo = document.getElementById('logo');
    let logoName = 'def';
    // TODO: Add more month-styled logos
    if (month === 6) {
        logoName = '6';
    }
    if (logo !== null && logo !== undefined) {
        logo.setAttribute('src', '/assets/img/brand/logo-' + logoName + '.svg');
        logo.setAttribute('onerror',
                          'this.onerror=null;' +
                          'this.src=\'/assets/img/brand/logo-' + logoName + '.png\'');
    }

    let copy = document.getElementById('copyright-notice');
    if (copy !== null && copy !== undefined) {
        copy.innerHTML = 'Copyright © ' + date.getFullYear() + '<br>All Rights Reserved';
    }

    let years = document.getElementById('age-text');
    if (years !== null && years !== undefined) {
        years.innerHTML = (date.getFullYear() - 1997).toString();
    }

    let hasContactEle = document.querySelector('meta[property="has-contact"]');
    let hasContact = hasContactEle && hasContactEle.getAttribute("content");
    if (hasContact !== undefined && hasContact !== null) {
        if (hasContact === "true") {
            let contactScript = document.createElement("script");
            contactScript.type = "text/javascript";
            contactScript.src = "/assets/js/email.min.js";
            document.body.appendChild(contactScript);

            let captchaScript = document.createElement("script");
            captchaScript.type = "text/javascript";
            captchaScript.src = "https://www.google.com/recaptcha/api.js";
            document.body.appendChild(captchaScript);

            let emailScript = document.createElement("script");
            emailScript.type = "text/javascript";
            emailScript.src = "https://smtpjs.com/v2/smtp.js";
            document.body.appendChild(emailScript);
        }
    }
    updateDonationLink();
}

function updateDonationLink(fire = false) {
    let donationField = document.getElementById('donation-input');
    let currencySelector = document.getElementById('currency-selector');
    let donateBtn = document.getElementById('donate-btn');
    if (donationField !== undefined && donationField !== null &&
        currencySelector !== undefined && currencySelector !== null &&
        donateBtn !== undefined && donateBtn !== null) {
        let amount = 5;
        let currency = "USD";
        try {
            amount = donationField.value;
            currency = currencySelector.options[currencySelector.selectedIndex].value;
        } catch (e) {
            console.error(e)
        }
        donateBtn.href =
            "https://www.paypal.me/jahirfiquitiva/" + amount.toString() +
            currency.toString().toLowerCase();
        if (fire) {
            donateBtn.click();
        }
    }
}

function launchDonationSite(event) {
    event.preventDefault();
    let code = 0;
    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyIdentifier !== undefined) {
        code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }
    if (code === 13) {
        updateDonationLink(true);
    }
}

function loadParticles() {
    particlesJS.load('particles-bg', '/assets/config/particles.json',
                     function () {
                         console.log('Particles ready! :D');
                     });
}

document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    let navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if (navbarBurgers.length > 0) {
        // Add a click event on each of them
        navbarBurgers.forEach(function (el) {
            el.addEventListener('click', function () {
                // Get the target from the "data-target" attribute
                let target = el.dataset.target;
                let rTarget = document.getElementById(target);
                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                rTarget.classList.toggle('is-active');
            });
        });
    }
    setup();
    loadParticles();
});