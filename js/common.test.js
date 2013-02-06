/*global dessert, module, test, raises, equal, ok */
(function () {
    module('common asserts');

    var v = dessert.validators;

    test("Value check", function () {
        equal(v.hasValue(null), true, "Null passes value assert");
        equal(v.hasValue(undefined), false, "Undefined fails value assert");
        equal(v.hasValue("foo"), true, "String passes value assert");
    });

    test("String assertion", function () {
        equal(v.isString("hello"), true, "String passes assertion");
        equal(v.isString(undefined), false, "Undefined fails string assertion");
        equal(v.isString(1), false, "Numeric (non-string) fails string assertion");
        equal(v.isString("hello", "blah"), true, "Success w/ longer argument list");
        equal(v.isString(null), false, "Failure (null instead of string)");
        equal(v.isString(null, "blah"), false, "Failure (null instead of string, w/ longer arg list)");
    });

    test("Function assertion", function () {
        equal(v.isFunction(function () {}), true, "Function passes assertion");
        equal(v.isFunction(), false, "Undefined fails string assertion");
        equal(v.isFunction("hello"), false, "String (non-function) fails string assertion");
    });

    test("Optional function assertion", function () {
        equal(v.isFunctionOptional(function () {}), true, "Function passes assertion");
        equal(v.isFunctionOptional(), true, "Undefined passes assertion");
        equal(v.isFunctionOptional('foo'), false, "String (non-function) fails string assertion");
    });

    test("Plain object assertion", function () {
        equal(v.isPlainObject({}), true, "Plain object passes assertion");
        equal(v.isPlainObject(Object.prototype), false, "`Object.prototype` fails assertion");
        equal(v.isPlainObject(Object.create({})), false, "Derived object fails assertion");
    });
}());
