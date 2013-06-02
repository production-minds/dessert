/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    var params = {
        files: [
            'js/license.js',
            'js/dessert.js',
            'js/common.js',
            'js/exports.js'
        ],

        test: 'js/jsTestDriver.conf',

        globals: {}
    };

    // invoking common grunt process
    require('common-gruntfile')(grunt, params);
};
