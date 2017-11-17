import {Game} from './../js/rpg.js';

var player = {level:1,hp:5,atk:1,energy:3,track:"",item:[]};

var boss1 = {name:"Coding Dojo Disciple",hp:4,atk:1};
var boss2 = {name:"Cyber Bully",hp:8,atk:2};
var boss3 = {name:"Interviewer",hp:12,atk:3};
var boss4 = {name:"Drill Instructor John",hp:100,atk:999};

var cSharpKnife  = {name:"C# Knife", atk:+3, energy:-2};
var cascadingShirt = {name:"Cascading Style Shirt", hp:+2};
var net = {name:".NET of Protection", hp:+5, energy:-3};
var piledriver =  {name:"TranspileDriver", atk:+2, energy:-1};
var magicRuby = {name:"Magic Ruby", hp:+3, energy:-1};
var react = {name:"React", energy:+3};

var fightBoss = {};
var turn = 1;


$(document).ready(function(){
  var thisGame = new Game();

  $("#fightButton").submit(function(event){
    event.preventDefault();
    if(turn == 1)
    {
      fightBoss = boss1;
    }
    else if(turn == 2)
    {
      $("#page4").show();
      $("#page3").hide();
      fightBoss = boss2;
    }
    else if(turn == 3)
    {
      $("#page5").show();
      $("#page3").hide();
      fightBoss = boss3;
    }
    else if(turn == 4)
    {
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


  $("#formOne").submit(function(event){
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
    $("ul#p1inv").append("<li>"+player.item+"</li>");
    thisGame.addItem(player);

  });

    $("#attackForm").submit(function(event){
      event.preventDefault();
      var attack = $("#attack").val();

      if(attack == "Attack")
      {
        fightBoss.hp = thisGame.AtkBoss(fightBoss.hp,player.atk);
      }
      else if (attack != "Attack")
      {
        var playerBoss = [];
        playerBoss = thisGame.buffsPlayer(player,fightBoss);
        player = playerBoss[0];
        fightBoss = playerBoss[1];
      }

      if(fightBoss.hp <= 0)
      {
        alert("You beat him");
        player = thisGame.increaseLv(player);
        turn += 1;
        $("#fightForm").show();
        $(".attack-choice").hide();
        $("#page2").hide();
        $("#page3").hide();
        $("#page4").hide();
        $("#page5").hide();
        if (turn == 2){
          $("#page3").show();
          $("#page2").hide();
        }
        else if (turn == 3) {
          $("#page4").hide();
          $("#page3").show();
        }
        else if (turn == 4) {
          $("#page5").hide();
          $("#page3").show();
        }
        else {
          $("#page6").hide();
          $("#page7").show();
        }
      }
      else
      {
        player.hp = thisGame.AtkPlayer(player.hp,fightBoss.atk);
        if(player.hp <= 0)
        {
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
