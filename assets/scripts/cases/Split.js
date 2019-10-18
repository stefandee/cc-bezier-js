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

    var curve = this.type === BezierCurveType.Quadratic ? new Bezier(67,32 , -64,52 , -18,-118) : new Bezier(5, 119 , -68,49 , 53, 50 , 46, -86);

    var draw = function() {
      drawAPI.drawSkeleton(curve);
      drawAPI.setColor(cc.Color.GRAY);
      drawAPI.drawCurve(curve);
      var c = curve.split(0.25, 0.75);
      drawAPI.setColor(cc.Color.RED);
      drawAPI.drawCurve(c);
      drawAPI.drawCircle(curve.get(0.25),3);
      drawAPI.drawCircle(curve.get(0.75),3);
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() { drawAPI.reset(); draw(); });
  }
});
