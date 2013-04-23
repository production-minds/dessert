/**
 * Common Dessert Validators
 */
/*global dessert, jQuery */
(function () {
    "use strict";

    dessert.addTypes(/** @lends dessert */{
        hasValue: function hasValue(expr) {
            return typeof expr !== 'undefined';
        },

        isString: function isString(expr) {
            return typeof expr === 'string' ||
                   expr instanceof String;
        },

        isStringOptional: function isStringOptional(expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'string' ||
                   expr instanceof String;
        },

        isBoolean: function isBoolean(expr) {
            return typeof expr === 'boolean' ||
                   expr instanceof Boolean;
        },

        isBooleanOptional: function isBooleanOptional(expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'boolean' ||
                   expr instanceof Boolean;
        },

        isNumber: function isNumber(expr) {
            return typeof expr === 'number' ||
                   expr instanceof  Number;
        },

        isNumberOptional: function isNumberOptional(expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'number' ||
                   expr instanceof  Number;
        },

        isFunction: function isFunction(expr) {
            return typeof expr === 'function';
        },

        isFunctionOptional: function isFunctionOptional(expr) {
            return typeof expr === 'undefined' ||
                   typeof expr === 'function';
        },

        isObject: function isObject(expr) {
            return expr instanceof Object;
        },

        isObjectOptional: function isObjectOptional(expr) {
            return typeof expr === 'undefined' ||
                   expr instanceof Object;
        },

        isPlainObject: function isPlainObject(expr) {
            return expr instanceof Object &&
                   Object.getPrototypeOf(expr) === Object.prototype;
        },

        isArray: function isArray(expr) {
            return expr instanceof Array;
        },

        isArrayOptional: function isArrayOptional(expr) {
            return typeof expr === 'undefined' ||
                   expr instanceof Array;
        },

        isRegExp: function isRegExp(expr) {
            return expr instanceof RegExp;
        },

        isRegExpOptional: function isRegExpOptional(expr) {
            return typeof expr === 'undefined' ||
                   expr instanceof RegExp;
        },

        isDate: function isDate(expr) {
            return expr instanceof Date;
        },

        isDateOptional: function isDateOptional(expr) {
            return typeof expr === 'undefined' ||
                   expr instanceof Date;
        },

        /**
         * Agnostic as to whether jQuery is present.
         */
        isJQuery: function isJQuery(expr) {
            return jQuery instanceof Object &&
                   expr instanceof jQuery;
        },

        isJQueryOptional: function isJQueryOptional(expr) {
            return typeof expr === 'undefined' ||
                   jQuery instanceof Object &&
                   expr instanceof jQuery;
        }
    });
}());
