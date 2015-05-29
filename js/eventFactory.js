/*
*  This is where majority of the processing of events happens
* */

factories.factory('eventFactory', function(){
    /*
    *  EventsFac - eventFactory
    *  eventCollection - main collection of events according to Event as defined in event.js
    *  previousEvent - the event before the current one being processed
    *  rowColumns - Array for the # of columns in each row
    *  currentRow - The index of the row we are processing (so we can just access the number of columns on demand if need be)
    *
    *  NOTE: the shortest event is the column in the current row with the smallest height
    * */

    var EventsFac = {};
    var eventCollection = [];
    var previousEvent = {};
    var rowColumns = [];
    var currentRow = 0;

    /*
    *  set the previousEvent so we can access it as we need it
    * */
    function setPreviousEvent(event) {
        previousEvent = eventCollection[event.idx - 1];
    }

    /*
    *  If the event is conflicting with others in anyway, position it appropriately
    *  otherwise create a new row
    * */
    function setUpEvent(event){
        setPreviousEvent(event);
        if (angular.isDefined(previousEvent)
            && (previousEvent.shortest < event.idx
            && previousEvent.height > event.start
            || previousEvent.tallestHeight > event.start)) {
            positionEvent(event);
        }  else {
            currentRow++;
            event.row = currentRow;
            rowColumns.push(0);
        }

        if (angular.isDefined(previousEvent)) {
            event.tallestHeight = previousEvent.tallestHeight > event.end ? previousEvent.tallestHeight : event.end;
        }
    }

    /*
    *  Helper function for positionEvent
    *  - gets the index of the shortest event in the row
    *  - only called when the shortest column in the row has space for the current event
    */
    function getShortestEventIndex(event) {
        var j = event.idx;
        var min = event.idx;
        while (!eventCollection[j].begin) { // Check until the beginning of the row
            if (eventCollection[j].column == event.column) { // Adjust the height for the current column
                eventCollection[j].height = event.height;
            }

            if (eventCollection[j].height < eventCollection[min].height) { // Look for a new shortest column
                min = j;
            }
            j--;
        }
        min = eventCollection[j].height < eventCollection[min].height ? j : min;
        return min;
    }

    /*
    *  Fill the space under the shortest event
    * */
    function fillSpace(event, shortestEvent) {
        event.column = shortestEvent.column;
        rowColumns[event.row] = Math.max(rowColumns[event.row], rowColumns[shortestEvent.row]);
        shortestEvent.height = event.end;
    }

    /*
    * add column to existing row
    * */
    function addColumn(event) {
        rowColumns[currentRow] = rowColumns[currentRow] + 1;
        event.column = rowColumns[currentRow];
    }

    /*
    *  Place it in an appropriate space if one exists otherwise create a new column for it
    * */
    function positionEvent(event) {
        event.begin = false;
        var shortestEvent = eventCollection[previousEvent.shortest];
        event.row = currentRow;
        if (shortestEvent.height <= event.start) {
            fillSpace(event, shortestEvent);
            var calculatedMin = getShortestEventIndex(event); // Get index of the event inside a column with the shortest height
            event.shortest = eventCollection[calculatedMin].height < event.height ? calculatedMin : event.idx;
        } else {
            addColumn(event);
            event.shortest = shortestEvent.height < event.height ? shortestEvent.idx : event.idx;
        }
    }

    /*
    *  Create the event using all of the tools created above
    * */
    EventsFac.createEvents = function(events) {
        eventCollection = [];
        angular.forEach(events, function(event, i) {
            eventCollection.push(new Event(event.start, event.end, i)); // Copy events into a new array;
        });

        rowColumns.push(0);
        eventCollection.map(function(event){
            setUpEvent(event);
        });
        return eventCollection;
    };

    /*
     *  Passed to the event directive to calculate the appropriate width for the event
     * */
    EventsFac.getRowColumns = function () {
        return rowColumns;
    };

    /*
    *  Collection passed to the directive to iterate through
    *  This is only called once per layOutDay call
    * */
    EventsFac.getEventCollection = function() {
        return eventCollection;
    };

    return EventsFac;
});