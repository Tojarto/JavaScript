var x = 0;
while (x<=20) {
if (x%5===0 && x%3===0) {
console.log(x +"es divisible por 5 y 3");
}if (x%5===0) {
console.log(x +"es divisible por 5");
}
if (x%3===0) {
console.log(x +"es divisible por 3");
} else {
console.log(x +"no es divisible por 3 ni por 5");
}
x=x+1;
}
