class RpsGame {

    constructor(p1, p2) {
      this._players = [p1, p2];
      this._turns = [null, null];
  
      this._sendToPlayers('Камень, Ножницы, Бумага, 1, 2, 3!');
  
      this._players.forEach((player, idx) => {
        player.on('turn', (turn) => {
          this._onTurn(idx, turn);
        });
      });
    }
  
    _sendToPlayer(playerIndex, msg) {
      this._players[playerIndex].emit('message', msg);
    }
  
    _sendToPlayers(msg) {
      this._players.forEach((player) => {
        player.emit('message', msg);
      });
    }
  
    _onTurn(playerIndex, turn) {
      this._turns[playerIndex] = turn;
      this._sendToPlayer(playerIndex, `Вы выбрали ${turn}`);
  
      this._checkGameOver();
    }
  
    _checkGameOver() {
      const turns = this._turns;
  
      if (turns[0] && turns[1]) {
        //this._sendToPlayers('Игра окончена ' + turns.join(' : '));
        this._turns = [null, null];
        if(turns[0] == turns[1])
        {
            this._sendToPlayers('Ничья!');
        }else {
            if (((turns[0]=='paper') && (turns[1]=='rock'))||((turns[1]=='paper') && (turns[0]=='rock')))
            {this._sendToPlayers('Бумага победила!');}
            if (((turns[0]=='paper') && (turns[1]=='scissors'))||((turns[1]=='paper') && (turns[0]=='scissors')))
            {this._sendToPlayers('Ножницы победили!');}
            if (((turns[0]=='scissors') && (turns[1]=='rock'))||((turns[1]=='scissors') && (turns[0]=='rock')))
            {this._sendToPlayers('Камень победил!');}
        }
        this._sendToPlayers('Следующий раунд!');
      }
    }
  }
  
  module.exports = RpsGame;