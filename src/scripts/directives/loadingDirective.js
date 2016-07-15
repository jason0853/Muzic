module.exports = function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div><img src="assets/img/spinner.gif"/></div>',
        link: function(scope, elem, attrs) {
            if (scope.loading) {
                elem.addClass('loading');
            } else {
                elem.removeClass('loading');
            }
        }
    }
};
