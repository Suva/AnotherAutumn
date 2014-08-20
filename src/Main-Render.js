require(["Loader", "Renderer", "TimeSourceRender", "Timeline"], function(Loader, Renderer, TimeSource, Timeline){

    Loader.onLoaded(function(){
        Renderer.init();
        Timeline.setRenderer(Renderer.renderer);
        Renderer.setTimeLine(Timeline);
        Renderer.setTimeSource(TimeSource);
        Renderer.saveFramesTo("/frameSaver/frameSaver.php");

        TimeSource.start(getPattern());
        Renderer.start();
    });


    function getPattern() {
        var res = location.hash.match(/pattern=([0-9].*)/);
        var pattern = null;
        if (res) {
            pattern = res[1];
        }
        return pattern;
    }
});
