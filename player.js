import { createElement, randomHP } from './utils.js';
import { HIT, ATTACK } from './const.js';

export class Player {
    constructor(props) {
        this.player = props.player,
        this.name = props.name,
        this.hp = props.hp,
        this.img = props.img
    }

    changeHP = (damage) => {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }
    
    elHP = () => {
        return document.querySelector(`.player${this.player} .life`)
    }
    
    renderHP = (elem) => {
        this.elHP().style.width = this.hp + '%';
    }
}

export function createPlayer({ player, hp, name, img }) {
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = hp + '%';
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText = name;
    $progressbar.appendChild($name);

    const $character = createElement('div', 'character');

    const $img = createElement('img');
    $img.src = img;
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
