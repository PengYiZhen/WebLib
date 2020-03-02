
		/* 用法须知 */
		/* @@@
		@@@@@   加载用Loader.loader();
		@@@@@   Response后 用 Loader.OK()  ++++@@@@ Mothed: onloaded = function(){}  loaded(function(){})
		@@@@@   循环操作即可  */
		      class Loader {
			         constructor(props){
							 props.canvas.height = parseFloat(getComputedStyle(props.canvas.parentNode).height);
							 props.canvas.width = parseFloat(getComputedStyle(props.canvas.parentNode).width);
							 this.canvas = props.canvas;
							 this.ctx = this.canvas.getContext('2d');
							 this.direction = false;
							 props.ARC!=undefined?props.ARC=props.ARC:props.ARC={r:undefined, x:undefined, y:undefined, width:undefined};
							 props.ARC.width!=undefined?this.lineWidth = props.ARC.width:this.lineWidth=10;
							 props.ARC.r!=undefined?this.r=props.ARC.r:this.r=50;
							 props.ARC.x!=undefined?this.x=props.ARC.x:this.x=this.canvas.width/2;
							 props.ARC.y!=undefined?this.y=props.ARC.y:this.y=this.canvas.height/2;
							 props.ARC.color!=undefined?this.color=props.ARC.color:this.color='#84f';
						     this.firstColor = this.color;
						   
			                 this.beginArc = 0; 
							 this.endArc = 180;
							 this.roundArc = 1;
							 this.direction = true;
							 this.CANCEL = false;
							 this.TIMERID = 0;
							 props.speed!=undefined?this.speed=props.speed:this.speed=1;
							 props.loaderStyle!=undefined?this.loaderStyle=props.loaderStyle:this.loaderStyle='round';
							 this.onloaded;
							 this.callback;
							
							 this.OKx = this.canvas.width/2.8;
							 this.OKy = this.canvas.height/4;
							 
							 this.move_start = {
							        x: this.canvas.width/2.8, 
									y: this.canvas.height/4
							 }
							 this.line_first = {
							        x: this.canvas.width/2.8,
									y: this.canvas.height/5*3.2
							 }
							 this.line_end = {
							        x: this.canvas.width/5*4,
									y: this.canvas.height/5*3.2
							 }
				      }
					  
					  draw(){
					        if(this.loaderStyle=='round'){
								  this.ctx.save();
								  this.ctx.translate(this.x, this.y);
								  this.ctx.rotate(this.roundArc*Math.PI/180);
								  this.ctx.translate(-this.x, -this.y);
								  this.ctx.beginPath();
							      this.ctx.strokeStyle = this.color;
								  this.ctx.lineWidth = this.lineWidth;
								  this.ctx.arc(this.x, this.y, this.r, 0, this.endArc*Math.PI/180, this.direction);
								  this.ctx.stroke();
								  this.ctx.restore();
								  
							}else{
							      this.ctx.beginPath();
							      this.ctx.strokeStyle = this.color;
							      this.ctx.lineWidth = this.lineWidth;
							      this.ctx.arc(this.x, this.y, this.r, this.beginArc*Math.PI/180, this.endArc*Math.PI/180, this.direction);
							      this.ctx.stroke();
							}
					  }
					  
					  updata(){
					  if(!this.CANCEL){
					        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
							this.draw();
							if(this.loaderStyle=='round'){
							       if((this.roundArc+=1*this.speed)%361>=360){ this.roundArc = 0;  } 
							       if((this.endArc+=2)%361>=360){ this.endArc = 0; }
							}else{
							       if((this.beginArc+=1*this.speed)%361>=360){ this.beginArc = 0;  } 
							       if((this.endArc+=2*this.speed)%361>=360){ this.endArc = 0; }
							}
						}	
							
							 this.TIMERID = requestAnimationFrame(()=>{
								        this.updata();
							});
					  }
					  
					  drawOK(){
					        this.ctx.save();
							this.ctx.translate(this.x, this.y);
							this.ctx.rotate(-45*Math.PI/180);
							this.ctx.translate(-this.x, -this.y);
							this.ctx.beginPath();
							this.ctx.strokeStyle = this.color;
							this.ctx.lineWidth = this.lineWidth;
							this.ctx.lineJoin="round";
							//this.ctx.lineCap="round";
							this.ctx.moveTo(this.move_start.x, this.move_start.y);
							this.ctx.lineTo(this.OKx<=this.line_first.x?this.OKx:this.line_first.x, this.OKy<=this.line_first.y?this.OKy:this.line_first.y);
			                if(this.OKy>=this.line_first.y){
							      this.ctx.lineTo(this.OKx<=this.line_end.x?this.OKx:this.line_end.x, this.OKy);
							}
							this.ctx.stroke();
							this.ctx.restore();
					  }
					  
					  updataOK() {
					  if(!this.CANCEL){
					        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
					        this.drawOK();
					        if(this.OKy<=this.line_first.y){
							      this.OKy += this.speed/3;
							}else if(this.OKx<=this.line_end.x){
							      this.OKx += this.speed/3;
							}else{
							      this.OKx = this.move_start.x;
								  this.OKy = this.move_start.y;
								  this.pause();
								  this.changeColor(this.firstColor);
								  if(typeof this.onloaded==='function'){ this.onloaded(); } // 事件
								  if(typeof this.callback==='function'){ this.callback(); } // 事件回调
							}
							this.TIMERID = requestAnimationFrame(()=>{
								        this.updataOK();
							});
						}
					  }
					  
					  loaded(callback) {
					     // 设置监听 this.callback; loaded 就是一个监听方法，就是在方法中定义回调函数。
					      this.callback = ()=>{
						        // 区别 call apply bind把callback变成新变量，必须加() 才执行
						        callback.bind(this)();
						  }
					  }
					  
					  loader() {
					      this.play();
						  this.updata();
					  }
					  
					  changeColor (color){
						  this.color = color;
					  }
					  
					  OK(){
					      this.stop();
					      this.updataOK();
					  }
					  
					  stop(){
					       cancelAnimationFrame(this.TIMERID);
					  }
					  
					  pause(){
					        this.CANCEL = true;
					  }
					  
					  play() {
					        this.CANCEL = false;
					  }
			  }
			  
