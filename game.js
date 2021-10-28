import { createElement, getTime, randomHP } from './utils.js';
import { LOGS } from './const.js';
import { Player, createPlayer, fight, enemyAttack, playerAttack } from './player.js';

export default class Game {
    constructor() { }

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
