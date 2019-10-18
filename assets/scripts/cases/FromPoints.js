const Bezier = require('bezier-js');
const BezierDrawAPI = require('BezierDrawAPI');
const BezierInteractionAPI = require('BezierInteractionAPI');
var BezierCurveType = require('BezierCurveType');
const BezierComponent = require('BezierComponent');

cc.Class({
  extends:BezierComponent,

  // use this for initialization
  onLoad:function() {
    this.type === BezierCurveType.Quadratic ? this.quadraticCurves() : this.cubicCurves();
  },

  quadraticCurves:function() {
    var B = {x:100, y:50};
    var tvalues = [0.2, 0.3, 0.4, 0.5];

    var curves = tvalues.map(function(t) {
      return Bezier.quadraticFromPoints({x:150, y:40}, B, {x:35, y:160}, t);
    });

    var drawAPI = this.getComponent(BezierDrawAPI);
    var draw = function() {
      var offset = {x:45, y:30};
      curves.forEach(function(b, i) {
        drawAPI.drawSkeleton(b, offset, true);
        drawAPI.setColor(new cc.Color(0, 0, 0, 50));
        drawAPI.drawCircle(b.points[1], 3, offset);
        drawAPI.drawText("t=" + tvalues[i], {
          x:b.points[1].x + offset.x,
          y:b.points[1].y + offset.y - 4
        });
        drawAPI.setRandomColor();
        drawAPI.drawCurve(b, offset);
      });
      drawAPI.setColor(cc.Color.BLACK);
      drawAPI.drawCircle(curves[0].points[0], 3, offset);
      drawAPI.drawCircle(curves[0].points[2], 3, offset);
      drawAPI.drawCircle(B, 3, offset);
    };

    draw();
  },

  cubicCurves:function() {
    var p1 = {x:110, y:50},
        B = {x:50, y:80},
        p3 = {x:135, y:100};

    var tvalues = [0.2, 0.3, 0.4, 0.5];

    var curves = tvalues.map(function(t) {
      return Bezier.cubicFromPoints(p1, B, p3, t);
    });

    var drawAPI = this.getComponent(BezierDrawAPI);
    var offset = {x:0, y:0};
    curves.forEach(function(b, i) {
      drawAPI.setRandomColor();
      drawAPI.drawCurve(b, offset);
    });
    drawAPI.setColor(cc.Color.BLACK);
    drawAPI.drawCircle(curves[0].points[0], 3, offset);
    drawAPI.drawCircle(curves[0].points[3], 3, offset);
    drawAPI.drawCircle(B, 3, offset);
  }
});
