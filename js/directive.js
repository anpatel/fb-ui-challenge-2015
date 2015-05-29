/*  called per event (after the list has already been created) */
calendar.directive('ngEvent', function() {
    return {
        restrict: 'E',
        templateUrl: 'event.html',
        scope: {
            model: '=ngModel', // event
            width: '=ngFrameWidth', // main container width
            adjust: '=ngAdjustment',
            columns: '=ngColumns'
        },
        link: function ($scope, $element) {
            var target = angular.element($element.children()[0]);
            var start = $scope.model.start;
            var end = $scope.model.end;

            target.css('margin-top', start + 'px');
            target.css('height', (end - start) + 'px');

            var widthFraction = 1 /( 1 + $scope.columns);  // Width and position Event from the left
            var columnWidth =  widthFraction * $scope.width;

            var leftMargin = columnWidth * $scope.model.column;
            target.css('width', columnWidth - $scope.adjust + 'px');
            target.css('margin-left', leftMargin + 'px');
        }
    };
});
