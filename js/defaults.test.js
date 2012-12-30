/*global dessert, module, test, raises, equal, ok */
(function () {
    module('defaults');

    test("String assertion", function () {
        equal(dessert.isString("hello"), dessert, "String passes assertion");

        raises(function () {
            dessert.isString();
        }, "Undefined fails string assertion");

        raises(function () {
            dessert.isString(1);
        }, "Numeric (non-string) fails string assertion");
    });

    test("Soft mode", function () {
        equal(dessert.isString("hello", true), true, "Success");
        equal(dessert.isString("hello", "blah", true), true, "Success w/ longer argument list");
        equal(dessert.isString(null, true), false, "Failure (null instead of string)");
        equal(dessert.isString(null, "blah", true), false, "Failure (null instead of string, w/ longer arg list)");
    });

    test("Function assertion", function () {
        equal(dessert.isFunction(function () {}), dessert, "Function passes assertion");

        raises(function () {
            dessert.isFunction();
        }, "Undefined fails string assertion");

        raises(function () {
            dessert.isFunction("hello");
        }, "String (non-function) fails string assertion");
    });

    test("Optional function assertion", function () {
        equal(dessert.isFunctionOptional(function () {}), dessert, "Function passes assertion");

        equal(dessert.isFunctionOptional(), dessert, "Undefined passes assertion");

        raises(function () {
            dessert.isFunctionOptional('foo');
        }, "String (non-function) fails string assertion");
    });

    test("Plain object assertion", function () {
        equal(dessert.isPlainObject({}), dessert, "Plain object passes assertion");

        raises(function () {
            dessert.isPlainObject(Object.prototype);
        }, "`Object.prototype` fails assertion");

        raises(function () {
            dessert.isPlainObject(Object.create({}));
        }, "Derived object fails assertion");
    });
}());
