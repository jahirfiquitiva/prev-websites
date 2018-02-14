/**
 * Created by jahir on 6/28/17.
 */
function closeDrawer() {
    $('.button-collapse').sideNav('hide');
    $('#sidenav-overlay').trigger('click');
}

function updateComponents(sectionId) {
    var items = document.getElementsByClassName("drawer-item");
    for (var i = 0; i < items.length; i++) {
        items[i].className = "drawer-item";
    }
    var itemId = 0;
    switch (sectionId) {
        case "home":
            itemId = 0;
            break;
        case "about":
            itemId = 1;
            break;
        case "skills":
            itemId = 2;
            break;
        case "portfolio":
            itemId = 3;
            break;
        case "services":
            itemId = 4;
            break;
        case "milestones":
            itemId = 5;
            break;
        case "supporters":
            itemId = 6;
            break;
        case "blog":
            itemId = 7;
            break;
        case "contact":
            itemId = 8;
            break;
    }
    items[itemId].className = "drawer-item active-item";
    items[itemId + 9].className = "drawer-item active-item";
    currentSection = sectionId;
}

$(function () {
    $('#contact-form').submit(function () {
        var email = $("#email").val();
        if (validateEmail(email)) {
            var response = grecaptcha.getResponse();
            if (response === null || response === undefined) {
                return false;
            }
            if (response.length === 0) {
                Materialize.toast('Please confirm you are human', 2500);
                return false;
            } else {
                return true;
            }
        } else {
            Materialize.toast('Please enter a correct email address', 2500);
            return false
        }
    })
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}