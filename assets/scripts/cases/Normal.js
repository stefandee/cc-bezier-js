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
      var d=20;
      for(var t=0; t<=1; t+=0.1) {
        var pt = curve.get(t);
        var nv = curve.normal(t);
        drawAPI.drawLine(pt, { x: pt.x + d*nv.x, y: pt.y + d*nv.y} );
      }
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() { drawAPI.reset(); draw(); });
  }
});
