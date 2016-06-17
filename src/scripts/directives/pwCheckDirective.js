module.exports = function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=pwCheck'
        },
        link: function(scope, elem, attrs, ngModel) {
            ngModel.$validators.pwCheck = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    }
};
