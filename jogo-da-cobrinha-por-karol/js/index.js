var board = [];
var cobra = [];
var intervalo;
var width = 20;
var height = 20;
var size = width * height;
var velo = 300;
var dir = 40;
var maca;

for (var i = 0; i < size; i++) {
  board[i] = { id: i, status: 'dead' };
}
maca = 350;
cobra[0] = 62;
cobra[1] = 61;
cobra[2] = 60;

for (var i = 0; i < cobra.length; i++) {
  board[cobra[i]] = { id: cobra[i], status: 'alive' };
}
board[maca] = { id: maca, status: 'maca' };

var Arena = React.createClass({ displayName: 'Arena',
  turn: function turn() {
    this.props.turn(this.props.id);
  },
  render: function render() {
    return React.createElement('div', { id: this.props.id, className: this.props.status });
  } });


var JogoCobra = React.createClass({ displayName: 'JogoCobra',

  getInitialState: function getInitialState() {
    return {
      board: board,
      dir: dir,
      cobra: cobra,
      visao: 1 };

  },

  move: function move() {
    var dir = this.state.dir;
    var board = this.state.board;
    var newBoard = board;
    var novacabeca;
    var ultimo = cobra[cobra.length - 1];
    if (dir == 37) {
      novacabeca = cobra[0] - 1;
      if (novacabeca % width == width - 1) {return this.clear();}
    }
    if (dir == 39) {
      novacabeca = cobra[0] + 1;
      if (novacabeca % width == 0) {return this.clear();}
    }
    if (dir == 40) {
      novacabeca = cobra[0] + width;
      if (novacabeca > size - 1) {return this.clear();}
    }
    if (dir == 38) {
      novacabeca = cobra[0] - width;
      if (novacabeca < -1)
      {return this.clear();}
    }
    if (novacabeca == maca) {
      this.aumentarcobra();
    }
    cobra.pop();
    cobra.unshift(novacabeca);
    if (dir != 0) newBoard[ultimo] = { id: ultimo, status: 'dead' };
    board[maca] = { id: maca, status: 'maca' };
    newBoard[novacabeca] = { id: novacabeca, status: 'alive' };

    for (var i = 1; i < cobra.length; i++) {
      if (novacabeca == cobra[i]) {
        return this.clear();
      }
    }

    this.setState({ board: newBoard,
      dir: dir,
      visao: 2,
      pontuacao: cobra.length - 3 });

  },

  setDirection: function setDirection(_ref) {var _this = this;var keyCode = _ref.keyCode;
    var difdir = true;
    [[38, 40], [37, 39]].forEach(function (dir) {
      if (dir.indexOf(_this.state.dir) > -1 && dir.indexOf(keyCode) > -1) {
        difdir = false;
      }
    });

    if (difdir) this.setState({ dir: keyCode });
  },

  aumentarcobra: function aumentarcobra() {
    board[cobra[cobra.length - 1]] = { id: cobra[cobra.length - 1], status: 'alive' };
    cobra.push(cobra[cobra.length - 1]);
    maca = Math.floor(Math.random() * size);
  },

  iniciar: function iniciar() {

    this.setState({
      visao: 2 });


    intervalo = setInterval(this.move, velo);
  },

  reiniciar: function reiniciar() {
    this.setState({
      dir: 40 });

  },

  clear: function clear() {

    var newBoard = [];
    var newCobra = [];
    newCobra[0] = 62;
    newCobra[1] = 61;
    newCobra[2] = 60;
    var newMaca = 350;

    maca = newMaca;
    cobra = [];
    cobra = newCobra;

    for (var i = 0; i < size; i++) {
      newBoard[i] = { id: i, status: 'dead' };
    }

    for (var i = 0; i < newCobra.length; i++) {
      newBoard[newCobra[i]] = { id: newCobra[i], status: 'alive' };
    }

    newBoard[newMaca] = { id: newMaca, status: 'maca' };
    dir = 37;

    this.setState({
      board: newBoard,
      cobra: newCobra,
      maca: newMaca,
      dir: dir,
      visao: 3 });


  },

  render: function render() {
    var squares = this.state.board.map(function (item) {
      return React.createElement(Arena, { id: item.id, status: item.status });
    }.bind(this));


    return (
      React.createElement('div', null,
        React.createElement('h1', { className: 'nomejogo' }, 'Jogo da Cobrinha'),
        React.createElement('p', { className: 'by' }, 'por '), React.createElement('p', { className: 'Karol' }, ' Karol Borges'),
        React.createElement('a', { href: 'https://en.wikipedia.org/wiki/Snake_(video_game_genre)', target: '_blank', className: 'infoBtn btn btn-default' }, 'Sobre'),
        document.onkeydown = this.setDirection,
        React.createElement('div', { className: 'boardContainer' }, squares),
        this.state.visao == 1 &&
        React.createElement('button', { className: 'botao', onClick: this.iniciar }, 'Iniciar Jogo'),
        this.state.visao == 2 &&
        React.createElement('div', { className: 'botao' }, 'Pontua\xE7\xE3o: ', this.state.pontuacao),
        this.state.visao == 3 &&
        React.createElement('div', null, React.createElement('div', { className: 'telaGameOver' }, React.createElement('h1', { className: 'gameover' }, 'FIM DE JOGO'),
            React.createElement('p', null, 'Sua pontua\xE7\xE3o foi: ', this.state.pontuacao)),
          React.createElement('button', { className: 'botao', onClick: this.reiniciar }, 'Reiniciar JOGO'))));






  } });


ReactDOM.render(React.createElement(JogoCobra, null), document.getElementById('app'));