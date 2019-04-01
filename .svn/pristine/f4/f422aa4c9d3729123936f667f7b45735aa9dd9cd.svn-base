export class Slider {

	constructor(el,dy,dx,startX, startY, endX, endY){
		this.el = document.getElementById(el);
		this.dy = dy;
		this.dx = dx;
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}

	GetSlideAngle(){  
      return Math.atan2(this.dy,this.dx) * 180 / Math.PI;  
  	}

 	GetSlideDirection(){
      var dy = this.startY - this.endY;  
      var dx = this.endX - this.startX;  
      var result = 0;  

      if(Math.abs(dx) < 50 && Math.abs(dy) <50) {  
          return result;  
      }  

      var angle = this.GetSlideAngle();  
      if(angle >= -45 && angle < 45) {  
          result = 4;  
      }else if (angle >= 45 && angle < 135) {  
          result = 1;  
      }else if (angle >= -135 && angle < -45) {  
          result = 2;  
      }  
      else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
          result = 3;  
      }  

      return result;  
  }

  touchs(){
  	let self = this;
	  this.el.addEventListener('touchstart',function (ev) {  
	      self.startX = ev.touches[0].pageX;  
	      self.startY = ev.touches[0].pageY;    
	  }, false); 

	  this.el.addEventListener('touchend',function (ev) {  
	      self.endX = ev.changedTouches[0].pageX;  
	      self.endY = ev.changedTouches[0].pageY;  
	      var direction = self.GetSlideDirection();  
	      switch(direction) {  
	          case 0:  
	              return;  
	              break;  
	          case 1:  
	              alert("向上");  
	              break;  
	          case 2:  
	              alert("向下");  
	              break;  
	          case 3:  
	              alert("向左");   
	              break;  
	          case 4:  
	              alert("向右");  
	              break;  
	          default:             
	      }  
	  }, false);   
  }  
	
}