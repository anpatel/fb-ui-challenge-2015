var factories = angular.module('factories', []);
var calendar = angular.module('FBDayCalendar', [ 'factories' ]);

/*  Global function to layOutDay */
function layOutDay(events) {
	var scope = $('.event-frame').scope();
	scope.$apply(function(){
		scope.setEvents(events);
	});
}