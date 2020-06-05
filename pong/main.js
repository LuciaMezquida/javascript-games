/*vamos a crear uno de los objetos, dentro de una funcion anónima
que se va a llamar a sí misma para que no tengamos que contaminar
el scop general del proyecto. self.Board será la pizarra, con su
ancho(width) y su alto(height).*/
(function(){
	self.Board = function(width,height){
		this.width = width;
		this.height = height;
//dos variables booleanas. Si se está jugando o si el juego ha terminado
		this.playing = false;
		this.game_over = false;
		//esto serán las barras del juego y la pelota
		this.bars = [];
		this.ball = null;
		this.playing = false;
	}
//vamos a modificar el prototipo de la clase para modificar los metodos
//de la misma. El objeno JSON nos va a permitir declarar diferentes
//funciones o metodos para el prototipo.
/*self vale algo en funcion del contexto en el que estés. A pesar de
estar declarada dentro de una función anónima, podemos acceder a ella 
fuera de la función. Lo mismo pasa con window: es un scope global
*/
	self.Board.prototype = {
		get elements(){
			var elements = this.bars.map(function(bar){ return bar; });
			elements.push(this.ball);
			return elements;
		}
	}
})();
(function(){
	self.Ball = function(x,y,radius,board,){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed_y = 0;
		this.speed_x = 3;
		this.board = board;
		this.direction = 1;
		this.bounce_angle = 0;
		this.max_bounce_angle = Math.PI / 12;
		this.speed = 4;

		board.ball = this;
		this.kind = 'circle';
		}

		self.Ball.prototype = {
			move: function(){
				this.x = this.x + (this.speed_x * this.direction);
				this.y = this.y + (this.speed_y);
			},
			get width(){
				return this.radius * 2;
			},
			get height(){
				return this.radius * 2;
			},

	collision: function(bar){
		//reacciona a la colision con una barra que recibe como parametro
		var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;
		var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

		this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
		console.log(this.bounce_angle);
		this.speed_y = this.speed * -Math.sin(this.bounce_angle);
		this.speed_x = this.speed * Math.cos(this.bounce_angle);

		if(this.x > (this.board.width / 2)) this.direction = -1;
		else this.direction = 1;

	}

	}
}());

//x e y son coordenadas
(function(){
	self.Bar = function (x,y,width,height,board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this);
//para dibujar las cosas vamos a necesitar una variable especial que nos
//diga que esto es un rectangulo
		this.kind = 'rectangle';
		this.speed = 30;
	}

	self.Bar.prototype = {
		down: function(){
			this.y = this.y + this.speed;

		},
		up: function(){
			this.y = this.y - this.speed;
		},
		toString: function(){
			return 'x: '+ this.x +' y: '+ this.y;
		}
	}
})();

/*No vamos a dibujar un tablero como tal, sino que vamos a crear una
clase que se encargue de todo ello. Así que creamos otra función anónima
para definir una nueva clase. Canvas es el elemento que tenemos en html
y que vamos a utilizar para dibujar todos nuestros elementos en la vista,
que dependerán del width y height que especifiquemos*/

(function(){
	self.BoardView = function(canvas,board){
			this.canvas = canvas;
			this.canvas.width = board.width;
			this.canvas.height = board.height;
			this.board = board;
//vamos a generar un contexto, que es un objeto a traves del cual podemos
//dibujar en JS
			this.ctx = canvas.getContext('2d');
	}

	self.BoardView.prototype = {
		//esto va a limpiar, es decir, dibujar un rectangulo transparente
		clean: function(){
			this.ctx.clearRect(0,0,this.board.width,this.board.height);
		},
		draw: function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];
				draw (this.ctx,el);
			};
		},
		check_collisions: function(){
			for (var i = this.board.bars.length - 1; i >= 0; i--) {
				var bar = this.board.bars[i];
				if(hit(bar, this.board.ball)){
					this.board.ball.collision(bar);
				}
			};
		},
		play: function(){
			if(this.board.playing){
				this.clean();
				this.draw();
				this.check_collisions();
				this.board.ball.move();
			}
			
		}
	}

	function hit(a,b){
		//revisa si a colisiona con b
		var hit = false;
		//colisiones horizontales
		if(b.x + b.width >= a.x && b.x < a.x + a.width){
			if(b.y + b.height >= a.y && b.y < a.y + a.height)
				hit = true;
		}
		//colision de a con b
		if(b.x <= a.x &&b.x + b.width >= a.x + a.width){
			if(b.y <= a.y && b.y + b.height >= a.y + a.height)
				hit = true;
		}
		//colision de b con a
		if(a.x <= b.x && a.x + a.width >= b.x + b.width){
			if(a.y <= b.y && a.y + a.height >= b.y + b.height)
				hit = true;
		}
		return hit;
	}
//vamos a dibujar un método draw. fuera de la funcion boardview pero dentro
//de la función anónima.

function draw(ctx,element){
	
		switch(element.kind){
		case 'rectangle':
		//fillRect es una funcion que nos permite dibujar un cuadrado
		ctx.fillRect(element.x,element.y,element.width,element.height);
		break;
		case 'circle':
		ctx.beginPath();
		ctx.arc(element.x,element.y,element.radius,0,7);
		ctx.fill();
		ctx.closePath();
		break;
	}
	
}
})();

	var board = new Board(800,400);
	var bar = new Bar (20,100,20,100,board);
	var bar_2 = new Bar (760,100,20,100,board);
	var canvas = document.getElementById('canvas');
	var board_view = new BoardView(canvas,board);
	var ball = new Ball(350,100,10,board);



//ev va a traer informacion del evento
document.addEventListener('keydown',function(ev){

		
	if(ev.keyCode === 87){//w
		ev.preventDefault();
		bar.up();
	}else if(ev.keyCode === 83){//s
		ev.preventDefault();
		bar.down();
	}else if(ev.keyCode === 38){//flecha arriba
		ev.preventDefault();
		bar_2.up();
	}else if(ev.keyCode === 40){//flecha abajo
		ev.preventDefault();
		bar_2.down();
	}else if(ev.keyCode == 32){//barra espacio. Para pausar el juego
		ev.preventDefault();
		board.playing = !board.playing;
	}

});

board_view.draw()

//window.addEventListener('load',main);
//para animar las barras
window.requestAnimationFrame(controller);

//controller es un controlador que instancia nuestros objetos
function controller(){
	board_view.play();
	window.requestAnimationFrame(controller);
}