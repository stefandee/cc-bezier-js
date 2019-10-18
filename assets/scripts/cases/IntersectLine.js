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

    var curve = this.type === BezierCurveType.Quadratic ? new Bezier(-38, -107, -45, 70, 113, -3) : new Bezier(-90, -130, -113, 91, 104, -79, 70, 98);

    var draw = function() {
      drawAPI.drawSkeleton(curve);
      drawAPI.drawCurve(curve);
      var line = { p1: {x:-300, y:-200}, p2: {x:300,y:200} };
      drawAPI.setColor(cc.Color.RED);
      drawAPI.drawLine(line.p1, line.p2);
      drawAPI.setColor(cc.Color.BLACK);
      curve.intersects(line).forEach(function(t) {
        drawAPI.drawPoint(curve.get(t));
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
