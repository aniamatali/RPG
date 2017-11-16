export class Game {

  AtkBoss(HPBoss, atk)
  {
    return HPBoss - atk;
  }

  AtkPlayer(hp, atkboss)
  {
    return hp - atkboss;
  }

  chooseTrack(player)
  {
    if(player.track == "C Sharp")
    {
      player.item.push("C# Knife");
      return player;
    }
    else if(player.track == "Ruby")
    {
      player.item.push("Magic Ruby");
      return player;
    }
    else if(player.track == "UIUX")
    {
      player.item.push("Cascading Style Shirt");
      return player;
    }
    else if(player.track == "JAVA")
    {
      player.item.push("React");
      return player;
    }
  }

  buffsPlayer(player, boss)
  {
    player.item.forEach(function(item)
    {
      if(item == "C# Knife")
      {
        if(player.energy < 2)
        {
          boss.hp = boss.hp - player.atk;
        }
        else
        {
          boss.hp = boss.hp - player.atk - 3;
          player.energy -= 2;
        }
      }
      else if (item == "Magic Ruby")
      {
        player.hp += 2;
      }
      else if (item == "Cascading Style Shirt")
      {
        player.hp += 2;
      }
      else if (item == "React")
      {
        player.energy += 3;
      }
    });
    return [player,boss];
  }

  increaseLv(player)
  {
    player.level += 1;
    player.hp += 2;
    player.atk += 2;
    player.energy += 2;

    return player;
  }

  playerRest(player)
  {
    player.energy += 1;
    player.hp += 1;

    return player;
  }

  addItem(player)
  {
    player.item.forEach(function(item)
    {
      $("#attack").append("<option value='"+item+"'>"+item+"</option>");
    });
  }
}
