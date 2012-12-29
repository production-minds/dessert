/*global dessert, module, test, raises, equal */
(function () {
    module('dessert');

    test("General assertion", function () {
        equal(dessert.assert(true), dessert, "Assertion success returns namespace");

        raises(function () {
            dessert.assert(false);
        }, "Failed assertion raises exception");
    });

    test("String assertion", function () {
        equal(dessert.isString("hello"), dessert, "String passes assertion");

        raises(function () {
            dessert.isString();
        }, "Undefined fails string assertion");

        raises(function () {
            dessert.isString(1);
        }, "Numeric fails string assertion");
    });
}());
