const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('button.button');

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    }
};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className)
        $tag.classList.add(className);
    return $tag;
}

function createPlayer(player) {
    const $player = createElement('div', `player${player.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = player.hp + '%';
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);

    const $character = createElement('div', 'character');

    const $img = createElement('img');
    $img.src = player.img;
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function randomHP() {
    return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomHP();
    if (player.hp <= 0) {
        player.hp = 0;
    }
    $playerLife.style.width = player.hp + '%';
}

function checkResult() { 
    if (player1.hp === 0 || player2.hp === 0) {
        let winner = null;
        if (player1.hp > 0) {
            winner = player1.name;
        } else if (player2.hp > 0) {
            winner = player2.name;
        }
        endGame(winner);
    }
}

function endGame(winner) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (winner) {
        $loseTitle.innerText = winner + ' wins';
    } else {
        $loseTitle.innerText = 'double kill';
    }
    $arenas.appendChild($loseTitle);

    $randomButton.removeEventListener('click', randomButtonHandler);
    $randomButton.disabled = true;
}

function randomButtonHandler() {
    changeHP(player1);
    changeHP(player2);
    checkResult();
}

$randomButton.addEventListener('click', randomButtonHandler);

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));