import { createElement, getTime, randomHP } from './utils.js';
import { LOGS, ATTACK, HIT } from './const.js';
import { Player } from './player.js';

export default class Game {
    start = () => {
        const $arenas = document.querySelector('.arenas');
        const $formFight = document.querySelector('form.control');
        const $chat = document.querySelector('.chat');

        function generateLogs(type, { name: name1 } = {}, { name: name2, hp } = {}, hit = null) {
            let text = LOGS[type][randomHP(LOGS[type].length) - 1];
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
        
        function enemyAttack() {
            const hit = ATTACK[randomHP(3) - 1];
            const defence = ATTACK[randomHP(3) - 1];
            return {
                value: randomHP(HIT[hit]),
                hit,
                defence
            }
        }
        
        function playerAttack(form) {
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

        const player1 = new Player({
            player: 1,
            name: 'Kitana',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
        });

        const player2 = new Player({
            player: 2,
            name: 'Sonya',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
        });

        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        $formFight.addEventListener('submit', (e) => {
            e.preventDefault();
            const enemy = enemyAttack();
            const attack = playerAttack($formFight);
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
        });
        generateLogs('start', player1, player2);
    }
}
