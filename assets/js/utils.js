// noinspection ES6ConvertVarToLetConst
let StringUtil = {};

StringUtil.format = function (string, value) {
    return string.replace(/\${}/g, value);
};

function fade(el, type, ms, display) {
    let isIn = type === 'in',
        opacity = isIn ? 0 : 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;

    if (isIn) {
        el.style.display = display || 'block';
        el.style.opacity = opacity;
    }

    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        el.style.opacity = opacity;

        if (opacity <= 0) {
            el.style.display = 'none'
        }
        if (opacity <= 0 || opacity >= 1) {
            window.clearInterval(fading);
        }
    }

    let fading = window.setInterval(func, interval);
}