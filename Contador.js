var contador = 60;
while (contador>=0) {
if (contador == 50){
console.log("Iniciando proceso de despegue");
}
else if (contador == 31) {
console.log("Autosecuencia de motor lista para su uso");
}
else if (contador == 16) {
console.log("Sistema de ahorro de energia en funcinamiento");
}
else if (contador == 10) {
console.log("Sistema de refrigeracion en funcinamiento");
}
else if (contador == 6) {
console.log("Motor principal activado");
}
else if (contador == 0) {
console.log("Despegando");

}
else {
console.log(contador);}
contador = contador-1;
}
