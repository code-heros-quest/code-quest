'use strict';

const chalk = require('chalk');
let loot = require('./loot.js');
const char = require('./characters.js');
const sDialogue = require('./scenarioDialogue.js');
const cDialogue = require('./choiceDialogue.js');

class Choice {
  constructor(num, name, dialogue, lootObject, next) {
    this.num = num;
    this.name = name;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Riddle {
  constructor(num, correct, name, dialogue, lootObject, next) {
    this.num = num;
    this.corect = correct;
    this.name = name;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Roll {
  constructor(num, name, dialogue, lootObject, next) {
    this.num = num;
    this.name = name;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Luck {
  constructor(num, name, dialogue, lootObject, next) {
    this.num = num;
    this.name = name;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Scenario {
  constructor(number, name, dialogue, type, choiceQuestion, choices, next) {
    this.number = number,
      this.name = name,
      this.dialogue = dialogue;
    this.type = type;
    this.choiceQuestion = choiceQuestion
    this.choices = choices;
    this.next = next;
  }
  updateDialogue(char) {
    this.dialogue = this.dialogue;
    this.choices.dialogue = this.choices.dialogue;
  }
}

// Scenarios in reverse order, choices first
// Game Over - death
const gameOverDeath = new Scenario('GAME OVER due to death', sDialogue.gameOverDeath, null, null, null);

// Game Over - hydra
const gameOverHydra = new Scenario('GAME OVER due to diminished health', sDialogue.gameOverHydra, null, null, null);

const gameOverKing = new Scenario('GAME OVER the King has defeated you', sDialogue.gameOverKing, null, null, null);

const gameOverWin = new Scenario('GAME OVER you have won', sDialogue.gameOverWin, null, null, null)

// BOSS 5 : THE KING
// fight three
const theKing3Rolls = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theKing3Rolls1, null),
  medRoll: new Roll(2, 'Fair Roll', cDialogue.theKing3Rolls2, null),
  highRoll: new Roll(3, 'Good Roll', cDialogue.theKing3Rolls3, null)
}

const theKing3 = new Scenario('The King: Close Combat', sDialogue.theKing3, 'roll', 'Roll to see if you survived the battle', theKing3Rolls, null)

// fight two
const theKing2Rolls = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theKing2Rolls1, null),
  medRoll: null,
  highRoll: new Roll(3, 'Good Roll', cDialogue.theKing2Rolls2, null)
}

const theKing2 = new Scenario('The King: Ranged Battle', sDialogue.theKing2, 'roll', `Roll to see the outcome of your first engagement with the King`, theKing2Rolls);

// fight one
const theKing1Riddle = {
  riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theKing1Riddle1, null),
  riddle2: new Riddle(2, ['nothing'], 'Correct Answer', cDialogue.theKing1Riddle2, null),
  riddle3: new Riddle(3, null, 'Less than half of you were corect', cDialogue.theKing1Riddle3, null),
  riddle4: new Riddle(4, null, 'Half or more answered correctly', cDialogue.theKing1Riddle4, null),
}
const theKing1 = new Scenario('The King: Battle of the Wits', sDialogue.theKing1, 'riddle', 'What a poor man has, a rich man wants, and if you eat it you die. What am I?', theKing1Riddle);

// the king intro
const theKingIntro = new Scenario('The King: Approaching the Castle', sDialogue.theKingIntro, 'ready', null, null);

// NPC 6 : Mage-Smith
const mageSmithChoices = {
  choice1: new Choice(1, 'Try to hush him', cDialogue.mageSmithChoices1, [loot.mightyEnchantedSword]),
  choice2: new Choice(2, 'Rise to his level', cDialogue.mageSmithChoices2, [loot.mightyEnchantedSword]),
  choice3: new Choice(3, 'Just walk away', cDialogue.mageSmithChoices3, [loot.mysteriousSword])
}
const mageSmith = new Scenario('The Mage-Smith', sDialogue.mageSmith, 'choice3', `While it is a comical sight you are trying to avoid drawing attention to yourselves and you need to calm him down. Do you:`, mageSmithChoices);


// wishing well ******
// const wishingWellChoices = {
//   choice1: new Choice(1, 'Bad Luck', ``, null),
//   choice2: new Choice(2, 'Good Luck', `Early the next morning your team packs up and stashes everything you don’t need for your mission in Halbert’s barn. The cow moo’s in surprise at having unknown guests, but continues chewing her hay before long. If you survive you will be able to come back and get your packs. If you don’t return Halbert has been instructed to turn them in to the city guard as suspicious “lost and found” so he will not be accused of aiding you. You plan to split up about half way to the palace and approach from different directions.`, null)
// }

// const wishingWell = new Scenario('The Wishing Well', `You sleep the night in Halberts barn but are up with the roosters to get on the road. You leave the city on a small path headed northwest. Within 30 minutes of travel your band of warriors is out of site range of the city. Surrounded by the beautiful country side it is hard to remember why you are here. Little things break the illusion of peace - fields left fallow and growing weeds, bits of ground torn up and scraps of armor laying beside the road where travelers have been ambushed. ${char.wizard.name} reminds you all to keep a sharp eye for bandits.`, 'luck' ``, wishingWellChoices);

// horned animal
const hornedAnimalChoices = {
  choice1: new Choice(1, 'Visit the Sprite', cDialogue.hornedAnimalChoices1, null),
  choice2: new Choice(2, 'Onward to the castle', cDialogue.hornedAnimalChoices2, null)
}
const hornedAnimal = new Scenario('The Horned Animal', sDialogue.hornedAnimal, 'choice2', `You know that water sprites can grant great blessings, will you detour from your path to visit the sprite?`, hornedAnimalChoices)

// city before the palace
const cityChoices = {
  choice1: new Choice(1, 'Circus Troupe', cDialogue.cityChoices1, null),
  choice2: new Choice(2, 'Minstrals', cDialogue.cityChoices2, null),
  choice3: new Choice(3, 'Brotherhood of Monks', cDialogue.cityChoices3, null)
}

const cityAroundThePalace = new Scenario('City Around the Palace', sDialogue.cityAroundThePalace, 'choice3', 'What kind of disguise do you think you should use?', cityChoices)

// NPC 5 : Rebellion
const rebellionLuck = {
  badLuck: new Luck(1, 'Poor Luck', cDialogue.rebellionLuck1, [loot.brittleHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge]),
  goodLuck: new Luck(2, 'Good Luck', cDialogue.rebellionLuck2, [loot.strongHeirloomBow, loot.rebelBandagesSmall, loot.rebelBandagesLarge])
}
const rebellion = new Scenario('Rebellion', sDialogue.rebellion, 'roll', `roll for a chance to add your luck to the enchantress' spell`, rebellionLuck);


// BOSS 4 : Hydra

const theHydraRolls = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theHydraRolls1, null),
  medRoll: new Roll(2, 'Fair Roll', cDialogue.theHydraRolls2, null),
  highRoll: new Roll(3, 'Good Roll', cDialogue.theHydraRolls3, null)
}

const theHydra = new Scenario('TheHydra', sDialogue.theHydra, 'roll', 'Roll the dice to determine the fate of your battle', theHydraRolls);

// NPC 4 : Witch
const theWitchRiddle = {
  riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theWitchRiddle1, null),
  riddle2: new Riddle(2, ['a skull', 'skull'], 'Correct Answer', cDialogue.theWitchRiddle2, [loot.strengthSpell]),
  riddle3: new Riddle(3, null, '2 or more incorrect', cDialogue.theWitchRiddle3, null),
  riddle4: new Riddle(4, null, '3 or more correct', cDialogue.theWitchRiddle4, [loot.gnarledStaff])
}

const theWitch = new Scenario('The Witch', sDialogue.theWitch, 'riddle', `“I don’t have eyes, But once I did see. I once had thoughts, Now white and empty. What am I?”`, theWitchRiddle);

// backToTheSmithy 
const backToTheSmithyChoices = {
  choice1: new Choice(1, 'Tell the truth', ``),
  choice2: new Choice(2, 'Some things are better left unsaid', ``)
}
const backToTheSmithy = new Scenario('Back to the Smithy', `After a few hours of tending to your packs and reorganizing your stock you return to the smithy with your newly purchased supplies stowed away to get your armor. `)

// theShepherdsHouse
const theShepherdsHouse = new Scenario(`The Shepherd's House`, `You approach the house on the end of the road. It is a small cottage with white walls and a straw roof. You don't see any sheep but you knock anyway. A young girl with braids answers the door and steps back when she sees the four of you standing on the porch. "Mom!" she yells, and flees back into the cottage. A few seconds later a woman, who looks to be her mother comes to the door with a sock and darning needle in her hands. She looks apprehensive but asks "Can I help you?" This time you immediately start by explaining that the blacksmith authorized your supply search. ${char.wizard.name} puts on his most soothing tone, perhaps using a bit of a charm, and tells her "We were just hoping to buy some cloth suitable for bandages". "Well we have no shortage of wool" she says. "I can give you a fair price for some undyed cloth, I can't take the King's coin though, so I hope you have something else." The wizard assures her that you have other currency, but asks "Why doesn't your village take the King's coin?" The woman replies "The blacksmith won't allow anything to be sold or purchased with the King's gold, he likes to pretend we live outside of the kingdom. Won't pay taxes or let any guards in neither." ${char.assassin.name} asks "How does he get away with that? The guards don't demand taxes from you?" She answers "Well, the blacksmith told them we won't pay. He and his gang of louts ran 'em off, and I guess we are too small a village to put much effort into." ${char.wizard.name} speaks up, again with his soothing tone, to inquire about the sheep "Where does your family keep the sheep? We didn't see them as we came up, and I can't imagine it is safe for them to range far." She tells you that the blacksmith and his gang keep the land safe for three miles surrounding the village on all sides. Her husband and son can take the sheep out without worrying about monsters picking them off. ${char.assassin.name} has one last question "Why does the blacksmith hate the King so much? Not that there isn't a valid reason, but this seems personal." The Shepherdess tells you "Well there is a story around here, and none of us dares argue it... The Smith family has a sword, it is mounted above the forge in the smithy. It is a mighty broadsword made of the strongest steel. It is said that only the true King of the land can wield it. Every new moon the blacksmith comes into the village square with the sword and makes us all bend a knee to acknowledge his rightful claim to the throne. Now I am not saying he should be the king, but he does alright here... He keeps the monsters away and we all get enough to eat, which is more than I can say for most places." The woman looks shocked, like she just realized she said too much, and rushes to get your cloth so you can leave.`, null, null, 1);

// Iron Forge ***********
const ironForgeChoices = {
  choice1: new Choice(1, 'Look for cloth for bandages', `You see a woman rushing by with a basket full of clothes. ${char.hunter.name} jogs up beside her and asks "Excuse me miss, do you know where we might purchase some cloth for bandages here?" She looks unwilling to speak to ${char.hunter.name} but when the hunter adds "the Blacksmith said we could purchase supplies" she seems slightly more open "Yes, try the house on the end of the road there, they keep sheep and make some wool cloth." You thank her and she continues walking away at her rapid pace.`, null, 1),
  choice2: new Choice(2, 'Look for food to restock rations', ``)
}

const ironForge = new Scenario('Iron Forge', `You have been walking the southern road for over a day when you come upon a small village. The village seems to have sprouted up around a large smithy and you can hear the sound of a hammer repeatedly striking metal. The air is heavy with the smell of smoke, an acrid metalic smell, and another unidentifiable earthy odor. You pass through the village and try to hail a few of the inhabitants but they all seem to be in a hurry and won't talk to you other than to nod. Making your way towards the large smithy seems like the right choice, hopefully you will be able to repair and replace damaged weapons. As you approach the building you see clouds of black smoke billowing from the chimney and escaping from the open side of the structure. There are 3 rough looking characters hanging around the place looking well armed and well fed. The source of the hammering is revealed to be a massive human man with forearms the size of ${char.warrior.name}'s neck. The massive human is wearing a leather apron and a white shirt stained with soot and sweat. As you walk into the smithy he looks up with a scowl and then immediately goes back to his work, ignoring you. One of the idle men steps forward to intercept your group and says "Well we don't see too many strangers in these parts... and we like it that way". You hoped for a warmer reception. ${char.wizard.name}, ever the peace-maker replies "We come in search of repairs for our armor and possibly some food supplies if your village has any to spare." The speaker answers "If you have gold we can repair your armor, but the King's coin is no good here." This time ${char.warrior.name} speaks up, "We only have outland coins, but they are gold." "Aye, that'll do", the man replies. Finally the glowering blacksmith acknowledges you, "You may wait in the village for me to repair your armor, but don't distract my villagers... they have work to do." You get the sense that this man is in charge here. Your group tells him you will purchase some food but not bother anyone unnecessarily. You leave your armor and head away from the smithy. ${char.hunter.name} says, "Does anyone else think that was wierd?" ${char.assassin.name} answers "You mean the way we had to make it through the bully-boys to talk to the 'boss'?" The hunter responds "That and the way he referred the the people here as HIS villagers". As you go in search of food you decide to check in with the villagers a little.`, `What supplies do you want to ask for?`, ironForgeChoices);

// neutralGround *******
// const neutralZoneChoices = {
//   choice1: new Choice(1, 'Play a game of chance', '', null),
//   choice2: new Choice(2, 'Find a cloth merchant to trade with', '', null),
//   choice3: new Choice(3, 'Find someone selling food staples', '', null)
// }

// const neutralZone = new Scenario('Neutral Zone', sDialogue.neutralZone, 'choice3', 'Where will you try to find supplies?', neutralZoneChoices);



// curiosityKilledTheCat *********
const curiosityKilledTheCatChoices = {
  choice1: new Choice(1, 'Head to the center in search of the Neutal Zone', cDialogue.curiosityChoices1, null),
  choice2: new Choice(2, 'Cut your losses and head out', cDialogue.curiosityChoices2, null)
}

const curiosityKilledTheCat = new Scenario('Curiosity Killed the Cat', sDialogue.curiosityKilledTheCat, 'choice2', `Do you head to the Neutral Zone or leave town?`, curiosityKilledTheCatChoices);


// Tin Town ************
const tinTownChoices = {
  choice1: new Choice(1, 'Head into the tent city', cDialogue.tinTownChoices1, null),
  choice2: new Choice(2, 'Ask the woman what this place is', cDialogue.tinTownChoices2, null),
  choice3: new Choice(3, 'Cut your losses', cDialogue.tinTownChoices3, null)
};

const tinTown = new Scenario('Tin Town', sDialogue.tinTown, 'choice3', `Do you head further in seeking supplies, try to get more information before deciding, or cut your losses and follow the road winding south-east out of here?`, tinTownChoices);


// NPC 3 : Merchant
const theMerchantRiddle = {
  riddle1: new Riddle(1, null, 'Wrong Answer', cDialogue.theMerchantRiddle1, null),
  riddle2: new Riddle(2, ['footsteps', 'foot steps'], 'Correct Answer', cDialogue.theMerchantRiddle2, [loot.poisonousBerries, loot.sheild, loot.hoodAndJesses, loot.magicalAmulet]),
  riddle3: new Riddle(3, null, '2 or more incorrect', cDialogue.theMerchantRiddle3, null),
  riddle4: new Riddle(4, null, '3 or more correct', cDialogue.theMerchantRiddle4, null),

}

const theMerchant = new Scenario('The Merchant', sDialogue.theMerchant, 'riddle', `"The more you take, the more you leave behind. What am I?"`, theMerchantRiddle);

// FORK IN THE ROAD *****
const forkInTheRoadChoices = {
  choice1: new Choice(1, 'Follow the Coins', cDialogue.forkInTheRoad1, null),
  choice2: new Choice(2, 'Follow the Hammer', cDialogue.forkInTheRoad2, null)
};

const forkInTheRoad = new Scenario('Fork in the Road', sDialogue.forkInTheRoad, 'choice2', `Will you follow the coins or the hammer?`, forkInTheRoadChoices)

// BOSS 3 : Troll
const theTrollRolls = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theTrollRolls1, [loot.falcon]),
  medRoll: new Roll(2, 'Fair Roll', cDialogue.theTrollRolls2, [loot.falcon]),
  highRoll: new Roll(3, 'Good Roll', cDialogue.theTrollRolls3, [loot.falcon])
}

const theTroll = new Scenario(`The Troll`, sDialogue.theTroll, 'roll', 'Roll to determine the fate of your battle', theTrollRolls);

// BOSS 2 : Goblin
const theGoblinRolls = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theGoblinRolls1, [loot.strongBandages], 9),
  medRoll: new Roll(2, 'Fair Roll', cDialogue.theGoblinRolls2, [loot.strongBandages], 9),
  highRoll: new Roll(3, 'Good Roll', cDialogue.theGoblinRolls3, [loot.strongBandages], 9)
}
const theGoblin = new Scenario(7, 'The Goblin', sDialogue.theGoblin, 'roll', 'Roll to determine the fate of your battle', theGoblinRolls, null);

// poisonous bite
const thePoinsonousBite = new Scenario(8, 'The Poisonous Bite', sDialogue.thePoinsonousBite, 'ready', null, null, 9);

// the village
const theVillageChoices = {
  choice1: new Choice(1, 'Yes, these villagers need your help!', cDialogue.theVillageChoices1, null, 7),
  choice2: new Choice(2, 'No, you have a more important mission ahead and can not afford to waste any time', cDialogue.theVillageChoices2, null, 8)
}
const theVillage = new Scenario(6, 'The Village', sDialogue.theVillage, 'choice2', `Will you risk your lives to help us with this other matter.`, theVillageChoices, null)

// NPC 1
const theWoodsmanLuck = {
  badLuck: new Luck(1, 'Poor Luck', cDialogue.theWoodsmanLuck1, null, 6),
  goodLuck: new Luck(2, 'Good Luck', cDialogue.theWoodsmanLuck2, [loot.herbalSalve], 6)
}
const theWoodsman = new Scenario(5, 'Find Another Way In', sDialogue.theWoodsman, 'luck', 'Since you were kind enough to carry wood back to the village the woodsman has much more than normal. Maybe if you are lucky he will reward you for your help. Roll for luck:', theWoodsmanLuck, null)


// NPC 2
const theOldFriend = new Scenario(4, 'The Old Friend', sDialogue.theOldFriend, 'ready', null, null, 6);

//BOSS 1 : Orc Lord
const theOrcLordRoll = {
  rollPotential: 100,
  lowRoll: new Roll(1, 'Poor Roll', cDialogue.theOrcLordRoll1, null, 5),
  medRoll: new Roll(2, 'Fair Roll', cDialogue.theOrcLordRoll2, [loot.orcLordMace], 4),
  highRoll: new Roll(3, 'Good Roll', cDialogue.theOrcLordRoll3, [loot.orcLordMace], 4)
}
const theOrcLord = new Scenario(3, 'Battling the Orc Lord', sDialogue.theOrcLord, 'roll', 'roll the dice', theOrcLordRoll, null)


// At the wall
const atTheWallChoices = {
  choice1: new Choice(1, 'Battle the Orc', cDialogue.atTheWallChoices1, null, 3),
  choice2: new Choice(2, 'Go Around', cDialogue.atTheWallChoices2, null, 5)
}

const atTheWall = new Scenario(2, 'At the Wall', sDialogue.atTheWall, 'choice2', `Your group stops to discuss your options…`, atTheWallChoices, null);


// intro
const intro = new Scenario(1, 'Introduction', sDialogue.intro, 'ready', null, null, 2);



module.exports = {
  intro,
  atTheWall,
  theOrcLord,
  theOldFriend,
  theWoodsman,
  theVillage,
  thePoinsonousBite,
  theGoblin,
  theTroll,
  theMerchant,
  theWitch,
  theHydra,
  rebellion,
  cityAroundThePalace,
  hornedAnimal,
  mageSmith,
  theKingIntro,
  theKing1,
  theKing2,
  theKing3,
  gameOverDeath,
  gameOverHydra,
  gameOverKing,
  gameOverWin
}

