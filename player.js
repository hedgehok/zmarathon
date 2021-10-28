import { createElement, randomHP } from './utils.js';
import { HIT, ATTACK } from './const.js';

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

export const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    },
    changeHP, elHP, renderHP
}

export const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' fight...')
    },
    changeHP, elHP, renderHP
}

export function createPlayer(player) {
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

export function fight(player, hit) {
    player.changeHP(hit);
    player.renderHP();
}

export function enemyAttack() {
    const hit = ATTACK[randomHP(3) - 1];
    const defence = ATTACK[randomHP(3) - 1];
    return {
        value: randomHP(HIT[hit]),
        hit,
        defence
    }
}

export function playerAttack(form) {
    const attack = {};
    for (let item of form) {
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
