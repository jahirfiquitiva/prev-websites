/**
 * Created by jahir on 6/28/17.
 */
function loadColors(e, applyToParent) {
    var image = e.target;
    try {
        var vibrant = new Vibrant(image);
        if (vibrant !== null) {
            var swatches = vibrant.swatches();
            var realSwatches = [];
            for (var swatch in swatches) {
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                    if (swatch !== null && swatch !== undefined) {
                        realSwatches.push(swatches[swatch]);
                    }
                }
            }
            realSwatches.sort(compare);
            var oldColor = realSwatches[realSwatches.length - 1].getHex();
            console.log(oldColor);
            if (applyToParent) {
                e.target.parentNode.style.backgroundColor = hexToRgbA(oldColor, 0.5);
            } else {
                e.target.style.backgroundColor = hexToRgbA(oldColor, 1);
            }
        }
    } catch (err) {
    }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToRgbA(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function isLightColor(color) {
    if (color === null) {
        return null;
    }
    var r = color.r;
    var g = color.g;
    var b = color.b;
    if (r === 0 && g === 0 && b === 0) {
        return true;
    } else if (r === 255 && g === 255 && b === 255) {
        return false;
    } else {
        return (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255) < 0.475;
    }
}

function compare(a, b) {
    if (a !== null && a !== undefined && b !== null && b !== undefined) {
        if (a.getPopulation() < b.getPopulation()) {
            return -1;
        } else if (a.getPopulation() > b.getPopulation()) {
            return 1;
        } else {
            return 0;
        }
    } else {
        return -1;
    }
}