var BezierCurveType = require('BezierCurveType');

cc.Class({
  extends:cc.Component,

  properties: {
    type: {
      default: BezierCurveType.Quadratic,
      type: BezierCurveType
    }
  }
});

