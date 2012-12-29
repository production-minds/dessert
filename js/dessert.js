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
        }
    };
}());
