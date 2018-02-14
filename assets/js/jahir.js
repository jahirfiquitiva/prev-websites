/*
 * Copyright (c) 2017. Jahir Fiquitiva. Graphic Design and Android Development Enthusiast. All rights reserved.
 */
var lastSelected = "all";

$(document).ready(function () {
    $(".filter-button").click(function () {
        var value = $(this).attr("data-filter");
        if (value === lastSelected) {
            return false;
        }
        if (value === "all") {
            $("#portfolio-grid").fadeOut(250, function () {
                $(".portfolio").fadeIn(0, function () {
                    $("#portfolio-grid").fadeIn(250);
                });
            });
        } else {
            $("#portfolio-grid").fadeOut(250, function () {
                $(".portfolio").not("." + value).fadeOut(0);
                $(".portfolio").filter("." + value).fadeIn(0, function () {
                    $("#portfolio-grid").fadeIn(250);
                });
            });
        }
        $(this).addClass('active').siblings().removeClass('active');
        lastSelected = value;
        return false;
    });
});

function scrollToItem(itemId) {
    $('html, body').stop().animate({scrollTop: $("#" + itemId).offset().top}, 1000);
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
                showSnack("captcha-snack");
                return false;
            } else {
                return true;
            }
        } else {
            showSnack("email-snack");
            return false;
        }
    })
});

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
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}