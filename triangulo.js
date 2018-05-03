function hacerlinea(longitud) {
var linea = "";
for (var j = 1; j<=longitud; j++) {
linea = linea + "* "
}
return linea + "\n";
}

function construirTriangulo(n){
for (i = 1; i <= n; i++) {
console.log(hacerlinea(i));
}

}

construirTriangulo(10);
