/*global dessert, module, test, raises, equal, ok */
(function () {
    module('defaults');

    test("Value check", function () {
        equal(dessert.hasValue(null, true), true, "Null passes value assert");
        equal(dessert.hasValue(undefined, true), false, "Undefined fails value assert");
        equal(dessert.hasValue("foo", true), true, "String passes value assert");
    });

    test("String assertion", function () {
        equal(dessert.isString("hello", true), true, "String passes assertion");
        equal(dessert.isString(undefined, true), false, "Undefined fails string assertion");
        equal(dessert.isString(1, true), false, "Numeric (non-string) fails string assertion");
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
