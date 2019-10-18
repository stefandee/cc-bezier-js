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

    var curve = (this.type === BezierCurveType.Quadratic) ? this.quadraticCurve() : this.cubicCurve();
    var draw = function() {
      drawAPI.drawSkeleton(curve);
      drawAPI.drawCurve(curve);
      drawAPI.setColor(cc.Color.RED);
      var arclength = curve.length();
      var offset = curve.offset(-10), last=offset.length-1;
      offset.forEach(function(c,idx) {
        drawAPI.drawCurve(c);
        if(idx===last) {
          var p1 = curve.offset(0.95, -15);
          var p2 = c.get(1);
          var p3 = curve.offset(0.95, -5);
          drawAPI.drawLine(p1,p2);
          drawAPI.drawLine(p2,p3);
          var label = ((100*arclength)|0)/100 + "px";
          drawAPI.drawText(label, {x:p2.x+7,y:p2.y-3});
        }
      });
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function() { drawAPI.reset(); draw(); });
  },

  quadraticCurve: function() {
    return new Bezier(150,40 , 80,30 , 105,150);
  },

  cubicCurve: function() {
    return new Bezier(100, 25, 10, 90, 110, 100, 132, 192 );
  }
});
