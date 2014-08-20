/*!
 * All equations are adapted from Thomas Fuchs' [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert Penner](http://www.robertpenner.com/), all rights reserved. This work is [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */
/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

define(function(){
    return {
        inQuad: function(pos){
            return Math.pow(pos, 2);
        },

        outQuad: function(pos){
            return -(Math.pow((pos-1), 2) -1);
        },

        inOutQuad: function(pos){
            if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,2);}
            return -0.5 * ((pos-=2)*pos - 2);
        },

        inCubic: function(pos){
            return Math.pow(pos, 3);
        },

        outCubic: function(pos){
            return (Math.pow((pos-1), 3) +1);
        },

        inOutCubic: function(pos){
            if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,3);}
            return 0.5 * (Math.pow((pos-2),3) + 2);
        },

        inQuart: function(pos){
            return Math.pow(pos, 4);
        },

        outQuart: function(pos){
            return -(Math.pow((pos-1), 4) -1);
        },

        inOutQuart: function(pos){
            if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,4);}
            return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
        },

        inQuint: function(pos){
            return Math.pow(pos, 5);
        },

        outQuint: function(pos){
            return (Math.pow((pos-1), 5) +1);
        },

        inOutQuint: function(pos){
            if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,5);}
            return 0.5 * (Math.pow((pos-2),5) + 2);
        },

        inSine: function(pos){
            return -Math.cos(pos * (Math.PI/2)) + 1;
        },

        outSine: function(pos){
            return Math.sin(pos * (Math.PI/2));
        },

        inOutSine: function(pos){
            return (-0.5 * (Math.cos(Math.PI*pos) -1));
        },

        inExpo: function(pos){
            return (pos===0) ? 0 : Math.pow(2, 10 * (pos - 1));
        },

        outExpo: function(pos){
            return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
        },

        inOutExpo: function(pos){
            if(pos===0) {return 0;}
            if(pos===1) {return 1;}
            if((pos/=0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos-1));}
            return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
        },

        inCirc: function(pos){
            return -(Math.sqrt(1 - (pos*pos)) - 1);
        },

        outCirc: function(pos){
            return Math.sqrt(1 - Math.pow((pos-1), 2));
        },

        inOutCirc: function(pos){
            if((pos/=0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos*pos) - 1);}
            return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);
        },

        outBounce: function(pos){
            if ((pos) < (1/2.75)) {
                return (7.5625*pos*pos);
            } else if (pos < (2/2.75)) {
                return (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
            } else if (pos < (2.5/2.75)) {
                return (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
            } else {
                return (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
            }
        },

        inBack: function(pos){
            var s = 1.70158;
            return (pos)*pos*((s+1)*pos - s);
        },

        outBack: function(pos){
            var s = 1.70158;
            return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
        },

        inOutBack: function(pos){
            var s = 1.70158;
            if((pos/=0.5) < 1) {return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));}
            return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
        },

        elastic: function(pos) {
            return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;
        },

        swingFromTo: function(pos) {
            var s = 1.70158;
            return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
                0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
        },

        swingFrom: function(pos) {
            var s = 1.70158;
            return pos*pos*((s+1)*pos - s);
        },

        swingTo: function(pos) {
            var s = 1.70158;
            return (pos-=1)*pos*((s+1)*pos + s) + 1;
        },

        bounce: function(pos) {
            if (pos < (1/2.75)) {
                return (7.5625*pos*pos);
            } else if (pos < (2/2.75)) {
                return (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
            } else if (pos < (2.5/2.75)) {
                return (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
            } else {
                return (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
            }
        },

        bouncePast: function(pos) {
            if (pos < (1/2.75)) {
                return (7.5625*pos*pos);
            } else if (pos < (2/2.75)) {
                return 2 - (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
            } else if (pos < (2.5/2.75)) {
                return 2 - (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
            } else {
                return 2 - (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
            }
        },

        fromTo: function(pos) {
            if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,4);}
            return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
        },

        from: function(pos) {
            return Math.pow(pos,4);
        },

        to: function(pos) {
            return Math.pow(pos,0.25);
        }
    };

});
