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

    var curve2 = this.type === BezierCurveType.Quadratic ? new Bezier(-90, -26, 63, -118, 95, 58) : new Bezier(-115, 23, -78, -135, 138, 108, 30, 49);
    var curve = this.type === BezierCurveType.Quadratic ?  new Bezier(-37, -116, 6, 72, 86, -79) : new Bezier(-90, -71, -55, 61, 53, -107, 44, 79 );

    var draw = function() {
      drawAPI.drawSkeleton(curve);
      drawAPI.drawCurve(curve);
      drawAPI.setColor(cc.Color.RED);
      drawAPI.drawCurve(curve2);
      drawAPI.setColor(cc.Color.BLACK);
      curve.intersects(curve2).forEach(function(pair) {
        var t = pair.split("/").map(function(v) { return parseFloat(v); });
        drawAPI.drawPoint(curve.get(t[0]));
      });
      //console.log(curve.points);
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() {
      drawAPI.reset();
      draw();
    });
  }
});
