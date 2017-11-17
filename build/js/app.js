(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "AtkBoss",
    value: function AtkBoss(HPBoss, atk) {
      return HPBoss - atk;
    }
  }, {
    key: "AtkPlayer",
    value: function AtkPlayer(hp, atkboss) {
      return hp - atkboss;
    }
  }, {
    key: "chooseTrack",
    value: function chooseTrack(player) {
      if (player.track == "C Sharp") {
        player.item.push("C# Knife");
        return player;
      } else if (player.track == "Ruby") {
        player.item.push("Magic Ruby");
        return player;
      } else if (player.track == "UIUX") {
        player.item.push("Cascading Style Shirt");
        return player;
      } else if (player.track == "JAVA") {
        player.item.push("React");
        return player;
      }
    }
  }, {
    key: "buffsPlayer",
    value: function buffsPlayer(player, boss) {
      player.item.forEach(function (item) {
        if (item == "C# Knife") {
          if (player.energy < 2) {
            boss.hp = boss.hp - player.atk;
          } else {
            boss.hp = boss.hp - player.atk - 3;
            player.energy -= 2;
          }
        } else if (item == "Magic Ruby") {
          player.hp += 2;
        } else if (item == "Cascading Style Shirt") {
          player.hp += 2;
        } else if (item == "React") {
          player.energy += 3;
        }
      });
      return [player, boss];
    }
  }, {
    key: "increaseLv",
    value: function increaseLv(player) {
      player.level += 1;
      player.hp += 2;
      player.atk += 2;
      player.energy += 2;

      return player;
    }
  }, {
    key: "playerRest",
    value: function playerRest(player) {
      player.energy += 1;
      player.hp += 1;

      return player;
    }
  }, {
    key: "addItem",
    value: function addItem(player) {
      player.item.forEach(function (item) {
        $("#attack").append("<option value='" + item + "'>" + item + "</option>");
      });
    }
  }]);

  return Game;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _rpg = require("./../js/rpg.js");

var player = { level: 1, hp: 5, atk: 1, energy: 3, track: "", item: [] };

var boss1 = { name: "Coding Dojo Disciple", hp: 4, atk: 1 };
var boss2 = { name: "Cyber Bully", hp: 8, atk: 2 };
var boss3 = { name: "Interviewer", hp: 12, atk: 3 };
var boss4 = { name: "Drill Instructor John", hp: 100, atk: 999 };

var cSharpKnife = { name: "C# Knife", atk: +3, energy: -2 };
var cascadingShirt = { name: "Cascading Style Shirt", hp: +2 };
var net = { name: ".NET of Protection", hp: +5, energy: -3 };
var piledriver = { name: "TranspileDriver", atk: +2, energy: -1 };
var magicRuby = { name: "Magic Ruby", hp: +3, energy: -1 };
var react = { name: "React", energy: +3 };

var fightBoss = {};
var turn = 1;

$(document).ready(function () {
  var thisGame = new _rpg.Game();

  $("#fightButton").submit(function (event) {
    event.preventDefault();
    if (turn == 1) {
      fightBoss = boss1;
    } else if (turn == 2) {
      $("#page4").show();
      $("#page3").hide();
      fightBoss = boss2;
    } else if (turn == 3) {
      $("#page5").show();
      $("#page3").hide();
      fightBoss = boss3;
    } else if (turn == 4) {
      $("#page6").show();
      $("#page3").hide();
      fightBoss = boss4;
    }

    $("#fightForm").hide();
    $(".attack-choice").show();
    $("#bossinfo").show();
    $("#bossName").text(fightBoss.name);
    $("#bossHp").text(fightBoss.hp);
    $("#bossAtk").text(fightBoss.atk);
  });

  $("#formOne").submit(function (event) {
    event.preventDefault();
    player.track = $("#track").val();
    player = thisGame.chooseTrack(player);

    $(".class-choice").hide();
    $("#fightForm").show();
    $("#page1").hide();
    $("#page2").show();
    $("#p1level").text(player.level);
    $("#p1hp").text(player.hp);
    $("#p1atk").text(player.atk);
    $("#p1energy").text(player.energy);
    $("#p1class").text(player.track);
    $("ul#p1inv").append("<li>" + player.item + "</li>");
    thisGame.addItem(player);
  });

  $("#attackForm").submit(function (event) {
    event.preventDefault();
    var attack = $("#attack").val();

    if (attack == "Attack") {
      fightBoss.hp = thisGame.AtkBoss(fightBoss.hp, player.atk);
    } else if (attack != "Attack") {
      var playerBoss = [];
      playerBoss = thisGame.buffsPlayer(player, fightBoss);
      player = playerBoss[0];
      fightBoss = playerBoss[1];
    }

    if (fightBoss.hp <= 0) {
      alert("You beat him");
      player = thisGame.increaseLv(player);
      turn += 1;
      $("#fightForm").show();
      $(".attack-choice").hide();
      $("#page2").hide();
      $("#page3").hide();
      $("#page4").hide();
      $("#page5").hide();
      if (turn == 2) {
        $("#page3").show();
        $("#page2").hide();
      } else if (turn == 3) {
        $("#page4").hide();
        $("#page3").show();
      } else if (turn == 4) {
        $("#page5").hide();
        $("#page3").show();
      } else {
        $("#page6").hide();
        $("#page7").show();
      }
    } else {
      player.hp = thisGame.AtkPlayer(player.hp, fightBoss.atk);
      if (player.hp <= 0) {
        alert("You Die");
        $(".attack-choice").hide();
      }
    }

    $("#bossName").text(fightBoss.name);
    $("#bossHp").text(fightBoss.hp);
    $("#bossAtk").text(fightBoss.atk);
    $("#p1level").text(player.level);
    $("#p1hp").text(player.hp);
    $("#p1atk").text(player.atk);
    $("#p1energy").text(player.energy);
  });
});

},{"./../js/rpg.js":1}]},{},[2]);
