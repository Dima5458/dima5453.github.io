var D = new Date(),
r = 5 - D.getDay();
if (r == -1) r = 6;
D.setDate(D.getDate() + r);
document.write(D + '<br>');
for (var i=0; i<4; i++) {
D.setDate(D.getDate() + 7);
document.write(D + '<br>');
}
