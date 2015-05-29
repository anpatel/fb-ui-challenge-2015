calendar.controller('time', function($scope) {
    /*
    *   Create time object for the left panel
    * */
    function getHourCollection() {
        var timeCollection = [];
        for (var i = 0; i < 12; i++) {
            timeCollection.push({
                hour: i < 4 ? i + 9 : i + 9 - 12,
                ampm: i < 3 ? "AM" : "PM"
            });
        }
        return timeCollection;
    }
    $scope.timeCollection = getHourCollection();
});