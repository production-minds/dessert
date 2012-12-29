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

        /**
         * Adds a new assertion method.
         * @param methodName {string} Name of new method
         * @param validator {function} Function validating a given type.
         * In it, `this` will refer to the `dessert` namespace.
         */
        addType: function (methodName, validator) {
            dessert
                .isString(methodName)
                .isFunction(validator);

            if (!dessert.hasOwnProperty(methodName)) {
                dessert[methodName] = function () {
                    validator.apply(dessert, arguments);
                    return dessert; // making sure method returns namespace
                };
            } else {
                throw Error("Assertion type already taken.");
            }

            return dessert;
        }
    };
}());
