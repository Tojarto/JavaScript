var saldo = -10;

var activa = false;

var comprobar = true;


if (comprobar === false){

console.log("Gracias.¡Qué tengas un buen día!");}

else if (activa === false){

console.log("Su cuenta no esta activa");}

else if (saldo === 0){

console.log("No tiene dinero en su cuenta");}

else if (saldo < 0){

console.log("Su saldo es negativo. Póngase en contacto con su banco.");}

else{

console.log("Su saldo es " + saldo + "€");}


_______________________________________________________________________



var saldo = 10;

var activa = true;

var comprobar = true;


if (comprobar === false){

console.log("Gracias.¡Qué tengas un buen día!");}

else if (activa === true && saldo > 0){

console.log("Su saldo es " + saldo + "€");}

else if (activa === false){

console.log("Su cuenta no esta activa");}

else if (saldo < 0){

console.log("Su saldo es negativo. Póngase en contacto con su banco.");}

else{

console.log("Su saldo es 0, NO TIENES DINEROS");}
