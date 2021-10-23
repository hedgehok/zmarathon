const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('button.button');
const $formFight = document.querySelector('form.control');
$formFight.addEventListener('submit', formFightSubmit);
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const logs = {
    start: ['Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.'],
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: ['Ничья - это тоже победа!']
};

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    },
    changeHP, elHP, renderHP
};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    },
    changeHP, elHP, renderHP
};

function getTime() {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}`;
}

function generateLogs(type, player1 = null, player2 = null, hit = null) {
    let text = logs[type][randomHP(logs[type].length) - 1];
    switch (type) {
        case 'start':
            text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', getTime());
            break;
        case 'end':
            text = getTime() + ' - ' + text.replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        case 'hit':
            const hp = `-${hit} [${player2.hp}/100]`
            text = getTime() + ' - ' + text.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + ' ' + hp;
            break;
        case 'defence':
            text = getTime() + ' - ' + text.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
        case 'draw':
            break; 
    }
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

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

function createReloadButton() {
    const $wrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', () => { window.location.reload() });
    $wrap.appendChild($button);
    $arenas.appendChild($wrap);
}

function randomHP(roof) {
    return Math.ceil(Math.random() * roof);
}

function fight(player, hit) {
    player.changeHP(hit);
    player.renderHP();
}

function checkResult() { 
    if (player1.hp === 0 || player2.hp === 0) {
        let winner = null;
        if (player1.hp > 0) {
            winner = player1.name;
            generateLogs('end', player1, player2);
        } else if (player2.hp > 0) {
            winner = player2.name;
            generateLogs('end', player2, player1);
        } else {
            generateLogs('draw');
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
    createReloadButton();
}

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life')
}

function renderHP(elem) {
    this.elHP().style.width = this.hp + '%';
}

function randomButtonHandler() {
    // fight(player1);
    // fight(player2);
    // checkResult();
}

function enemyAttack() {
    const hit = ATTACK[randomHP(3) - 1];
    const defence = ATTACK[randomHP(3) - 1];
    return {
        value: randomHP(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomHP(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    return attack;
}

function formFightSubmit(event) {
    event.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();
    // console.log('#### enemy', enemy);
    // console.log('#### attack', attack);

    if (attack.hit !== enemy.defence) {
        fight(player2, attack.value);
        generateLogs('hit', player1, player2, attack.value);
    } else {
        generateLogs('defence', player1, player2);
    }
    if (enemy.hit !== attack.defence) {
        fight(player1, enemy.value);
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }
    checkResult();
}

//$randomButton.addEventListener('click', randomButtonHandler);

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
