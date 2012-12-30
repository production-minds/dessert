/**
 * Basic Dessert Validators
 */
/*global dessert */
dessert.addTypes({
    isString: function (expr) {
        return typeof expr === 'string';
    },

    isStringOptional: function (expr) {
        return typeof expr === 'undefined' ||
               typeof expr === 'string';
    },

    isBoolean: function (expr) {
        return typeof expr === 'boolean';
    },

    isBooleanOptional: function (expr) {
        return typeof expr === 'undefined' ||
               typeof expr === 'boolean';
    },

    isNumber: function (expr) {
        return typeof expr === 'number';
    },

    isNumberOptional: function (expr) {
        return typeof expr === 'undefined' ||
               typeof expr === 'number';
    },

    isFunction: function (expr) {
        return typeof expr === 'function';
    },

    isFunctionOptional: function (expr) {
        return typeof expr === 'undefined' ||
               typeof expr === 'function';
    },

    isObject: function (expr) {
        return expr instanceof Object;
    },

    isObjectOptional: function (expr) {
        return typeof expr === 'undefined' ||
               expr instanceof Object;
    },

    isPlainObject: function (expr) {
        return expr instanceof Object &&
               Object.getPrototypeOf(expr) === Object.prototype;
    },

    isArray: function (expr) {
        return expr instanceof Array;
    },

    isArrayOptional: function (expr) {
        return typeof expr === 'undefined' ||
               expr instanceof Array;
    },

    isRegExp: function (expr) {
        return expr instanceof RegExp;
    },

    isRegExpOptional: function (expr) {
        return typeof expr === 'undefined' ||
               expr instanceof RegExp;
    }
});
