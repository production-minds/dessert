/**
 * Common Dessert Validators
 */
/*global dessert, jQuery */
(function () {
    "use strict";

    dessert.addTypes(/** @lends dessert */{
        hasValue: function (expr) {
            return typeof expr !== 'undefined';
        },

        isString: function (expr) {
            return typeof expr === 'string' ||
                   expr instanceof String;
        },

        isStringOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'string' ||
                   expr instanceof String;
        },

        isBoolean: function (expr) {
            return typeof expr === 'boolean' ||
                   expr instanceof Boolean;
        },

        isBooleanOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'boolean' ||
                   expr instanceof Boolean;
        },

        isNumber: function (expr) {
            return typeof expr === 'number' ||
                   expr instanceof  Number;
        },

        isNumberOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'number' ||
                   expr instanceof  Number;
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
        },

        isDate: function (expr) {
            return expr instanceof Date;
        },

        isDateOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   expr instanceof Date;
        },

        /**
         * Agnostic as to whether jQuery is present.
         */
        isJQuery: function (expr) {
            return jQuery instanceof Object &&
                   expr instanceof jQuery;
        },

        isJQueryOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   jQuery instanceof Object &&
                   expr instanceof jQuery;
        }
    });
}());
