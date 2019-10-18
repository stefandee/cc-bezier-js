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

    var curve = this.type === BezierCurveType.Quadratic ? new Bezier(67, 32, -64, 52, -18, -118) : new Bezier(5, 119, -86, 38, -66, -62, 42, -92);

    var draw = function() {
      drawAPI.drawSkeleton(curve);
      var arcs = curve.arcs();
      drawAPI.setColor(cc.Color.BLACK);
      arcs.forEach(function(arc) {
        drawAPI.setRandomFill(0.1);
        drawAPI.drawArc(arc);
      });
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() {
      drawAPI.reset();
      draw();
    });
  }
});
