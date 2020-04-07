(function (win, doc) {
    'use strict'
    const tic_toc_toe = {
        board: ["", "", "", "", "", "", "", "", "",],
        options: {
            simbols: ["X", "O"],
            turn_idx: 0,
            change: function () {
                this.turn_idx = (this.turn_idx === 0 ? 1 : 0);
            }
        },

        gameover: false,

        container_element: null,

        wining_sequences: [
            ['0', '1', '2'],
            ['3', '4', '5'],
            ['6', '7', '8'],
            ['0', '3', '6'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['0', '4', '8'],
            ['2', '4', '6'],
        ],

        init: function (element) {
            this.container_element = element;
        },

        make_play: function (position) {
            if (this.gameover === true) return false;

            if (this.board[position] === '') {
                this.board[position] = this.options.simbols[this.options.turn_idx];

                this.draw();

                if (this.verify_win(this.options.simbols[this.options.turn_idx]) >= 0) {
                    this.game_is_over();
                } else {
                    this.options.change();
                }

            } else {
                return false;
            }
        },

        draw: function () {

            let content = '';

            for (let i in this.board) {
                content += '<div onclick="tic_toc_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
            }

            this.container_element.innerHTML = content;
        },

        verify_win: function (simbol) {
            for (let i in this.wining_sequences) {
                if (
                    (this.board[this.wining_sequences[i][0]] === simbol) &&
                    (this.board[this.wining_sequences[i][1]] === simbol) &&
                    (this.board[this.wining_sequences[i][2]] === simbol)
                ) {
                    this.color_win(this.wining_sequences[i][0]);
                    this.color_win(this.wining_sequences[i][1]);
                    this.color_win(this.wining_sequences[i][2]);
                    return i;
                }
            }
            return -1;
        },

        game_is_over: function () {
            this.messages(this.options.turn_idx);
            this.gameover = true;
        },

        start: function () {
            this.write();
            this.board.fill('');
            this.draw();
            this.gameover = false;
        },

        write: function () {
            let btn = doc.querySelector('.button');

            btn.innerHTML = "Start";

            btn.addEventListener('click', () => {
                this.start();
            })
        },

        messages: function (player) {
            if (player === 0) {
                alert('Jogador 1, ganhou!');
            } else {
                alert('Jogador 2, ganhou!');
            }
        },

        color_win: function (element) {
            let arr = this.container_element;

            arr.childNodes[element].style = 'color: #0f0;';

        }
    }

    tic_toc_toe.init(doc.querySelector('.game'));
    tic_toc_toe.start();

    win.tic_toc_toe = tic_toc_toe;

})(window, document);