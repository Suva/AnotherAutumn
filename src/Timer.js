define(function(){
    var Timer = function(){};

    Timer.prototype.startTime = null;
    Timer.prototype.lastTime = null;

    Timer.prototype.getTime =
        function(time) {
            if(!this.startTime) this.startTime = time;
            return time - this.startTime;
        };

    Timer.prototype.getPassed =
        function(time){
            var result = 0;
            if(this.lastTime) {
                result = time - this.lastTime
            }
            this.lastTime = time;
            return result;
        };

    return Timer;
});
