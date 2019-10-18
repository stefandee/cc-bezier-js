const Bezier = require('bezier-js');
const BezierDrawAPI = require('BezierDrawAPI');
const BezierInteractionAPI = require('BezierInteractionAPI');
var BezierCurveType = require('BezierCurveType');
const BezierComponent = require('BezierComponent');

cc.Class({
  extends:BezierComponent,

  // use this for initialization
  onLoad:function() {
    var drawAPI = this.getComponent(BezierDrawAPI);
    var curve = this.type === BezierCurveType.Quadratic ? new Bezier(150,40 , 80,30 , 105,150) : new Bezier(100,25 , 10,90 , 110,100 , 150,195);
    var draw = function() {
      drawAPI.drawSkeleton(curve);
      var LUT = curve.getLUT(16);
      LUT.forEach(function(p) { drawAPI.drawCircle(p,2); });
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() { drawAPI.reset(); draw(); });
  }
});
