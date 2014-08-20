define(function(){
    var startTime = 0;
    var events = [];

    $(window).on("keydown", function(ev){
        switch(ev.keyCode){
            case 90: // Z key
                events.push({instrument: 1, note: 'C-3'}); // Kick
                break;
            case 88: // X key
                events.push({instrument: 1, note: 'D-3'}); // Snare
                break;
        }
    });

    return {
        start: function(){
            startTime = getCurrentTime();
        },
        getTime: function () {
            return getCurrentTime() - startTime;
        },
        getEvents: function(){
            if(events.length == 0){
                return [];
            }
            var retEvents = _.clone(events);
            events = [];
            return retEvents;
        }
    };

    function getCurrentTime() {
        return new Date().getTime() / 1000;
    }
});