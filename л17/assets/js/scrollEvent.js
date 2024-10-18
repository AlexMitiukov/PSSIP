//Скрипт выводит сообщение о текущем положении прокрутки.
const scrollContainer = document.getElementById('scrollContainer');
const scrollMessage = document.createElement('div');
scrollMessage.textContent = "Keep scrolling!";
scrollContainer.appendChild(scrollMessage);

scrollContainer.addEventListener('scroll', function() {
    const scrollPosition = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    
    if (scrollPosition === 0) {
        scrollMessage.textContent = "You're at the top!";
    } else if (scrollPosition >= maxScroll) {
        scrollMessage.textContent = "You've reached the bottom!";
    } else {
        scrollMessage.textContent = `Scroll position: ${scrollPosition}px`;
    }
});
