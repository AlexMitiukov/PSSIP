//при нажатии любой клавиши в текстовом поле выводится всплывающее сообщение с названием нажатой клавиши
document.getElementById('keyboardEventInput').addEventListener('keydown', function(event) {
    alert(`Key pressed: ${event.key}`);
});