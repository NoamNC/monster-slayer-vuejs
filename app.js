new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunnig: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunnig = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns=[];
    },
    attack: function () {
        var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
          isPlayer: true,
          text: 'Player hits monster for ' + damage
      })
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    specialAttack: function () {
        var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster hard for ' + damage
    })
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });
      this.monsterAttack();
    },
    giveUp: function () {
        if (confirm("Are you sure you want to give up?")) {
            this.gameIsRunnig=false;
            alert('you gave up :(');
        }
    },
    calculateDamage: function (minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },

    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunnig = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost. New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunnig = false;
        }
        return true;
      }
      return false;
    },
    monsterAttack: function () {
        var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
    })
      this.checkWin();
    },
  },
});
