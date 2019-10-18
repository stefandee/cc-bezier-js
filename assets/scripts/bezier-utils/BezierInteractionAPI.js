cc.Class({
  extends:cc.Component,

  ctor:function() {
    this.moving = false;
    this.curve = null;
    // this.mp = false;
    // this.m = new cc.Vec2();
    this.onUpdate = function() {
    };
    //this.o = new cc.Vec2();
    //this.c = new cc.Vec2();
  },

  handleInteraction:function(curve, onUpdate) {
    this.curve = curve;
    this.onUpdate = onUpdate;

    this.curve.mouse = false;

    // var fix = function(e) {
    //   e = e || window.event;
    //   var target = e.target || e.srcElement,
    //       rect = target.getBoundingClientRect();
    //   //e.offsetX = e.clientX - rect.left;
    //   //e.offsetY = e.clientY - rect.top;
    //   return {offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top};
    // };
    //
    // var lpts = curve.points;
    // var moving = false, mx = 0, my = 0, ox = 0, oy = 0, cx, cy, mp = false;
    //
    // var handler = {
    //   onupdate:function() {
    //   }
    // };
    //
    // cvs.addEventListener("mousedown", function(evt) {
    //   var evtOffset = fix(evt);
    //   mx = evtOffset.offsetX; //evt.offsetX;
    //   my = evtOffset.offsetY; //evt.offsetY;
    //
    //   console.log(evtOffset);
    //
    //   lpts.forEach(function(p) {
    //     console.log(p);
    //     if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
    //       moving = true;
    //       mp = p;
    //       cx = p.x;
    //       cy = p.y;
    //     }
    //   });
    // });
    //
    // cvs.addEventListener("mousemove", function(evt) {
    //   var evtOffset = fix(evt);
    //
    //   var found = false;
    //
    //   if (!lpts) return;
    //   lpts.forEach(function(p) {
    //     var mx = evtOffset.offsetX; //evt.offsetX;
    //     var my = evtOffset.offsetY; //evt.offsetY;
    //
    //     if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
    //       found = found || true;
    //     }
    //   });
    //   cvs.style.cursor = found ? "pointer" : "default";
    //
    //   if (!moving) {
    //     return handler.onupdate(evt);
    //   }
    //
    //   ox = evtOffset.offsetX - mx;
    //   oy = evtOffset.offsetY - my;
    //   mp.x = cx + ox;
    //   mp.y = cy + oy;
    //   curve.update();
    //   handler.onupdate();
    // });
    //
    // cvs.addEventListener("mouseup", function(evt) {
    //   if (!moving) return;
    //   // console.log(curve.points.map(function(p) { return p.x+", "+p.y; }).join(", "));
    //   moving = false;
    //   mp = false;
    // });
    //
    // cvs.addEventListener("click", function(evt) {
    //   fix(evt);
    //   var mx = evt.offsetX;
    //   var my = evt.offsetY;
    // });
    //
    // return handler;
  },

  onLoad:function() {
    this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
      if (!this.curve) {
        return;
      }

      var lpts = this.curve.points;

      if (!lpts) {
        return;
      }

      var touches = event.getTouches();
      var touchLoc = this.node.convertToNodeSpaceAR(touches[0].getLocation());

      // this.m = touchLoc.clone();

      lpts.forEach(function(p) {
        if (Math.abs(touchLoc.x - p.x) < 10 && Math.abs(touchLoc.y - p.y) < 10) {
          this.moving = true;
          this.mp = p;
        }
      }, this);
    }, this);

    this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
      if (!this.curve) {
        return;
      }

      var touches = event.getTouches();
      var touchLoc = this.node.convertToNodeSpaceAR(touches[0].getLocation());

      // var lpts = this.curve.points;
      // if (!lpts) {
      //   return;
      // }
      //
      // var touchLoc = this.node.convertToNodeSpaceAR(touches[0].getLocation());
      // var found = false;
      //
      // lpts.forEach(function(p) {
      //   if (Math.abs(touchLoc.x - p.x) < 10 && Math.abs(touchLoc.y - p.y) < 10) {
      //     found = found || true;
      //   }
      // }, this);
      //
      // cc.game.container.style.cursor = found ? "pointer" : "auto";

      if (!this.moving) {
        this.onUpdate(touchLoc);
        return;
      }

      this.mp.x += touches[0].getDelta().x;
      this.mp.y += touches[0].getDelta().y;

      this.curve.update();
      this.onUpdate();
    }, this);

    this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
      if (!this.curve || !this.moving) {
        return;
      }

      this.moving = false;
      this.mp = null;
      cc.game.container.style.cursor = "auto";
    }, this);

    // this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
    //   console.log("touch cancel!");
    // }, this);
  }
});