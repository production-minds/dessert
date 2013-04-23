var dessert;

(function () {
    "use strict";

    /**
     * @type function
     */
    var customHandler;

    /**
     * @class dessert
     */
    dessert = {
        /**
         * Namespace for custom validators
         * @dict
         */
        validators: {},

        /**
         * Asserts an expression.
         * @param {boolean|function} expr Boolean expression or validator function.
         * @return {dessert}
         */
        assert: function (expr) {
            var args,
                throwException,
                message;

            if (typeof expr === 'function') {
                // expression is a validator
                args = Array.prototype.slice.call(arguments, 1);
                expr = expr.apply(this.validators, args);
            }

            if (!expr) {
                if (typeof customHandler === 'function') {
                    // passing control to custom handler
                    throwException = customHandler.apply(this, arguments);
                }

                if (throwException !== false) {
                    // args may already be calculated
                    args = args || Array.prototype.slice.call(arguments, 1);

                    // joining message parts together
                    message = args.join(' ');
                    throw new Error("Dessertion failed: " + message);
                }
            }

            return this;
        },

        /**
         * Setter for global handler.
         * @param {function|undefined} value
         * @return {dessert}
         */
        customHandler: function (value) {
            customHandler = value;
            return this;
        },

        /**
         * Adds a new validator.
         * @param {string} methodName Name of new method
         * @param {function} validator Function validating a given type.
         * In it, `this` will refer to the `validators` namespace containing
         * all available validators. Expected to return boolean.
         * @return {dessert}
         */
        addType: function (methodName, validator) {
            this.assert(
                typeof methodName === 'string' &&
                typeof validator === 'function'
            );

            var that = this,
                validators = this.validators;

            if (!this.hasOwnProperty(methodName)) {
                // adding validator to validator pool
                validators[methodName] = validator;

                /**
                 * Wrapping and adding validator to main namespace
                 * @returns {dessert}
                 */
                this[methodName] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(validator);

                    // calling assert with prepared arguments
                    that.assert.apply(that, args);

                    // making sure method returns namespace
                    return that;
                };
            } else if (validators[methodName] !== validator) {
                this.assert(false, "Custom assertion name ('" + methodName + "') already taken.");
            }

            return this;
        },

        /**
         * Adds new validator(s).
         * In a validator function, `this` will refer to the `dessert` namespace.
         * Expected to return boolean.
         * IMPORTANT: `.addTypes()` is preferable to `.addType()`, for IDE integration reasons,
         * even when adding a single type.
         * @param {object} methods
         * @return {dessert}
         */
        addTypes: function (methods) {
            this.assert(methods instanceof Object);

            var methodName,
                validator;

            for (methodName in methods) {
                if (methods.hasOwnProperty(methodName)) {
                    validator = methods[methodName];
                    this.addType(methodName, validator);
                }
            }

            return this;
        }
    };
}());
