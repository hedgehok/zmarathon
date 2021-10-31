import { createElement, getTime, getRandom } from './utils.js';
import { LOGS, ATTACK, HIT } from './const.js';
import { Player } from './player.js';

export default class Game {
    getPlayers = async () => {
        const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return data;
    }

    getRandomPlayer = async () => {
        const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return data;
    }

    getFightResults = async ({hit, defence}) => {
        const data = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());
        return data;
    }

    start = async () => {
        const $arenas = document.querySelector('.arenas');
        const $formFight = document.querySelector('form.control');
        const $chat = document.querySelector('.chat');

        function generateLogs(type, { name: name1 } = {}, { name: name2, hp } = {}, hit = null) {
            let text = LOGS[type][getRandom(LOGS[type].length) - 1];
            switch (type) {
                case 'start':
                    text = text.replace('[player1]', name1).replace('[player2]', name2).replace('[time]', getTime());
                    break;
                case 'end':
                    text = getTime() + ' - ' + text.replace('[playerWins]', name1).replace('[playerLose]', name2);
                    break;
                case 'hit':
                    const hpstr = `-${hit} [${hp}/100]`
                    text = getTime() + ' - ' + text.replace('[playerKick]', name1).replace('[playerDefence]', name2) + ' ' + hpstr;
                    break;
                case 'defence':
                    text = getTime() + ' - ' + text.replace('[playerKick]', name1).replace('[playerDefence]', name2);
                    break;
                case 'draw':
                    break;
            }
            const el = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
        }

        function createPlayer({ player, hp, name, img }) {
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
        
        function fight(player, hit) {
            player.changeHP(hit);
            player.renderHP();
        }
        
        function getPlayerAttack() {
            const attack = {};
            for (let item of $formFight) {
                if (item.checked && item.name === 'hit') {
                    attack.hit = item.value;
                }
        
                if (item.checked && item.name === 'defence') {
                    attack.defence = item.value;
                }
        
                item.checked = false;
            }
            return attack;
        }

        function createReloadButton() {
            const $wrap = createElement('div', 'reloadWrap');
            const $button = createElement('button', 'button');
            $button.innerText = 'Restart';
            $button.addEventListener('click', () => { window.location.reload() });
            $wrap.appendChild($button);
            $arenas.appendChild($wrap);
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
            $formFight.querySelector('button.button').disabled = true;
            createReloadButton();
        }

        // const players = await this.getPlayers();
        // console.log(players);
        // const p1 = players[getRandom(players.length) - 1];
        // const p2 = players[getRandom(players.length) - 1];

        const p1 = await this.getRandomPlayer();
        const p2 = await this.getRandomPlayer();

        const player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas'
        });

        const player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas'
        });

        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        $formFight.addEventListener('submit', async (e) => {
            e.preventDefault();
            const { player1: p1, player2: p2 } = await this.getFightResults(getPlayerAttack());
            if (p1.hit !== p2.defence) {
                fight(player2, p1.value);
                generateLogs('hit', player1, player2, p1.value);
            } else {
                generateLogs('defence', player1, player2);
            }
            if (p2.hit !== p1.defence) {
                fight(player1, p2.value);
                generateLogs('hit', player2, player1, p2.value);
            } else {
                generateLogs('defence', player2, player1);
            }
            checkResult();
        });
        generateLogs('start', player1, player2);
    }
}
