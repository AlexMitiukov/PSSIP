const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Настройки холста
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Загрузка изображений
const shipImage = new Image();
shipImage.src = 'assets/img/gun.png';
const bulletImage = new Image();
bulletImage.src = 'assets/img/bullet.png'; // Изображение пули
const alienImage = new Image();
alienImage.src = 'assets/img/alien.png'; // Изображение пришельца

// Массивы для хранения объектов
const bullets = [];
const aliens = [];

// Параметры корабля
const ship = {
    width: 60,
    height: 60,
    x: canvas.width / 2 - 30,  // Позиционируем по центру
    y: canvas.height - 80,
    speed: 10,
    dx: 0
};

// Параметры пришельца
const alien = {
    width: 60, // Размер пришельца
    height: 60, // Размер пришельца
    speed: 2 // Скорость падения
};

// Переменная для состояния игры
let isGameOver = false;
let alienInterval; // Переменная для хранения интервала создания пришельцев
let score = 0; // Счет игрока

// Обработка нажатий клавиш
function keyDown(e) {
    if (isGameOver) {
        if (e.key === 'r' || e.key === 'R') {
            resetGame(); // Перезапуск игры
        }
        return; // Игнорируем остальные нажатия
    }
    
    if (e.key === 'a' || e.key === 'A') {
        ship.dx = -ship.speed;  // Влево
    } else if (e.key === 'd' || e.key === 'D') {
        ship.dx = ship.speed;   // Вправо
    } else if (e.key === ' ') {
        shootBullet(); // Стрелять
    }
}

function keyUp(e) {
    if (e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D') {
        ship.dx = 0; // Останавливаем корабль
    }
}

// Создание пришельца
function createAlien() {
    const newAlien = {
        x: Math.random() * (canvas.width - alien.width), // Случайная позиция по X
        y: 0,
        width: alien.width,
        height: alien.height,
        speed: alien.speed
    };
    aliens.push(newAlien);
}

// Движение пришельцев
function moveAliens() {
    for (let i = 0; i < aliens.length; i++) {
        aliens[i].y += aliens[i].speed; // Двигаем пришельца вниз

        // Проверяем пересечение с кораблем
        if (checkCollision(ship, aliens[i])) {
            isGameOver = true; // Конец игры
        }

        // Проверяем, достиг ли пришелец нижней границы экрана
        if (aliens[i].y > canvas.height) {
            isGameOver = true; // Конец игры
        }
    }
}

// Проверка на пересечение
function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

// Перемещение корабля
function moveShip() {
    ship.x += ship.dx;

    // Не позволяем кораблю выходить за границы холста
    if (ship.x < 0) {
        ship.x = 0;
    }

    if (ship.x + ship.width > canvas.width) {
        ship.x = canvas.width - ship.width;
    }
}

// Создание пули
function shootBullet() {
    const bullet = {
        x: ship.x + ship.width / 2 - 2, // Центр корабля
        y: ship.y,
        width: 4,
        height: 10,
        speed: 5
    };
    bullets.push(bullet);
}

// Движение пуль
function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed; // Двигаем пулю вверх

        // Удаляем пулю, если она вышла за пределы холста
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--; // Уменьшаем индекс, чтобы не пропустить следующий элемент
        }
    }
}

// Уничтожение пуль и пришельцев при столкновении
function checkBulletAlienCollision() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < aliens.length; j++) {
            if (checkCollision(bullets[i], aliens[j])) {
                bullets.splice(i, 1); // Удаляем пулю
                aliens.splice(j, 1); // Удаляем пришельца
                score += 20; // Добавляем очки
                i--; // Уменьшаем индекс, чтобы не пропустить следующий элемент
                break; // Прерываем внутренний цикл
            }
        }
    }
}

// Отрисовка пуль
function drawBullets() {
    for (let bullet of bullets) {
        ctx.fillStyle = '#fff'; // Цвет пули
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

// Отрисовка пришельцев
function drawAliens() {
    for (let alien of aliens) {
        ctx.drawImage(alienImage, alien.x, alien.y, alien.width, alien.height);
    }
}

// Отрисовка корабля
function drawShip() {
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
}

// Отрисовка счета
function drawScore() {
    ctx.fillStyle = '#fff'; // Цвет текста
    ctx.font = '24px Arial';
    ctx.fillText(`Очки: ${score}`, 10, 30); // Отображаем очки в верхнем левом углу
}

// Основной игровой цикл
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveShip();
    moveBullets();
    moveAliens();
    checkBulletAlienCollision(); // Проверяем столкновения
    drawShip();
    drawBullets();
    drawAliens();
    drawScore(); // Отрисовываем счет

    // Если игра окончена, выводим сообщение
    if (isGameOver) {
        return; // Завершаем цикл
    }

    requestAnimationFrame(update);
}

// Перезапуск игры
function resetGame() {
    isGameOver = false; // Сбрасываем статус игры
    bullets.length = 0; // Очищаем массив пуль
    aliens.length = 0; // Очищаем массив пришельцев
    score = 0; // Сбрасываем счет
    ship.x = canvas.width / 2 - ship.width / 2; // Сброс позиции корабля
    ship.y = canvas.height - 80; // Сброс высоты корабля
    clearInterval(alienInterval); // Очищаем предыдущий интервал
    alienInterval = setInterval(createAlien, 500); // Создаем нового пришельца каждые 500 мс
}

// Слушатели событий для нажатий клавиш
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Запуск игры после загрузки корабля
shipImage.onload = () => {
    update();
    alienInterval = setInterval(createAlien, 1000); // Создаем нового пришельца каждую секунду
};
