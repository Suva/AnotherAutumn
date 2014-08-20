define(function(require){
    var Manager = require("Manager");

    var loader = initLoader();

    return {
        onLoaded: function(callback){
            Manager.waitForLoadToComplete(function(){
                loader.fadeOut(1000);
                callback();
            });
        }
    };

    function initLoader() {
        (function ($) {
            $.fn.extend({
                center: function () {
                    return this.each(function () {
                        var top = ($(window).height() - $(this).outerHeight()) / 2;
                        var left = ($(window).width() - $(this).outerWidth()) / 2;
                        $(this).css({position: 'absolute', margin: 0, top: (top > 0 ? top : 0) + 'px', left: (left > 0 ? left : 0) + 'px'});
                    });
                }
            });
        })(jQuery);
        var loader = $('<img src="images/loading.png">')
            .css("display", "none")
        $("body").append(loader);
        loader.load(function () {
            loader.center();
            loader.fadeIn(1000);
        });
        $(window).resize(function(){ loader.center() });
        return loader;
    }
});