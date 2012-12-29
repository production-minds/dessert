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

        isString: function (expr) {
            return this.assert(typeof expr === 'string');
        },

        isStringOptional: function (expr) {
            return this.assert(
                typeof expr === 'undefined' ||
                typeof expr === 'string'
            );
        },

        isStringStrict: function (expr) {
            return this.assert(expr instanceof String);
        },

        isFunction: function (expr) {
            return this.assert(typeof expr === 'function');
        },

        isFunctionOptional: function (expr) {
            return this.assert(
                typeof expr === 'undefined' ||
                typeof expr === 'function'
            );
        },

        isObject: function (expr) {
            return this.assert(expr instanceof Object);
        },

        isObjectOptional: function (expr) {
            return this.assert(
                typeof expr === 'undefined' ||
                expr instanceof Object
            );
        },

        isArray: function (expr) {
            return this.assert(expr instanceof Array);
        },

        isArrayOptional: function (expr) {
            return this.assert(
                typeof expr === 'undefined' ||
                expr instanceof Array
            );
        },

        /**
         * Adds a new assertion method.
         * @param methodName {string} Name of new method
         * @param validator {function} Function validating a given type.
         * In it, `this` will refer to the `dessert` namespace.
         * Expected to return boolean.
         */
        addType: function (methodName, validator) {
            dessert
                .isString(methodName)
                .isFunction(validator);

            if (!dessert.hasOwnProperty(methodName)) {
                dessert[methodName] = function () {
                    dessert.assert(validator.apply(dessert, arguments));
                    return dessert; // making sure method returns namespace
                };
            } else {
                throw Error("Custom assertion name ('" + methodName + "') already taken.");
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
}());
