import {Game} from './../js/rpg.js';

describe('Game', function() {
  it('should test whether a ATK Boss is true', function() {
    var gameCheck = new Game()
    expect(gameCheck.AtkBoss(10,5)).toEqual(5)
  });
  it('should test whether a Track is true', function() {
    var gameCheck = new Game()
    var player = {level:1,hp:5,atk:1,energy:3,track:"csharp",item:[]};
    var playerResult = {level:1,hp:5,atk:1,energy:3,track:"csharp",item:["C# Knife"]};
    expect(gameCheck.chooseTrack(player)).toEqual(playerResult)
  });
});
