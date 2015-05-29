function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

layouts =  {
    defaultLayout: [
        { start: 30, end: 150 },
        { start: 540, end: 600 },
        { start: 560, end: 620 },
        { start: 610, end: 670}
    ],

    sampleOne: [
        {start:0, end: 50},
        {start: 0, end: 700},
        { start: 560, end: 620 },
        { start: 610, end: 670},
        { start: 640, end:700 },
        { start: 100, end: 230 },
        { start: 110, end: 175 },
        { start: 400, end: 600 }
    ],

    sampleTwo: [
        { start: 30, end: 150 },
        { start: 560, end: 620 },
        { start: 610, end: 670},
        { start: 600, end: 610},
        { start: 610, end: 630},
        { start: 640, end:700 },
        { start: 640, end:700 },
        { start: 100, end: 230 },
        { start: 110, end: 175 },
        { start: 400, end: 600 },
        { start: 400, end: 600 },
        { start: 400, end: 600 },
        { start: 400, end: 600 },
        { start: 400, end: 600 }
    ],

    sampleThree: [
        {start: 0, end: 100},
        {start: 100, end: 200},
        {start: 0, end: 200},
        {start: 0, end: 300},
        {start:50, end: 300}
    ],

    sampleFour: [
        {start: 0, end: 100},
        {start: 100, end: 200},
        {start: 0, end: 200},
        {start: 0, end: 300},
        {start:50, end: 300},
        {start: 400, end: 500},
        {start: 450, end: 475},
        {start: 500, end: 720}
    ],

    sampleFive: function() {
       var randomArrayOfEvents = [];
       for (var i = 0; i < 100; i++) {
           var start = getRandomInt(0, 700);
           var end = getRandomInt(start, 700);
           randomArrayOfEvents.push({ start: start, end: end });
       }
       return randomArrayOfEvents;
   }
};