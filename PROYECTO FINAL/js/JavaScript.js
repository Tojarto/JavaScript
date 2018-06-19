//Sirve para establecer la altura del contenido y que no se pueda manipular
function pagina1() {
  document.getElementById('primeraPantalla').style.height = "0";
  document.getElementById('segundaPantalla').style.height = "100%";
}

//esta funcion nos dará una alerta en caso de que el jugador no indique un nombre de usuario
function pagina2() {
  var player = document.getElementById('player').value;
  if(player == ""){
    alert('Tienes que introducir un nombre de usuario obligatoriamente')
    return false;
    player.focus();
  }
  document.getElementById('segundaPantalla').style.height = "0";
  document.getElementById('pantallaJuego').style.height = "100%";
  document.getElementById('jugador').innerText = player.toUpperCase();

/*Estamos guardando una referencia al elemento <canvas> en la variable canvas.
Después estamos creando la variable ctx para guardar el contexto de gráficos 2D,
que es la herramienta  que realmente utilizaremos para dibujar.*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

  // Definimos las variables que van a determinar el comportamiento de la bola
// Y que tambien utilizaremos para definir el tamaño de nuestra bola.
var ballRadius = 7; // Mantendra el radio del circulo dibujado y tambien se utilizara para hacer calculos.
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 4; // COntrolar la velocidad de la pelota
var dy = -4;
// Incuiremos las siguientes variables para definir el ancho y el alto de la paleta que usaremos
var paddleHeight = 40;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// Variables que utilizamos para controlar si esta pulsada cualquiera de las teclas izq o derecha.
var rightPressed = false;
var leftPressed = false;
// Declaramos e inicilaizamos las variables que van a controlar a los bloques.
var brickRowCount = 6;
var brickColumnCount = 5;
var brickWidth = 85;
var brickHeight = 30;
var brickPadding = 15;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0; //Añadimos la variable score para controlar la puntuación.
var cancion_inicio = document.getElementById("cancion_inicio"); //Cancion que sonara por defecto al jugar al juego.
cancion_inicio.play(); // Aqui estamos ejecutando la cancion con el metodo play.
cancion_inicio.loop=true; // Con este metodo loop estamos controlando que la cancion suene todo el rato por defecto.
var sonido_paleta = document.getElementById("sonido_paleta"); // Alamacenamos en una variable el sonido de la paleta identificado por un ID
var game_over = document.getElementById("game_over"); // Almacenamos en una variable el sonido de game over identificado por un ID
var cancion_win = document.getElementById("cancion_win"); // Alamacenamos en una variable el sonido de cuando ganas identificado por un ID


// Con este bucle lo que estamos haciendo es recorrer cada una de las columnas y las filas de los ladrillos.
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

  // Para escuchar las pulsaciones de las teclas necesitamos definir los escuchadores de eventos.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Con este evento controlamos el movimiento del raton.
document.addEventListener("mousemove", mouseMoveHandler, false);
  //sirve para poder jugar con las flechas izquierda o derecha

//Cuando ocurra el evento keydown al pulsar cualquier tecla del teclado,
//la función keyDownHandler() se ejecutará.
//Cuando se liberará la tecla pulsada, se ejecutará la función keyUpHandler().
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

 // COn esta funcion asociamos el movimiento de la pala con el movimiento del raton.
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
// Esta funcion recorre con un bucle cada uno de los ladrillos y lo comparara con la posicion actual de la bola
// Cada vez que se dibuje cada fotograma.
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
			//si el ladrillo está activo (status 1) comrpobaremos si hay colisión.
			//Si hay colisión, pondremos el "status" de ese ladrillo a 0 para no volver a pintarlo.
            if(b.status == 1) {
			//Se cumplirá que el centro de la bola está dentro de ladrillo
			//si se cumplen al mismo tiempo estas cuatro condiciones:
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
					// Incrementamos la variable score en caso de que se colisione con un ladrillo.
                    score++;
					//Mostramos el mensaje de victoria en caso de que se rompan todos los ladrillos.
                    if(score == brickRowCount*brickColumnCount) {
						cancion_inicio.pause();
						cancion_win.play();
                        alert("Has ganado, eres el mejorr");
						// COn este metodo volvemos a cargar la pagina.
                        document.location.reload();
                    }
                }
            }
        }
    }
}

  // Con esta funcion estamos dibujando la bola indicando el tamaño con los parametros de entrada que recibe.
function drawBall() {

    ctx.beginPath();
	//Actualizaremos el paramtro de entrada que recibe esta funcion para dibujar la bola.
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#85C220";
    ctx.fill();
    ctx.closePath();
}

 // Esta funcion se encargara de dibujar la paleta en la pantalla
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#1BFC8F";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
		//A continuación consultaremos el "status" de cada ladrillo para saber si lo tenemos que dibujar o no. Si "status" vale 1, lo dibujaremos.
		//Si vale 0, no lo dibujaremos porque habrá sido golpeado por la bola.
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#BBF601";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Con esta funcion actualizamos el lienzo

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(); //Llamamos al la funcion de dibujar los ladrillos
    drawBall(); //Llamamos al la funcion de dibujar los pelota
    drawPaddle(); //Llamamos al la funcion de dibujar la paleta
	collisionDetection(); //Llamamos al la funcion de teteccion de colisiones
    document.getElementById('puntuacion').innerText = puntuacion;
    document.getElementById('vidas').innerText = score;

	// Aqui estamos controlando el rebote de la bola tanto en las paredes superiores como en las paredes laterales.
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
	// Aqui estams controlando si la pelota golepa contra la paleta.
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
			sonido_paleta.play(); // En caso de que golpee iniciaremos la sonido de la paleta para darle ese efecto al golpear.
        }
        else {
		//Aqui estamos controlando si las vidas llegan a 0 es cuando volveremos a cargar la interfaz de nuevo.
            lives--;
            if(!lives) {
				cancion_inicio.pause(); //Pausamos la cancion por defecto
				game_over.play(); //Iniciamos la cancion de game over.
                alert("GAME OVER"); // Mostramos un mensaje de que has perdido.
                document.location.reload(); // Volvemos a cargar la pagina web.

            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
				// Este codigo realmente no hace falta porque no quiero cambiar la velocidad de la pelota en caso de que pierda una vida
                //dx = 4;
                //dy = -4;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }



  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 10;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 10;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();

}
