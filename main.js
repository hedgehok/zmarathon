const player1 = {
    name: 'Kitana',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    }
};

const player2 = {
    name: 'Sonya',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    }
};

function createPlayer(_class, player) {
    const $player = document.createElement('div');
    $player.classList.add(_class);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp + "%";
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}
createPlayer('player1', player1);
createPlayer('player2', player2);