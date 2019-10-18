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

    var curve = this.type === BezierCurveType.Quadratic ? new Bezier(67, 32, -64, 52, -18, -118) : new Bezier(5, 119, -68, 49, 53, 50, 46, -86);

    var draw = function() {
      drawAPI.drawSkeleton(curve);
      drawAPI.drawCurve(curve);
      for(var s=0; s<256; s+=2) {
        drawAPI.setColor(new cc.Color(255, 127, s, 255 * 0.6)/*"rgba(255,127,"+s+",0.6)"*/);
        var t = s/255;
        var p = curve.get(t);
        var n = curve.normal(t);
        var kr = curve.curvature(t);
        drawAPI.drawLine(p, {
          x: p.x + n.x * kr.k * 10000,
          y: p.y + n.y * kr.k * 10000
        });
      }
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() {
      drawAPI.reset();
      draw();
    });
  }
});
