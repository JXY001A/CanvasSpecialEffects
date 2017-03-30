var RandomLine=(function() {
	var canvas = document.getElementById("mycanvas");
	var context = canvas.getContext("2d");
	var width = window.innerWidth;
	var height = window.innerHeight;
	canvas.height = height;
	canvas.width = width;
	//  ========== 
	//  = 开始画点 = 
	//  ========== 
	var line = []; //用于存放点的信息
	var num = 20; //设置点的个数
	var oldpoint = []; //用于保存前面点的轨迹
	//工具函数，用于产生戈丁范围的随机数
	function rnd(n, m) {
		return Math.floor(Math.random() * (m - n) + n);
	}
	//  ========== 
	//  = 数组的出初始化 = 
	//  ========== 
	for(var i = 0; i < num; i++) {
		line[i] = {
			w: 0, //点的宽
			h: 0, //点的高
			x: rnd(0, width), //点的x轴坐标
			y: rnd(0, height), //点的y轴坐标
			speedx: rnd(-5, 5), //点的x轴移动速度
			speedy: rnd(-5, 5) //点在y轴的移动速度
		};
	}
	//绘制点函数
	function drawPoint(p) {
		context.fillStyle = '#fff';
		context.fillRect(p.x, p.y, p.w, p.h);
		context.strokeRect(p.x, p.y, p.w, p.h);
		context.beginPath();
		context.moveTo(line[0].x, line[0].y);
		for(var i = 1; i < num; i++) {
			context.lineTo(line[i].x, line[i].y);
		}
		//为线条设置颜色
		context.strokeStyle = "rgba(rgba(169,18,144,1)";
		context.closePath(); //闭合线条
		context.stroke();
	}
	//循环调用绘制函数
	function drawObj() {
		context.clearRect(0, 0, width, height);
		var arr = [];
		for(var i = 0; i < num; i++) {
			drawPoint(line[i]);
			//坐标累加移动
			line[i].x += line[i].speedx;
			line[i].y += line[i].speedy;
			//碰撞检测
			if(line[i].x < 0) {
				line[i].speedx *= -1;
				line[i].x = 0;
			}
			if(line[i].x > width) {
				line[i].speedx *= -1;
				line[i].x = width;
			}

			if(line[i].y < 0) {
				line[i].speedy *= -1;
				line[i].y = 0;
			}

			if(line[i].y > height) {
				line[i].speedy *= -1;
				line[i].y = height;
			}
			arr.push({
				x: line[i].x,
				y: line[i].y
			});
		}
		oldpoint.push(arr);
		while(oldpoint.length > 30) {
			oldpoint.shift();
		}
		for(var i = 0; i < oldpoint.length; i++) {
			context.beginPath();
			context.moveTo(oldpoint[i][0].x, oldpoint[i][0].y);
			for(var j = 1; j < num; j++) {
				context.lineTo(oldpoint[i][j].x, oldpoint[i][j].y);
			}
			context.closePath();
			var opacity = i / oldpoint.length;
			context.strokeStyle = "rgba(169,18,144," + opacity + ")";
			context.stroke();
		}
		requestAnimationFrame(drawObj);
	}
	//  ========== 
	//  = 定时器函数 = 
	//  ========== 
	requestAnimationFrame(drawObj);
})();