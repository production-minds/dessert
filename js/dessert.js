var dessert;

(function () {
    dessert = {
        /**
         * Asserts an expression.
         * @param expr {boolean} Boolean expression to evaluate.
         * @param [message] {string} Optional message
         * @return {dessert}
         */
        assert: function (expr, message) {
            if (!expr) {
                throw new Error(message || "Dessertion failed.");
            } else {
                return dessert;
            }
        },

        /**
         * Adds a new validator.
         * @param methodName {string} Name of new method
         * @param validator {function} Function validating a given type.
         * In it, `this` will refer to the `dessert` namespace.
         * Expected to return boolean.
         */
        addType: function (methodName, validator) {
            if (typeof methodName === 'string' &&
                typeof validator === 'function'
                ) {
                if (!dessert.hasOwnProperty(methodName)) {
                    dessert[methodName] = function () {
                        var success = validator.apply(dessert, arguments);
                        // checking last argument for indication of soft mode
                        if (Array.prototype.pop.call(arguments) === true) {
                            // soft mode: skipping actual assertion
                            return success;
                        } else {
                            dessert.assert(success);
                            return dessert; // making sure method returns namespace
                        }
                    };
                } else {
                    throw Error("Custom assertion name ('" + methodName + "') already taken.");
                }
            }

            return dessert;
        },

        /**
         * Adds new validator(s).
         * In a validator function, `this` will refer to the `dessert` namespace.
         * Expected to return boolean.
         * IMPORTANT: `.addTypes()` is preferable to `.addType()`, for IDE integration reasons,
         * even when adding a single type.
         * @param methods {object}
         */
        addTypes: function (methods) {
            dessert
                .assert(methods instanceof Object);

            var methodName,
                validator;

            for (methodName in methods) {
                if (methods.hasOwnProperty(methodName)) {
                    validator = methods[methodName];
                    dessert.addType(methodName, validator);
                }
            }

            return dessert;
        }
    };

    /**
     * Adding basic validators
     */
    dessert.addTypes({
        isString: function (expr) {
            return typeof expr === 'string';
        },

        isStringOptional: function (expr) {
            return (
                typeof expr === 'undefined' ||
                typeof expr === 'string'
                );
        },

        isStringStrict: function (expr) {
            return expr instanceof String;
        },

        isFunction: function (expr) {
            return typeof expr === 'function';
        },

        isFunctionOptional: function (expr) {
            return (
                typeof expr === 'undefined' ||
                typeof expr === 'function'
                );
        },

        isObject: function (expr) {
            return expr instanceof Object;
        },

        isObjectOptional: function (expr) {
            return (
                typeof expr === 'undefined' ||
                expr instanceof Object
                );
        },

        isPlainObject: function (expr) {
            return (
                expr instanceof Object &&
                Object.getPrototypeOf(expr) === Object.prototype
                );
        },

        isArray: function (expr) {
            return expr instanceof Array;
        },

        isArrayOptional: function (expr) {
            return (
                typeof expr === 'undefined' ||
                expr instanceof Array
                );
        }
    });
}());
