const tic_tac_toc = {
    board: ["", "", "", "", "", "", "", "", "",],

    simbols: {
        options: ['X', 'O'],

        turn_index: 0,

        change: function () {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    gameOver: false,

    container_element: null,

    wining_sequences: [
        ['0,1,2'],
        ['3,4,5'],
        ['6,7,8'],
        ['0,3,6'],
        ['1,4,7'],
        ['2,5,8'],
        ['0,4,8'],
        ['2,4,6'],
    ],

    make_play: function (position) {
        if (this.gameOver === true) return false;

        if (this.board[position] === '') {

            this.board[position] = this.simbols.options[this.simbols.turn_index];

            this.draw();

            let index_wining_sequence = this.check_wining_sequences(this.simbols.options[this.simbols.turn_index])

            if (index_wining_sequence >= 0) {
                this.game_is_over();
            } else {
                this.simbols.change();
            }
        } else {
            return false;
        }
    },

    game_is_over: function () {
        this.gameOver = true;
    },

    start: function () {
        this.board.fill('');
        this.draw();
        this.gameOver = false;
    },

    color_win: function (elemnts) {
        for (i in elemnts) {
            elemnts[i].setAttribute('style', 'color: #00ff00');
        }
    },

    check_wining_sequences: function (simbol) {
        for (i in this.wining_sequences) {
            if (
                this.board[this.wining_sequences[i][0]] === simbol &&
                this.board[this.wining_sequences[i][1]] === simbol &&
                this.board[this.wining_sequences[i][2]] === simbol
            ) {
                this.color_win(this.wining_sequences[i]);
                console.log(this.wining_sequences[i]);
                return i;
            }
        }
        return -1;
    },

    init: function (container) {
        this.container_element = container;
    },

    draw: function () {

        this.write();

        let content = '';

        for (i in this.board) {
            content += '<div onclick="tic_tac_toc.make_play(' + i + ')">' + this.board[i] + '</div>';
        }

        this.container_element.innerHTML = content;
    },

    write: function () {
        let text_btn = "Start"
        let btn = document.querySelector('.button');
        btn.innerHTML = text_btn;

        btn.addEventListener('click', () => {
            this.start();
        })
    }
}

//Init Functions Game
tic_tac_toc.init(document.querySelector('.game'));
tic_tac_toc.start();