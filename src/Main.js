require(["Loader", "Renderer", "TimeSourceDebug", "Timeline"], function(Loader, Renderer, TimeSourceDebug, Timeline){
    Loader.onLoaded(function(){
        Renderer.init();
        Timeline.setRenderer(Renderer.renderer);
        Renderer.setTimeLine(Timeline);
        Renderer.setTimeSource(TimeSourceDebug);
        // Renderer.prerender();
        TimeSourceDebug.start(getPattern());
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
