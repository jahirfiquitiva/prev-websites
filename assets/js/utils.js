// noinspection ES6ConvertVarToLetConst
var StringUtil = {};

StringUtil.format = function (string, value) {
    return string.replace(/\${}/g, value);
};