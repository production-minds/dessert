Dessert
=======

**Extensible assertion library**

Simple assertion
----------------

`dessert.assert(expr, message)`

Argument `expr` is evaluated as boolean, `message` is optional.

On failure, assert throws an exception with the specified (or default) message. On success, assert returns the namespace `dessert`.

Adding custom validators
------------------------

`dessert.addType(methodName, validator)`

Argument `methodName` is as the validator method would appear on the namespace.

Validator is a function returning a boolean depending on whether validation passes or fails.

String assertions
-----------------

- `.isString(expr)`: Whether `expr` is string (using `typeof`).
- `.isStringOptional(expr)`: Whether `expr` is string or `undefined`.
- `.isStringStrict(expr)`: Whether `expr` is a `String` object.

Function assertions
-----------------

- `.isFunction(expr)`: Whether `expr` is function.
- `.isFunctionOptional(expr)`: Whether `expr` is function or `undefined`.
