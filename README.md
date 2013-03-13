Dessert
=======

**Extensible assertion library**

Simple assertion
----------------

For asserting a boolean expression with an optional message or messages.

`dessert.assert(expr, message)`

On failure, ie. when expr is falsey, assert throws an exception with the specified message. On success, assert returns the namespace `dessert`, thus making asserts chainable.

Note that while only the first argument is used for detecting failure, any number of arguments may be passed to `.assert()` and all of those arguments will end up in the assertion message, in their original order.

Default assertions
------------------

Dessert comes with a set of default assertion methods, each testing for a specific type. Most are adequately described by their names. Methods suffixed with "Optional" allow `expr` to be undefined.

- `.hasValue(expr)`: tests whether `expr` is not `undefined`
- `.isString(expr)`
- `.isStringOptional(expr)`
- `.isBoolean(expr)`
- `.isBooleanOptional(expr)`
- `.isNumber(expr)`
- `.isNumberOptional(expr)`
- `.isFunction(expr)`
- `.isFunctionOptional(expr)`
- `.isObject(expr)`
- `.isObjectOptional(expr)`
- `.isPlainObject(expr)`: tests whether `expr` is a direct descendant of `Object.prototype`, eg. when it's declared as an object literal.
- `.isArray(expr)`
- `.isArrayOptional(expr)`
- `.isRegExp(expr)`
- `.isRegExpOptional(expr)`
- `.isDate(expr)`
- `.isDateOptional(expr)`
- `.isJQuery(expr)`
- `.isJQueryOptional(expr)`

Assertions, default or user-defined (default assertions are added the same way user-defined ones are), may be invoked as follows:

```javascript
dessert.isString(myString, myMessage);
```

User-defined assertions
-----------------------

In order to extend Dessert with your own assertions, you'll need to add validators using Dessert's API created for this specific purpose. Validators are functions that take any number of arguments, and return `true` if the arguments satisfy the condition, and `false` if they don't.

There are two ways of adding validators. The shorter one takes a method name and a validator function:

`dessert.addType(methodName, validator)`

However, for code clarity and aiding IDEs in identifying methods, there's another way for validator addition, where multiple functions may be batched together in a single object:

```javascript
dessert.addTypes({
    methodName: validator,
    methodName2: validator2
});
```

When a user-defined assertion is invoked as `dessert.methodName()`, the validator is first evaluated, then its result and all arguments are passed to `dessert.assert()`.

Validator composition
---------------------

It is often necessary to invoke a validator from another validator, thus composing new validators out of existing ones. Existing validators may be accessed on the context object (`this`) of every validator added using either `.addType()` or `.addTypes()`.

Example:

```javascript
dessert.addTypes({
    isBigArray: function (expr) {
        return this.isArray(expr) && expr.length > 1000;
    }
});
```

Accessing validators from code
------------------------------

There may be occasions when it would be fit to use an assertion validator without actually asserting the result. To this end, validators may be accessed directly through `dessert.validators`.

```javascript
var success = dessert.validators.isObject(1); // false
```

Global custom handler
---------------------

For each assertion our application may have to run some custom code dealing with user output or logging. A custom handler may be specified via the method `.customHandler()`. A custom handler may return `false`, preventing the assertion mechanism to throw an exception.

Example:

```javascript
dessert.customHandler(function () {
    alert("this is a very intrusive assertion");

    // don't throw assertion
    return false;
});

dessert.assert(false, "foo"); // will pop up alert window, won't throw exception
```

The custom handler may be removed as:

`dessert.customHandler(undefined);`

Although it is assumed that the custom handler is global in the scope of the application.
