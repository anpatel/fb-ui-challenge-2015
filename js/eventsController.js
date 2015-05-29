calendar.controller('events', ['$scope', '$filter',  'eventFactory',
    function($scope, $filter, eventFactory) {
        $scope.setEvents = function (events) {
            var orderedEvents = $filter('orderBy')(events, ['start', '-end']);
            /*
            * NOTE:
            * The event list is bound once. Since AngularJS is being used,
            * using ng-repeat on large collections can take a toll on performance (due to the scope limitation),
            * this affects performance if the list is calculated via a method call i.e. getEventCollection() in the markup
            * or something like a filter is used inline.
            * In the following the list is bound in the beginning and never touched again therefore should not cause issues
            * with large data. The filter is also being applied once above, which, inline in an ng-repeat is known to
            * cause performance issues.
            * */
            $scope.events = eventFactory.createEvents(orderedEvents);
        };
        $scope.setEvents(layouts.defaultLayout);
        $scope.rowColumns = eventFactory.getRowColumns();
}]);