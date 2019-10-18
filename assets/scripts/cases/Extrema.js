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
      drawAPI.drawCurve(curve);
      drawAPI.setColor(cc.Color.RED);
      curve.extrema().values.forEach(function(t) {
        drawAPI.drawCircle(curve.get(t),3);
      });
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() { drawAPI.reset(); draw(); });
  }
});
