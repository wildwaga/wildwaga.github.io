(function(window) {
	var Piece = function(canvas, config)
	{
		this.initialize(canvas, config);
	}
	var p = Piece.prototype = new BasePiece();
	//
	Piece.D2R = 1/180 * Math.PI;
	//
	p.initialize = function(canvas, config)
	{
		BasePiece.prototype.initialize.apply(this, [canvas, config]);
		this.rects = [];
		this.layer0 = new Container();
		this.layer1 = new Container();
		this.stage.addChild(this.layer0);
		this.stage.addChild(this.layer1);
		this.stage.enableMouseOver(0);
		this.initInteraction();
		document.body.style.backgroundColor = this.config.bgColor;
	}
	
	p.initInteraction = function()
	{
		var that = this;
		this.stage.addEventListener("stagemousemove", function(e) { that.onMouseMove(e); });
		this.stage.addEventListener("stagemousedown", function(e) { that.onMouseDown(e); });
		this.stage.addEventListener("stagemouseup", function(e) { that.onMouseUp(e); });
	}
	
	p.onMouseDown = function(e)
	{
	}
	p.onMouseUp = function(e)
	{
		if (this.dragAction)
		{
			this.dragAction = null;
			this.scheduleRandomToTop(1500);
		}
	}
	p.onMouseMove = function(e)
	{
		var x = this.stage.mouseX, y = this.stage.mouseY;
		var dx = x-this.dragX;
		var dy = y-this.dragY;
		if (this.dragAction=="move")
		{
			this.dragTarget.x += dx;
			this.dragTarget.y += dy;
		}
		else if (this.dragAction=="resize")
		{
			if (this.resizeH==-1)
			{
				this.dragTarget.w -= dx;
				this.dragTarget.x += dx;
			}
			else if (this.resizeH==1)
			{
				this.dragTarget.w += dx;
			}
			if (this.resizeV==-1)
			{
				this.dragTarget.h -= dy;
				this.dragTarget.y += dy;
			}
			else if (this.resizeV==1)
			{
				this.dragTarget.h += dy;
			}
			this.dragTarget.graphics.clear().beginFill(this.config.bgColor).drawRect(0,0,this.dragTarget.w,this.dragTarget.h);
		}
		this.dragX = x;
		this.dragY = y;
	}
	p.onRectMouseDown = function(r)
	{
		this.clearRandomToTop();
		this.moveToTop(r);
		var x = this.stage.mouseX, y = this.stage.mouseY;
		this.dragTarget = r;
		this.dragX = x;
		this.dragY = y;
		var m = this.config.rect.resizeMargin * this.diag;
		if (x<r.x+m || x>r.x+r.w-m || y<r.y+m || y>r.y+r.h-m)
		{
			//resize
			this.dragAction = "resize";
			if (x<r.x+m) this.resizeH = -1;
			else if (x>r.x+r.w-m) this.resizeH = 1;
			else this.resizeH = null;
			if (y<r.y+m) this.resizeV = -1;
			else if (y>r.y+r.h-m) this.resizeV = 1;
			else this.resizeV = null;
		}
		else
		{
			this.dragAction = "move";
		}
		//
		if (r.grid)
		{
			var r2 = this.createRect(r.grid.x,r.grid.y);
			r2.grid = {x:x,y:y};
			this.addRect(r2,0);
			log(this.rects.length);
		}
		r.grid = null;
	}
	
	
	p.onKeyUp = function(e)
	{
		BasePiece.prototype.onKeyUp.apply(this, [e]);
		if (!this.config.debug) return;
		var c = String.fromCharCode(e.which);
		if (c=="G") this.reset();
		if (c=="L") {
			this.debugLines = !this.debugLines;
			this.reset();
		}
	}
	
	p.setSize = function(w,h,dpr)
	{
		this.dpr = dpr;
		w = this.width = Math.floor(w*dpr);
		h = this.height = Math.floor(h*dpr);
		this.diag = Math.sqrt(w*w+h*h);
		//
		if (this.tickLast) this.reset();
	}
	
	p.start = function()
	{
		BasePiece.prototype.start.apply(this);
		this.reset();
	}
	
	p.reset = function()
	{
		this.layer0.removeAllChildren();
		this.layer1.removeAllChildren();
		this.rects.length = 0;
		this.coverAll();
		var n = Math.max(0,rndBetween(this.config.numRectsMin, this.config.numRectsMax)-this.rects.length);
		for (var i=0;i<n;i++)
		{
			this.addRect(this.createRect());
		}
		this.layer0.cache(0,0,this.width,this.height);
		this.scheduleRandomToTop();
	}
	
	p.buildMouseDownHandler = function(rect, idx)
	{
		var that = this;
		return function(e) {	that.onRectMouseDown(rect); };
	}
		
	p.coverAll = function()
	{
		//cover 'floor' with more or less regular grid
		var w = this.width, h = this.height;
		var cfg = this.config.rect;
		//calc min w and h for rects based on min area and min/max ratio
		//ratio = w/h, so wMin&hMax at ratioMin, hMin&wMax at ratioMax
		var aMin = w*h*cfg.areaMin;
		var wMin = Math.sqrt(aMin*cfg.ratioMin);
		var hMin = Math.sqrt(aMin/cfg.ratioMax);
		//place random rects around centerpoints of cells
		var cx = Math.ceil(w/wMin), cy = Math.ceil(h/hMin);
		var ox = .5*(w-cx*wMin+wMin), oy = .5*(h-cy*hMin+hMin);
		//
		for (var i=0;i<cx;i++)
		{
			for (var j=0;j<cy;j++)
			{
				var x = ox+i*wMin, y = oy+j*hMin;
				//create random rect around x,y
				var r = this.createRect(x,y);
				r.grid = {x:x,y:y};
				this.addRect(r);
			}
		}
		//log(w,h,aMin,wMin,hMin,cx,cy,ox,oy);
		return cx*cy;
	}
	
	p.addRect = function(r, idx)
	{
		//insert at random index
		if (isNaN(idx)) idx = Math.floor(Math.random()*this.layer0.numChildren);
		this.layer0.addChildAt(r,idx);
		this.rects.push(r);
		r.handleMouseDown = this.buildMouseDownHandler(r,i);
		r.addEventListener("mousedown", r.handleMouseDown);
	}
		
	p.createRect = function(x,y)
	{
		var m = this.config.margin;
		var w = this.width, h = this.height;
		var cfg = this.config.rect;
		var area = w*h * rndBetween(cfg.areaMin,cfg.areaMax);
		var ratio = rndBetween(cfg.ratioMin,cfg.ratioMax);
		var hw = Math.sqrt(area/ratio);
		var ww = ratio * hw;
		if (isNaN(x))
		{
			x = rndBetween(-m*w,(1+m)*w-ww);
			y = rndBetween(-m*h,(1+m)*h-hw);
		}
		else
		{
			//x,y is center, translate to origin
			x -= ww/2;
			y -= hw/2;
		}
		var shape = new Shape().set({x:x,y:y,w:ww,h:hw, rect:new Rectangle(x,y,ww,hw)});
		shape.graphics.beginFill(this.config.bgColor).drawRect(0,0,ww,hw);
		var rs = cfg.shadowSize*this.diag;
		shape.shadow = new Shadow(cfg.shadowColor, 0,0, rs);
		if (this.debugLines)
		{
			var m = this.config.rect.resizeMargin * this.diag;
			shape.graphics.endFill().beginStroke('#aaa').drawRect(m,m,ww-m-m,hw-m-m);
		}
		return shape;
	}
	
	p.clearRandomToTop = function()
	{
		if (this.timeoutRandomToTop)
		{
			clearTimeout(this.timeoutRandomToTop);
		}
	}
	p.scheduleRandomToTop = function(delay)
	{
		if (this.config.randomToTopIntervalMin<=0) return;
		delay = delay || 0;
		this.clearRandomToTop();
		var that = this;
		this.timeoutRandomToTop = setTimeout(function() { that.moveRandomToTop(); }, delay + rndBetween(this.config.randomToTopIntervalMin,this.config.randomToTopIntervalMax));
	}
	p.moveRandomToTop = function()
	{
		var i = Math.floor(Math.random()* this.layer0.getNumChildren()*.75);
		var r = this.layer0.getChildAt(i);
		this.moveToTop(r);
		this.scheduleRandomToTop();
	}
	p.moveToTop = function(rect)
	{
		while (this.layer1.getNumChildren()>0) this.layer0.addChild(this.layer1.getChildAt(0));
		this.layer1.addChild(rect);
		this.layer0.cache(0,0,this.width,this.height);
	}
	
	p.update = function()
	{
		return true;
	}
	
	
	p.draw = function()
	{
		var g = this.shape.graphics;
		g.clear();
		var n = this.rects.length;
		for (var i=0;i<n;i++)
		{
			var r = this.rects[i];
			g.beginFill(this.config.bgColor).beginStroke('#000').setStrokeStyle(1);
			g.drawRect(r.x,r.y,r.width,r.height);
			g.endFill();
		}
	}
	
	
	// Point pool
	var n = Config.pointsMax*2;
	var idx = 0;
	var pool = [];
	for (var i=0;i<n;i++) pool.push(new Point(0,0));
	var point = function(x,y)
	{
		idx = (idx+1)%n;
		var p = pool[idx];
		p.x = x;
		p.y = y;
		return p;
	}
	
	// Utils
	
	var rndBetween = function(min, max)
	{
		return min + Math.random() * (max-min);
	}
	
	window.Piece = Piece;
}(window));

