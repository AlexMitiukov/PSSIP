//элемент можно перетаскивать, и когда он попадает в зону для сброса, появляется надпись "Dropped!"
const draggable = document.getElementById('draggable');
const dropZone = document.getElementById('dropZone');

draggable.addEventListener('dragstart', function() {
    draggable.style.opacity = '0.5';
});

draggable.addEventListener('dragend', function() {
    draggable.style.opacity = '1';
});

dropZone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropZone.addEventListener('drop', function() {
    dropZone.innerHTML = 'Dropped!';
});
