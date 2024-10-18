//при нажатии указателем (мышь или сенсор) на блок, цвет блока меняется на синий и отображается текст "Pointer Down". При отпускании — возвращается исходный вид
document.getElementById('pointerEventBox').addEventListener('pointerdown', function() {
    this.style.backgroundColor = 'blue';
    this.innerHTML = 'Pointer Down';
});

document.getElementById('pointerEventBox').addEventListener('pointerup', function() {
    this.style.backgroundColor = 'lightcoral';
    this.innerHTML = 'Pointer Event';
});