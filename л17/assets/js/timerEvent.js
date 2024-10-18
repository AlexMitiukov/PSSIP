//при нажатии на кнопку запускается таймер, который каждую секунду увеличивает значение на экране
let timer = 0;
let interval;

document.getElementById('startTimerButton').addEventListener('click', function() {
    if (!interval) {
        interval = setInterval(function() {
            timer++;
            document.getElementById('timerDisplay').textContent = timer;
        }, 1000);
    }
});