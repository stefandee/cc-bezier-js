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

    var draw = function(loc) {
      drawAPI.drawSkeleton(curve);
      drawAPI.drawCurve(curve);
      drawAPI.setColor(new cc.Color(255, 100, 100, 255));
      if (loc) {
        var mouse = {x: loc.x, y: loc.y};
        var p = curve.project(mouse);
        drawAPI.drawLine(p,mouse);
      }
    };

    draw();

    var interactionAPI = this.getComponent(BezierInteractionAPI);
    interactionAPI.handleInteraction(curve, function(loc) {
      drawAPI.reset();
      draw(loc);
    });
  }
});
