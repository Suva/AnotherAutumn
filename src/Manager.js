define(function(){
    var tries = 0;

    return {
        waitForLoadToComplete: function(callback){
            function checkLoadStatus(){
                if(loadStatus == 0){
                    if(tries == 3){
                        callback();
                        return;
                    }
                    tries++;
                } else {
                    tries = 0;
                }
                setTimeout(checkLoadStatus, 300)
            }

            checkLoadStatus();
        }
    }
});