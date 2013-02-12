var dessert;

(function () {
    /**
     * @type function
     */
    var customHandler;

    /** @namespace */
    dessert = {
        /**
         * Namespace for custom validators
         */
        validators: {},

        /**
         * Asserts an expression.
         * @param expr {boolean} Boolean expression to evaluate.
         * @param [message] {string} Optional message
         * @return {dessert}
         */
        assert: function (expr, message) {
            var throwException = true;
            if (!expr) {
                if (typeof customHandler === 'function') {
                    throwException = customHandler.call(this, message);
                }
                if (throwException !== false) {
                    throw new Error(message || "Dessertion failed.");
                }
            } else {
                return this;
            }
        },

        /**
         * Setter for global handler.
         * @param value {function|undefined}
         */
        customHandler: function (value) {
            customHandler = value;
            return this;
        },

        /**
         * Adds a new validator.
         * @param methodName {string} Name of new method
         * @param validator {function} Function validating a given type.
         * In it, `this` will refer to the `validators` namespace containing
         * all available validators. Expected to return boolean.
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

                // wrapping and adding validator to main namespace
                this[methodName] = function () {
                    // executing validator
                    var success = validator.apply(validators, arguments),
                        message = Array.prototype.pop.apply(arguments);

                    that.assert(
                        success,
                        typeof message === 'string' ?
                            message :
                            undefined
                    );

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
         * @param methods {object}
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
