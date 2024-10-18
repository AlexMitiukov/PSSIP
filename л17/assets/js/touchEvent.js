// Когда происходит касание, выводится количество пальцев, задействованных в касании.
const touchBox = document.getElementById('touchBox');
let touchCount = 0;

touchBox.addEventListener('touchstart', function(event) {
    touchCount = event.touches.length;
    this.style.backgroundColor = 'orange';
    this.innerHTML = `Touched with ${touchCount} finger(s)`;
});

touchBox.addEventListener('touchmove', function(event) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    this.innerHTML = `Moving at (${touchX}, ${touchY})`;
});

touchBox.addEventListener('touchend', function() {
    this.style.backgroundColor = 'lightgreen';
    this.innerHTML = 'Touch Me';
});