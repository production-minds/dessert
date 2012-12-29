Dessert
=======

**Extensible assertion library**

Simple assertion
----------------

`dessert.assert(expr, message)`

Argument `expr` is evaluated as boolean, `message` is optional.

On failure, assert throws an exception with the specified (or default) message. On success, assert returns the namespace `dessert`.

String assertions
-----------------

- `.isString(expr)`: Whether `expr` is string (using `typeof`).
- `.isStringOptional(expr)`: Whether `expr` is string or `undefined`.
- `.isStringStrict(expr)`: Whether `expr` is a `String` object.
