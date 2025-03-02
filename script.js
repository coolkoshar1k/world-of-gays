const button = document.getElementById("button");
const message = document.getElementById("message");
const imageContainer = document.getElementById("image-container");
const celebrationImage = document.getElementById("celebration-image");
const celebrationSound = document.getElementById("celebration-sound");

// Функция для перемещения кнопки, ограничивая сдвиг до 15px
function moveButton() {
    // Получаем размеры кнопки и окна
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Минимальные отступы от стенок экрана
    const minDistance = 15;

    // Генерируем случайные сдвиги не более чем на 15px
    const randomX = Math.random() * 30 - 15;  // Перемещение в пределах от -15px до +15px
    const randomY = Math.random() * 30 - 15;  // Перемещение в пределах от -15px до +15px

    // Получаем текущее положение кнопки
    const currentX = buttonRect.left;
    const currentY = buttonRect.top;

    // Вычисляем новые координаты с учётом минимальных отступов от границ
    let newX = currentX + randomX;
    let newY = currentY + randomY;

    // Ограничиваем движение кнопки, чтобы она не выходила за пределы экрана
    if (newX < minDistance) newX = minDistance; // минимальный отступ слева
    if (newX + buttonWidth > windowWidth - minDistance) newX = windowWidth - buttonWidth - minDistance; // минимальный отступ справа

    if (newY < minDistance) newY = minDistance; // минимальный отступ сверху
    if (newY + buttonHeight > windowHeight - minDistance) newY = windowHeight - buttonHeight - minDistance; // минимальный отступ снизу

    // Перемещаем кнопку в новое положение
    button.style.transform = `translate(${newX}px, ${newY}px)`;
}

// Функция для проверки, не прижалась ли кнопка к краю
function checkButtonPosition() {
    const buttonRect = button.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Если кнопка слишком близко к краю, перемещаем её в центр
    if (buttonRect.left < 15 || buttonRect.top < 15 || 
        buttonRect.right > windowWidth - 15 || buttonRect.bottom > windowHeight - 15) {
        button.style.transform = `translate(${windowWidth / 2 - buttonRect.width / 2}px, ${windowHeight / 2 - buttonRect.height / 2}px)`;
    }
}

// Отслеживаем движение мыши по странице
document.addEventListener('mousemove', function(event) {
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Проверяем, если курсор близко к кнопке, то начинаем её двигать
    const distance = Math.sqrt(Math.pow(event.clientX - buttonCenterX, 2) + Math.pow(event.clientY - buttonCenterY, 2));
    
    if (distance < 110) {
        moveButton(); // Перемещаем кнопку с ограничением на 15px и минимальными отступами
    }

    checkButtonPosition(); // Проверяем, не прижалась ли кнопка к краю
});

// Обработчик нажатия на кнопку
button.addEventListener('click', function() {
    // Показываем сообщение и поздравляем
    message.innerText = "Поздравляем, вы нашли Нигриту!";
    message.style.display = "block";

    // Показываем фото
    imageContainer.style.display = "block";

    // Воспроизводим звук
    celebrationSound.play();
});
const buttonGay = document.getElementById('hideButton');
const text = document.getElementById('textOne');
const textW = document.getElementById('texTwo');
const afterAudio = document.getElementById('afterAudio');
// Добавляем обработчик события на клик
button.addEventListener('click', function() {
  // Скрываем кнопку
  button.style.display = 'none';
  textOne.style.display = 'none';
  textTwo.style.display = 'none';

  
});
// Слушаем событие окончания проигрывания аудио
audioPlayer.addEventListener('ended', () => {
    // Показываем текст и кнопку после окончания аудио
    afterAudio.style.display = 'block';
});
newButton.addEventListener('click', () => {
    // Переход на другую страницу
    window.location.href = 'second.html'; // Замените на URL нужной страницы
});
setTimeout(() => {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    const goToBookButton = document.getElementById('goToBookButton');
    const popupAudio = document.getElementById('popupAudio');

    popup.classList.remove('hidden'); // Показываем всплывающее окно
    popupAudio.play(); // Воспроизводим звук

    // Через 1 секунду увеличиваем изображение
    setTimeout(() => {
        popupImage.style.transform = 'scale(1.5)';
    }, 1000);

    // Через 1 секунду показываем текст
    setTimeout(() => {
        popupText.classList.remove('hidden');
    }, 1000);

    // Через 3 секунды показываем кнопку
    setTimeout(() => {
        goToBookButton.classList.remove('hidden');
    }, 3000);

    // При нажатии на кнопку переходим на другую страницу
    goToBookButton.addEventListener('click', () => {
        window.location.href = 'book.html';
    });

}, 17000); // Срабатывает через 17 секунд после загрузки страницы
document.body.addEventListener("click", () => {
    if (!userInteracted) {
        userInteracted = true;
        audio.volume = 0;
        audio.play().then(() => {
            audio.pause();
            audio.volume = 1;  // Возвращаем громкость
            startDialogue();
        }).catch(error => console.log("Ошибка воспроизведения:", error));
    }
});
const dialogueAudios = [
    new Audio("audio/phrase1.mp3"),
    new Audio("audio/phrase2.mp3"),
    new Audio("audio/phrase3.mp3"),
    new Audio("audio/phrase4.mp3"),
];

function startDialogue() {
    function nextDialogue() {
        if (index < dialogues.length) {
            dialogueAudios[index].play();
            typeText(dialogues[index], nextDialogue);
            index++;
        } else {
            startExitAnimation();
        }
    }
    nextDialogue();
}
