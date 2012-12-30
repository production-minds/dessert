/*global dessert, module, test, raises, equal, ok */
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
        }, "Numeric (non-string) fails string assertion");
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

    test("Type addition", function () {
        ok(!dessert.hasOwnProperty('test'), "New type is not pre-existing (sanity check)");

        raises(function () {
            dessert.addType(1, function () {});
        }, "Invalid methodName passed");

        raises(function () {
            dessert.addType('test', 'foo');
        }, "Invalid validator passed (non-function)");

        dessert.addType('test', function (expr) {
            // returning a boolean expression to be passed to `.assert`
            return expr === 'test';
        });

        ok(dessert.hasOwnProperty('test'), "New property added to namespace");

        raises(function () {
            dessert.addType('test', function () {});
        }, "Attempting to overwrite custom validator");

        equal(dessert.test('test'), dessert, "Custom assertion passed");

        raises(function () {
            dessert.test('foo');
        }, "Custom assertion failed");

        // cleanup
        delete dessert.test;
    });

    test("Multiple type addition", function () {
        ok(!dessert.hasOwnProperty('test'), "New type is not pre-existing (sanity check)");

        dessert.addTypes({
            test: function (expr) {
                // returning a boolean expression to be passed to `.assert`
                return expr === 'test';
            }
        });

        equal(dessert.test('test'), dessert, "Custom assertion passed");

        raises(function () {
            dessert.test('foo');
        }, "Custom assertion failed");

        // cleanup
        delete dessert.test;
    });
}());
