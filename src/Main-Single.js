require(["Loader", "Renderer", "TimelineSingle", "TimeSourceDebug"], function(Loader, Renderer, TimeLine, TimeSource){
    Loader.onLoaded(function(){
        Renderer.init();
        TimeLine.setRenderer(Renderer.renderer);
        Renderer.setTimeLine(TimeLine);
        Renderer.setTimeSource(TimeSource);
        TimeSource.start();
        Renderer.start();
    });

});
