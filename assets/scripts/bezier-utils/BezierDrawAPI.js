cc.Class({
  extends:cc.Component,

  // editor:{
  //   requireComponent: cc.Graphics
  // },

  // properties: {
  // },

  ctx: null,

  ctor: function() {
    this.randomIndex = 0;

    this.randomColors = [];

    for(var i=0,j; i<360; i++) {
      j = (i*47)%360;
      //this.randomColors.push("hsl("+j+",50%,50%)");
      this.randomColors.push(new cc.Color().fromHSV(j / 360, 0.5, 0.5));
    }

    // used to hold the text nodes rendered onto this node
    this.textNodes = [];
  },

  reset: function(curve, evt) {
    // cvs.width = cvs.width;
    this.ctx.clear();
    this.ctx.strokeColor = cc.Color.BLACK;
    this.ctx.fillColor = cc.Color.TRANSPARENT;

    // TODO figure out where is this used
    if (evt && curve) {
      curve.mouse = {x: evt.offsetX, y: evt.offsetY};
    }

    // it's an inefficient implementation, consider using a node pool for this
    this.textNodes.forEach(function(value) {
      this.node.removeChild(value);
    }, this);

    this.textNodes = [];

    this.randomIndex = 0;
  },

  setColor: function(c) {
    this.ctx.strokeColor = c;
  },

  noColor: function(c) {
    this.ctx.strokeColor = cc.Color.TRANSPARENT;
  },

  setRandomColor: function() {
    this.randomIndex = (this.randomIndex+1) % this.randomColors.length;
    this.ctx.strokeColor = this.randomColors[this.randomIndex];
  },

  setRandomFill: function(a) {
    this.randomIndex = (this.randomIndex+1) % this.randomColors.length;
    a = (typeof a === "undefined") ? 255 : Math.floor(a * 255);

    var c = this.randomColors[this.randomIndex].clone();
    c.setA(a);

    this.ctx.fillColor = c;
  },

  setFill: function(c) {
    this.ctx.fillColor = c;
  },

  noFill: function() {
    this.ctx.fillColor = cc.Color.TRANSPARENT;
  },

  drawSkeleton:function(curve, offset, nocoords) {
    offset = offset || {x:0, y:0};
    var pts = curve.points;
    this.ctx.strokeColor = cc.Color.GRAY;
    this.drawLine(pts[0], pts[1], offset);
    if (pts.length === 3) {
      this.drawLine(pts[1], pts[2], offset);
    }
    else {
      this.drawLine(pts[2], pts[3], offset);
    }
    this.ctx.strokeColor = cc.Color.BLACK;
    if (!nocoords) this.drawPoints(pts, offset);
  },

  drawCurve:function(curve, offset) {
    offset = offset || {x:0, y:0};
    var ox = offset.x;
    var oy = offset.y;
    //ctx.beginPath();
    var p = curve.points, i;
    this.ctx.moveTo(p[0].x + ox, p[0].y + oy);
    if (p.length === 3) {
      this.ctx.quadraticCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy
      );
    }
    if (p.length === 4) {
      this.ctx.bezierCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy,
          p[3].x + ox, p[3].y + oy
      );
    }
    this.ctx.stroke();
    //ctx.closePath();
  },

  drawLine:function(p1, p2, offset) {
    offset = offset || {x:0, y:0};
    var ox = offset.x;
    var oy = offset.y;
    //ctx.beginPath();
    this.ctx.moveTo(p1.x + ox, p1.y + oy);
    this.ctx.lineTo(p2.x + ox, p2.y + oy);
    this.ctx.stroke();
  },

  drawPoint: function(p, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    //ctx.beginPath();
    this.ctx.arc(p.x + ox, p.y + oy, 5, 0, 2*Math.PI);
    this.ctx.stroke();
  },

  drawPoints: function(points, offset) {
    offset = offset || { x:0, y:0 };
    points.forEach(function(p) {
      this.drawCircle(p, 3, offset);
    }.bind(this));
  },

  drawArc: function(p, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;

    //ctx.beginPath();
    //console.log(p.s, p.e);

    this.ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.moveTo(p.x + ox, p.y + oy);
    this.ctx.lineTo(p.x + ox, p.y + oy);
    this.ctx.stroke();
  },

  drawCircle: function(p, r, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    // ctx.beginPath();
    this.ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
    this.ctx.stroke();
  },

  drawbbox: function(bbox, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    // ctx.beginPath();
    this.ctx.moveTo(bbox.x.min + ox, bbox.y.min + oy);
    this.ctx.lineTo(bbox.x.min + ox, bbox.y.max + oy);
    this.ctx.lineTo(bbox.x.max + ox, bbox.y.max + oy);
    this.ctx.lineTo(bbox.x.max + ox, bbox.y.min + oy);
    this.ctx.close();
    this.ctx.stroke();
  },

  drawHull: function(hull, offset) {
    //ctx.beginPath();
    if(hull.length === 6) {
      this.ctx.moveTo(hull[0].x, hull[0].y);
      this.ctx.lineTo(hull[1].x, hull[1].y);
      this.ctx.lineTo(hull[2].x, hull[2].y);
      this.ctx.moveTo(hull[3].x, hull[3].y);
      this.ctx.lineTo(hull[4].x, hull[4].y);
    } else {
      this.ctx.moveTo(hull[0].x, hull[0].y);
      this.ctx.lineTo(hull[1].x, hull[1].y);
      this.ctx.lineTo(hull[2].x, hull[2].y);
      this.ctx.lineTo(hull[3].x, hull[3].y);
      this.ctx.moveTo(hull[4].x, hull[4].y);
      this.ctx.lineTo(hull[5].x, hull[5].y);
      this.ctx.lineTo(hull[6].x, hull[6].y);
      this.ctx.moveTo(hull[7].x, hull[7].y);
      this.ctx.lineTo(hull[8].x, hull[8].y);
    }
    this.ctx.stroke();
  },

  drawShape: function(shape, offset) {
    offset = offset || { x:0, y:0 };
    var order = shape.forward.points.length - 1;
    //ctx.beginPath();
    this.ctx.moveTo(offset.x + shape.startcap.points[0].x, offset.y + shape.startcap.points[0].y);
    this.ctx.lineTo(offset.x + shape.startcap.points[3].x, offset.y + shape.startcap.points[3].y);
    if(order === 3) {
      this.ctx.bezierCurveTo(
          offset.x + shape.forward.points[1].x, offset.y + shape.forward.points[1].y,
          offset.x + shape.forward.points[2].x, offset.y + shape.forward.points[2].y,
          offset.x + shape.forward.points[3].x, offset.y + shape.forward.points[3].y
      );
    } else {
      this.ctx.quadraticCurveTo(
          offset.x + shape.forward.points[1].x, offset.y + shape.forward.points[1].y,
          offset.x + shape.forward.points[2].x, offset.y + shape.forward.points[2].y
      );
    }
    this.ctx.lineTo(offset.x + shape.endcap.points[3].x, offset.y + shape.endcap.points[3].y);
    if(order === 3) {
      this.ctx.bezierCurveTo(
          offset.x + shape.back.points[1].x, offset.y + shape.back.points[1].y,
          offset.x + shape.back.points[2].x, offset.y + shape.back.points[2].y,
          offset.x + shape.back.points[3].x, offset.y + shape.back.points[3].y
      );
    } else {
      this.ctx.quadraticCurveTo(
          offset.x + shape.back.points[1].x, offset.y + shape.back.points[1].y,
          offset.x + shape.back.points[2].x, offset.y + shape.back.points[2].y
      );
    }
    this.ctx.close();
    this.ctx.fill();
    this.ctx.stroke();
  },

  drawText: function(text, offset) {
    offset = offset || { x:0, y:0 };

    // this.ctx.fillText(text, offset.x, offset.y);

    // add a label node instead, since cc.Graphics can't render text directly
    var labelNode = new cc.Node();
    this.node.addChild(labelNode);

    var label = labelNode.addComponent(cc.Label);
    label.string = text;
    label.fontSize = 11;
    label.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
    labelNode.setPosition(offset.x, offset.y);
    
    this.textNodes.push(labelNode);
  },

  // use this for initialization
  onLoad:function() {
    this.ctx = this.getComponent(cc.Graphics) || this.node.addComponent(cc.Graphics);
  },

  update:function(dt) {
  }
});
