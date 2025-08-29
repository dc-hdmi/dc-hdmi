$(document).ready(function() {

var creatureType = [
	["Scout Ship", 13,  15,  8,   2, 0],
	["Steam Ship",  8,  10, 13, 1.7, 0],
	["War Ship",    3,   4, 35, 1.5, 0],
	["Scout Ship", 13,  15,  8,   2, 0],
	["Steam Ship",  8,  10, 13, 1.7, 0],
	["War Ship",    3,   4, 35, 1.5, 0]
	//["Fire Bat",   14,  16, 10,   3, 1],
	//["Gryphon",    10,  13, 18, 2.5, 1],
	//["Sea Dragon",  1,   1, 60,   1, 1]
	];

var towerType = [
	["Archer",   30,  2,   6, 50,  80, 40,   "CrossBow",   30,  1,   1, 50,  80, 40,      "Sniper",   30,  1,   1, 50,  80, 40 ],
	["Cannon",   50,  6,   0, 50, 100, 40, "MegaCannon",   50,  7,   0, 50, 100, 40, "UltraCannon",   50,  7,   0, 50, 100, 40 ],
	[  "Mage",  150, 13,   7, 60, 120, 40,     "Wizard",  150, 15,  10, 50, 120, 40,     "Sorcery",  150, 15,  10, 50, 120, 40 ],
	[ "Storm",   50, 70,  70, 50,  80, 40,  "Whirlwind",   50, 75,  75, 50,  80, 40,     "Cyclone",   50,100, 100, 50,  80, 40 ]
	];	

var missionSetup = [];
	
var creatureMove = [];	
	
var routePath = [];
	
var routeStart = [];

var creatureWave = [];

var towers = [];

var towerSelected = [];
var sel = -1;


var plotRedX = [ [-60, 20, -60, 20, -18], [-58, -58, 19, 19, -58] ];
	

var hitList = [];
	 

var distance;
var distance_x;
var distance_y;

var position = 0;
var hitX = 0;
var hitY = 0;

var TO_RADIANS = Math.PI / 180;

var rand = 0;
var newRoute = [];

var frame = 0;

var animSprite = 0;

var cr0 = cr1 = cr2 = cr3 = cr4 = cr5 = cr6 = cr7 = cr8 = cr9 = cr10 = cr11 = cr12 = cr13 = cr14 = cr15 = 0;
var type = 0;
var distDir = [];

var lastRoute = 0;

var deployed = 0;
var creatureDensity = 0;

var clickedX = 0;
var clickedY = 0;

var damage = 0;

var nextWave = 0;
var wave = 0;

var map = 1;
var hearts = 0;
var coins = 0;

var numString = [];
var digit = 0;

var toEndOfPath = 0;
var trackAhead = 0;
var aroundTheCorner = 0;

var gameMode = "";
var setupMode = "";

var scale = 1;

var offsetLeft = 0;
var offsetTop = 0;
var font = "";
var bgkSize = "";

//var arrowFireAudio  = document.createElement('audio');
//var cannonFireAudio = document.createElement('audio');
//var magicFireAudio  = document.createElement('audio');
//var windFireAudio   = document.createElement('audio');
//var arrowFireTimer  = 0;
//var cannonFireTimer = 0;
//var magicFireTimer  = 0;
//var windFireTimer   = 0;
//var myAudio = new Audio('sound/NowOrNever.mp3');

//$(myAudio).bind('ended', function()  {
//    myAudio.currentTime = 0;
//    myAudio.play();
//});

//myAudio.play();

//arrowFireAudio.setAttribute('src', 'sound/Arrow_Swoosh.mp3');
//cannonFireAudio.setAttribute('src', 'sound/cannon_x.mp3');
//magicFireAudio.setAttribute('src', 'sound/Fireball.mp3');
//windFireAudio.setAttribute('src', 'sound/windAtk.mp3');

function scaleCanvas() {
	var newScale = 1;
	var scaleTest = 1;
	if ($(window).innerWidth() < 1300) {
	newScale = $(window).innerWidth() / 1300;
	}
	if ($(window).innerHeight() < 700) {
		scaleTest = $(window).innerHeight() / 700;
	}
	if (scaleTest < newScale) {
		newScale = scaleTest;
	}
	var canvasScale = newScale / scale;
	context.scale(canvasScale, canvasScale);
	scale = newScale;
	$("#pause").css       ( {width:  385 * scale, height: 177 * scale, top:  262 * scale, left: 458 * scale} );
	$("#settings").css    ( {width:  385 * scale, height: 538 * scale, top: -550 * scale, left: 458 * scale} );
	$("#defeated").css    ( {width:  385 * scale, height: 477 * scale, top: -550 * scale, left: 458 * scale} );
	$("#nextmission").css ( {width:  478 * scale, height: 667 * scale, top: -700 * scale, left: 407 * scale} );
	font = (1.6 * scale) + "em";
	$("#score").css       ( {width:  307 * scale, height:  51 * scale, top:   84 * scale, left:  85 * scale} );
	$("#mission-ID").css  ( {width:  478 * scale, height:  60 * scale, top:  145 * scale, fontSize: font} );
	font = (2.4 * scale) + "em";
	$("#mission-name").css( {width:  478 * scale, height:  60 * scale, top:  170 * scale, fontSize: font} );
	font = (1.5 * scale) + "em";
	$("#mission-up").css  ( {width:  478 * scale, height:  60 * scale, top:  262 * scale, fontSize: font} );
	$("#mission-up0").css ( { left:  102 * scale} );
	$("#mission-up1").css ( { left:  182 * scale} );
	$("#mission-up2").css ( { left:  262 * scale} );
	$("#mission-up3").css ( { left:  342 * scale} );
	$("#content").css     ( {width: 1300 * scale, height: 700 * scale} );
	$("#shadow").css      ( {width: 1300 * scale, height: 700 * scale} );
	$("#new").css         ( {width: 1300 * scale, height: 700 * scale} );
	$("#site-div").css    ( {width: 1300 * scale, height: 700 * scale} );
	offsetLeft = $("#canvas").offset().left;
	offsetTop  = $("#canvas").offset().top;
	context.drawImage(mapImage, 0, 0);
}


var canvas = $("#canvas")[0];
if (canvas.getContext) {
	var context = canvas.getContext("2d");
	canvas.setAttribute('width', '1300');
	canvas.setAttribute('height', '700');
	var mapImage = new Image();
	var spritesheet = new Image();
	spritesheet.src="images/spritesheet2.png";
	scaleCanvas();
} else {
}
scaleCanvas();

$(window).resize(function () {
	scaleCanvas();
	switch (gameMode) {
		case 'settings':
			$("#settings").animate( {top: 81 * scale}, 300);
			break;
		case 'nextmission':
			$("#nextmission").animate( {top: 10 * scale}, 300);
			break;
		case 'defeated':
			$("#defeated").animate( {top: 112 * scale}, 300);
			break;
		default:
			break;
	}
});

window.requestframe = function() {
    return function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
}();

function runGame() {
	requestframe( runGame );
	if (gameMode == "play") {
		gameLoop();
	} else {
	}
}

function canvasClick(e) {
	clickedX = (e.pageX - offsetLeft) / scale;
	clickedY = (e.pageY - offsetTop) / scale;
};

function playClick(e) {
	clickedX = (e.pageX - offsetLeft) / scale;
	clickedY = (e.pageY - offsetTop) / scale;
	if (clickedX > 467 && clickedX < 815 && clickedY > 433 && clickedY < 578) {
		$("#new").hide();
		$("#new").off();
		map = 1;
		loadMap(map);
		//$("#shadow").show();
		//$("#nextmission").css( {backgroundImage: "url(images/newgame.png)"} );
		$("#score").hide();
		//$("#nextmission").animate( {top: 10 * scale}, 300);
		//$("#nextmission").on("click", nextMissionClick);
		if (map == 1) {
			//$("#mission-ID").html("FIRST MISSION");
		} else {
			//$("#mission-ID").html("NEXT MISSION: " + map);
		}
		$("#mission-name").html("\"" + missionSetup[7] + "\"");
		$("#mission-up0").html("+" + missionSetup[0]);
		$("#mission-up1").html("+" + missionSetup[1]);
		$("#mission-up2").html("+" + missionSetup[2]);
		$("#mission-up3").html("+" + missionSetup[3]);
		gameMode = "nextmission";
		setupMode = "true";
	}
	
	nextMissionClick(e);
};

function pauseClick(e) {
	$("#shadow").hide();
	$("#pause").hide();			
	$("#pause").off();
	$("#canvas").on("click", canvasClick);
	gameMode = "play";
};

function settingsClick(e) {
	clickedY = (e.pageY - offsetTop) / scale;
	if (clickedY > 473) {
		$("#shadow").hide();
		$("#settings").animate( {top: -550 * scale}, 200 );
		$("#settings").off();
		$("#canvas").on("click", canvasClick);
		loadMap(map);
		gameMode = "play";
		setupMode = "true";
	} else if (clickedY > 333) {
		$("#shadow").hide();
		$("#settings").css( {top: -550 * scale}, 200 );
		$("#settings").off();
		$("#new").show();
		$("#new").on("click", playClick);
		loadMap(map);
		gameMode = "new";
		setupMode = "true";
	} else if (clickedY > 193) {	
		$("#shadow").hide();
		$("#settings").css( {top: -550 * scale} );
		$("#settings").off();
		$("#canvas").on("click", canvasClick);
		gameMode = "play";
	}
};

function defeatedClick(e) {
	clickedY = (e.pageY - offsetTop) / scale;
	if (clickedY > 457) {
		$("#shadow").hide();
		$("#defeated").css( {top: -550 * scale} );
		$("#defeated").off();
		$("#new").show();
		$("#new").on("click", playClick);
		gameMode = "new";
		setupMode = "true";
		
	} else if (clickedY > 225) {
		$("#shadow").hide();
		$("#defeated").css( {top: -550 * scale} );
		$("#defeated").off();
		$("#canvas").on("click", canvasClick);
		loadMap(map);
		gameMode = "play";
		setupMode = "true";
	}
};

function nextMissionClick(e) {
	clickedX = (e.pageX - offsetLeft) / scale;
	clickedY = (e.pageY - offsetTop) / scale;
	if (clickedX > 460 && clickedX < 828 && clickedY > 548 && clickedY < 665) {
		$("#shadow").hide();
		$("#nextmission").css( {top: -700 * scale} );
		$("#nextmission").off();
		$("#new").show();
		$("#new").on("click", playClick);
		gameMode = "new";
	} else if (clickedX > 460 && clickedX < 828 && clickedY > 409 && clickedY < 528) {
		$("#shadow").hide();
		$("#nextmission").css( {top: -700 * scale} );
		$("#nextmission").off();
		$("#canvas").on("click", canvasClick);
		gameMode = "play";
		setupMode = "true";
		clickedX = 0;
		clickedY = 0;
	}
};

$("#new").on("click", playClick);
gameMode = "new";
runGame();

function gameLoop() {
 
	context.drawImage(mapImage, 0, 0);
		
	if (setupMode == "false") {	
	
		deployed = 0;
		
		for (var i = 0; i < creatureMove.length; i++) {
			if (creatureMove[i][5] >= 0) {
        if (creatureMove[i][14] > 0 && frame % 2 == 0) {
          drawCreature(i);
          context.save();
          context.translate(creatureMove[i][6], creatureMove[i][7]);
          context.rotate(creatureMove[i][14] * 20 * TO_RADIANS); 
          context.drawImage(spritesheet, 400, 100, 100, 100, -50, -50, 100, 100);
          context.restore();	
          creatureMove[i][14]--;
        } else {
          if (creatureMove[i][5] >= creatureMove[i][3]) {
            if ((creatureMove[i][2] + 1) == creatureMove[i][1] ) {
              creatureMove.splice(i, 1);
              hearts -=1;
              if (hearts <= 0) {
                hearts = 0;
                gameMode = "defeated";
                $("#canvas").off();
                $("#shadow").show();
                $("#defeated").animate( {top: 112 * scale}, 300);
                $("#defeated").on("click", defeatedClick);
              }
              continue;
            } else {
              creatureMove[i][2]++;
              distDir = routePath[(creatureMove[i][0])][(creatureMove[i][2])].split(":");
              creatureMove[i][3] = parseInt(distDir[0]);
              creatureMove[i][4] = parseInt(distDir[1]);
              creatureMove[i][5] = 0;
            }
          }
          switch(creatureMove[i][4])
          {
            case 0:
              creatureMove[i][7]-=creatureMove[i][11];
              break;
            case 1:
              creatureMove[i][6]+=creatureMove[i][11];
              break;
            case 2:
              creatureMove[i][7]+=creatureMove[i][11];
              break;
            case 3:
              creatureMove[i][6]-=creatureMove[i][11];
              break;
            default:
          }
          drawCreature(i);
          if (creatureMove[i][14] > 0) {
            context.save();
            context.translate(creatureMove[i][6], creatureMove[i][7]);
            context.rotate(creatureMove[i][14] * 20 * TO_RADIANS); 
            context.drawImage(spritesheet, 400, 100, 100, 100, -50, -50, 100, 100);
            context.restore();
          }
          creatureMove[i][5]+=creatureMove[i][11];
        }
				
			} else if (creatureMove[i][5] == -100) {
				
				if (deployed == 0 && creatureDensity >= creatureWave[wave][2]) {
					creatureDensity = 0;
					creatureMove[i][5] = 0;
					drawCreature(i);
					deployed = 1;
				}	
			}	
		}
			
		for (var i = 0; i < creatureMove.length; i++) {
			health = Math.round(creatureMove[i][9] / creatureMove[i][10] * 10);
			context.drawImage(spritesheet, health * 22, 0, 22, 4, creatureMove[i][6] - 11, creatureMove[i][7] - 35, 22, 4);
		}

		hitAnimation();
	
	} 
	
	for (var j = 0; j < towers.length; j++) {

		if (towers[j][2] != -1) {
			if (towers[j][5] == 0 && setupMode == "false") {
				for (var k = 0; k < creatureMove.length; k++) {
					damage = towers[j][(7 + creatureMove[k][12])];
          if (towers[j][2] == 3 && creatureMove[k][14] > 0) {
            damage = 0;
					}
					if ( damage > 0 && creatureMove[k][9] > 0 ) {
						cr2 = creatureMove[k][6];
						cr3 = creatureMove[k][7];
						
						trackAhead = 20 * creatureMove[k][11];
						toEndOfPath = creatureMove[k][3] - creatureMove[k][5];
						if (toEndOfPath < trackAhead) {
							if ((creatureMove[k][2] + 1) == creatureMove[k][1] ) {
							} else {
								aroundTheCorner = trackAhead - toEndOfPath
								trackAhead = toEndOfPath;
								distDir = routePath[(creatureMove[k][0])][(creatureMove[k][2] + 1)].split(":");
								newDirection = parseInt(distDir[1]);
								switch(newDirection) {
									case 0:
										cr3 -= aroundTheCorner;
										break;
									case 1:
										cr2 += aroundTheCorner;
										break;
									case 2:
										cr3 += aroundTheCorner;
										break;
									case 3:
										cr2 -= aroundTheCorner;
										break;
									default:
								}
							}
						}
						
						switch(creatureMove[k][4]) {
							case 0:
								cr3 -= trackAhead;
								break;
							case 1:
								cr2 += trackAhead;
								break;
							case 2:
								cr3 += trackAhead;
								break;
							case 3:
								cr2 -= trackAhead;
								break;
							default:
						}
						
						distance_x = cr2 - towers[j][0];
						distance_y = cr3 - towers[j][1];
						distance = Math.sqrt( Math.pow((distance_x), 2) + Math.pow((distance_y), 2));
						
						if ( distance < 150 ) {
							cr0 = towers[j][0]
							cr1 = towers[j][1]
							cr4 = towers[j][2];
							cr5 = 1;
							cr6 = 10;
							cr7 = j;
							cr8 = k;
							distance_x = cr2 - towers[j][0];
							distance_y = cr3 - towers[j][1];
							cr9 = Math.atan2(distance_y, distance_x) * 180 / Math.PI;
							cr10 = damage;
							hitList.push( [cr0, cr1, cr2, cr3, cr4, cr5, cr6, cr7, cr8, cr9, cr10] );
							
							towers[j][5] = 1;
							towers[j][4] = cr9;
							
							/*
							if (arrowFireTimer >= 30 && towers[j][2] == 0) {
								arrowFireAudio.load();
								arrowFireAudio.play();
								arrowFireTimer = 0;
							}	
							if (cannonFireTimer >= 55 && towers[j][2] == 1 ) {
								cannonFireAudio.load();
								cannonFireAudio.play();
								cannonFireTimer = 0;
							}		
							if (magicFireTimer >= 60 && towers[j][2] == 2) {
								magicFireAudio.load();
								magicFireAudio.play();
								magicFireTimer = 0;
							}
							if (windFireTimer >= 60 && towers[j][2] == 3) {
								windFireAudio.load();
								windFireAudio.play();
								windFireTimer = 0;
							}
							*/
							break;
						}
					}
				} 
				
			} else {
				towers[j][5]++;
				if (towers[j][5] >= towers[j][6]) {
					towers[j][5] = 0;
				}
			}

			context.save();
			context.translate(towers[j][0], towers[j][1]);
			context.drawImage(spritesheet, 500 + (towers[j][2] * 200), 600, 100, 100, -50, -50, 100, 100);
			context.rotate(towers[j][4] * TO_RADIANS); 
			context.drawImage(spritesheet, 600 + (towers[j][2] * 200), 600, 100, 100, -50, -50, 100, 100);
			context.restore();	
		} 
	} 

	drawNumber(Math.round(coins), 58, 13);
	drawNumber(hearts, 213, 13);
	
	digit = 0;
	if (wave + 1 > 9) {
		digit = 24;
	}
	drawNumber(wave + 1, 330, 13);
	context.drawImage(spritesheet, 10 * 24, 4, 24, 36, 351 + digit, 13, 24, 36);
	drawNumber(creatureWave.length, 364 + digit, 13);
	
	if (towerSelected.length > 0) {
		if (towerSelected[5] == 0) {
			context.drawImage(spritesheet, 37, 237, 126, 142, towerSelected[0] - 63, towerSelected[1] - 63, 126, 142);
			for (var i = 0; i < 4; i++) {
				if (Math.round(coins) < towerType[i][5]) {
					context.drawImage(spritesheet, 0, 400, 40, 40, towerSelected[0] + plotRedX[0][i], towerSelected[1] + plotRedX[1][i], 40, 40);
				}
			}
		} else {
      if (towerSelected[2] == 3) {
          context.drawImage(spritesheet, 163, 437, 136, 142, towerSelected[0] - 63, towerSelected[1] - 63, 136, 142);
      } else {
        context.drawImage(spritesheet, 163, 237, 126, 142, towerSelected[0] - 63, towerSelected[1] - 63, 126, 142);
      }
			if ( Math.round(coins) < towerType[3][5 + 7 + (towers[sel][3] * 7)] ||
						 towers[sel][3] >= missionSetup[(towers[sel][2])] ) {
				context.drawImage(spritesheet, 0, 400, 40, 40, towerSelected[0] + plotRedX[0][4], towerSelected[1] + plotRedX[1][4], 40, 40);
			}
		}
	}
	if (setupMode == "true") {
		context.drawImage(spritesheet, 0, 48, 178, 52, 561, 5, 178, 52);
	}
	if (clickedX > 0 || clickedY > 0) {
		if (clickedX > 1190 && clickedY < 60) {
			if (clickedX > 1244) {
				//gameMode = "settings";
				//$("#canvas").off();
				//$("#shadow").show();
				//$("#settings").animate( {top: 81 * scale}, 300);
				//$("#settings").on("click", settingsClick);

			} else {
				//gameMode = "pause";
				//$("#canvas").off();
				//$("#shadow").show();
				//$("#pause").show();
				//$("#pause").on("click", pauseClick);
			}
		} else if (setupMode == "true" && clickedX > 560 && clickedX < 740 && clickedY > 4 && clickedY < 57) {
			setupMode = "false";
		} else if (towerSelected.length > 0) {
			if (towerSelected[5] == 0) {
				if (clickedX > towerSelected[0] - 62 && clickedX < towerSelected[0] - 18 && 
					clickedY > towerSelected[1] - 62 && clickedY < towerSelected[1] - 18) {
					if (Math.round(coins) >= towerType[0][5]) {
						towers[sel][2] = 0;
						towers[sel][3] = 0;
						towers[sel][6] = towerType[0][1];
						towers[sel][7] = towerType[0][2];
						towers[sel][8] = towerType[0][3];
						towerSelected = [];
						coins -= towerType[0][5];
					} else {
					}
					
					
				} else if (clickedX > towerSelected[0] + 17 && clickedX < towerSelected[0] + 63 &&
						   clickedY > towerSelected[1] - 62 && clickedY < towerSelected[1] - 18) {
					if (Math.round(coins) >= towerType[1][5]) {
						towers[sel][2] = 1;
						towers[sel][3] = 0;
						towers[sel][6] = towerType[1][1];
						towers[sel][7] = towerType[1][2];
						towers[sel][8] = towerType[1][3];
						towerSelected = [];
						coins -= towerType[1][5];
					} else {
					}
					
				} else if (clickedX > towerSelected[0] - 62 && clickedX < towerSelected[0] - 18 && 
						   clickedY > towerSelected[1] + 17 && clickedY < towerSelected[1] + 63) {
					if (Math.round(coins) >= towerType[2][5]) {
						towers[sel][2] = 2;
						towers[sel][3] = 0;
						towers[sel][6] = towerType[2][1];
						towers[sel][7] = towerType[2][2];
						towers[sel][8] = towerType[2][3];
						towerSelected = [];
						coins -= towerType[2][5];
					} else {
					}
					
				} else if (clickedX > towerSelected[0] + 17 && clickedX < towerSelected[0] + 63 && 
						   clickedY > towerSelected[1] + 17 && clickedY < towerSelected[1] + 63) {
					if (Math.round(coins) >= towerType[3][5]) {
						towers[sel][2] = 3;
						towers[sel][3] = 0;
						towers[sel][6] = towerType[3][1];
						towers[sel][7] = towerType[3][2];
						towers[sel][8] = towerType[3][3];
						towerSelected = [];
						coins -= towerType[3][5];
					} else {
					}
				} else {
					towerSelected = [];
					clickOnTower();
				}
				
			} else {
				if (clickedX > towerSelected[0] - 25 && clickedX < towerSelected[0] + 25 && 
					clickedY > towerSelected[1] - 62 && clickedY < towerSelected[1] - 18) {
					towers[sel][3] < missionSetup[(towers[sel][2])] 
					if ( Math.round(coins) >= towerType[3][5 + 7 + (towers[sel][3] * 7)] && 
						 towers[sel][3] < missionSetup[(towers[sel][2])] ) {
						towers[sel][3]++;
						towerSelected = [];
						coins -= towerType[3][5 + (towers[sel][3] * 7)];
					} else {
					}

				} else if (clickedX > towerSelected[0] - 25 && clickedX < towerSelected[0] + 25 && 
						   clickedY > towerSelected[1] + 17 && clickedY < towerSelected[1] + 63) {
					coins += towerType[(towers[sel][2])][6];
					if (coins > 9999) {
						coins = 9999;
					}
					towerSelected = [];
					towers[sel][2] = -1;
				} else {
					towerSelected = [];
					clickOnTower();
				}
			}
		} else {
			clickOnTower();
		}
	} 
	
	clickedX = 0;
	clickedY = 0;
	
	if (setupMode == "false") {
		//cannonFireTimer++;
		//arrowFireTimer++;
		//magicFireTimer++;
		//windFireTimer++;
	
		if (nextWave >= creatureWave[wave][3]) {
			wave++;
			if (wave >= creatureWave.length) {
				if (creatureMove.length > 0) {
					wave--;
				} else {
					$("#canvas").off();
					$("#nextmission").css( {backgroundImage: "url(images/nextmission.png)"} );
					$("#score").show();
					$("#shadow").show();
					$("#nextmission").animate( {top: 10 * scale}, 300);
					$("#nextmission").on("click", nextMissionClick);

					digit = Math.ceil(hearts / missionSetup[5] * 6);
					$("#score").css({backgroundImage: "url(images/score" + digit + ".png)", width: ((digit * 51) - 2) * scale});
					map++;
					loadMap(map);
					//$("#mission-ID").html("NEXT MISSION: " + map);
					$("#mission-name").html("\"" + missionSetup[7] + "\"");
					$("#mission-up0").html("+" + missionSetup[0]);
					$("#mission-up1").html("+" + missionSetup[1]);
					$("#mission-up2").html("+" + missionSetup[2]);
					$("#mission-up3").html("+" + missionSetup[3]);
						
					gameMode = "nextmission";
					setupMode = "true";
				}
			} else {
				addWave();
				nextWave = 0;
			}
		}
		
		frame++;
		creatureDensity++;
		if (frame >= 60) {
			frame = 0;
			nextWave++;
		}
	}
} 

function clickOnTower() {
	sel = -1;
	for (var j = 0; j < towers.length; j++) {
		if ( (clickedX > towers[j][0] - 50 && clickedX < towers[j][0] + 50) && (clickedY > towers[j][1] - 50 && clickedY < towers[j][1] + 50) ) {
			sel = j;
			break;
		}
	} 
	if (sel != -1) {
		if (towers[sel][2] != -1) {
			towerSelected = [ towers[sel][0], towers[sel][1], towers[sel][2], towers[sel][3], sel, 1 ];
		} else {
			towerSelected = [ towers[sel][0], towers[sel][1], towers[sel][2], towers[sel][3], sel, 0 ];
		}
	} 
}

function addWave() {
	for (var i = 0; i < creatureWave[wave][1]; i++) {
		if (creatureWave[wave][0] == 2 || creatureWave[wave][0] == 5) {
			rand = creatureWave[wave][4] + 1;
		} else {
			rand = Math.floor((Math.random() * 3) + creatureWave[wave][4]);
			while (rand == lastRoute) {
				rand = Math.floor((Math.random() * 3) + creatureWave[wave][4]);
			}
		}
		lastRoute = rand;
		cr0 = rand;
		cr1 = Math.floor(routePath[rand].length);
		cr2 = 0;
		distDir = routePath[rand][0].split(":");
		cr3 = parseInt(distDir[0]);
		cr4 = parseInt(distDir[1]);
		cr5 = -100;
		cr6 = routeStart[rand][0];
		cr7 = routeStart[rand][1];
		type = creatureWave[wave][0];
		cr8 = type;
		cr9  = creatureType[type][3];
		cr10 = creatureType[type][3];
		cr11 = creatureType[type][4];
		cr12 = creatureType[type][5];
		cr13 = creatureType[type][0];
		cr14 = 0;
		cr15 = Math.floor((Math.random() * 8));
		if (cr12 == 0) {
			creatureMove.unshift( [cr0, cr1, cr2, cr3, cr4, cr5, cr6, cr7, cr8, cr9, cr10, cr11, cr12, cr13, cr14, cr15] );
		} else {
			creatureMove.push( [cr0, cr1, cr2, cr3, cr4, cr5, cr6, cr7, cr8, cr9, cr10, cr11, cr12, cr13, cr14, cr15] );
		}
	}
}

function drawCreature(i) {
	creatureMove[i][15] += 0.2;
	if (creatureMove[i][15] > 7) {
		creatureMove[i][15] = 0;
	}
	context.save();
	context.translate(creatureMove[i][6], creatureMove[i][7]);
	context.rotate( (creatureMove[i][4] - 1) * 90 * TO_RADIANS); 
	context.drawImage(spritesheet, 500 + (Math.round(creatureMove[i][15])* 100), creatureMove[i][8] * 100, 100, 100, -50, -50, 100, 100);
	context.restore();

}

function hitAnimation() {
	
	if (hitList.length != 0) {
		for (var i = 0; i < hitList.length; i++) {
			position = hitList[i][5] / hitList[i][6];
			hitX = Math.round( hitList[i][0] + ((hitList[i][2] - hitList[i][0]) * position) );
			hitY = Math.round( hitList[i][1] + ((hitList[i][3] - hitList[i][1]) * position) );
			if (hitList[i][4] == 1) {
				context.drawImage(spritesheet, hitList[i][4] * 100, 100, 100, 100, hitX - 50, hitY - 50, 100, 100);
			} else {
				context.save();
				context.translate(hitX, hitY);
				context.rotate(hitList[i][9] * TO_RADIANS); 
				context.drawImage(spritesheet, hitList[i][4] * 100, 100, 100, 100, -50, -50, 100, 100);
				context.restore();	
			}

			if (hitList[i][5] >= hitList[i][6]) {
				if (creatureMove[( hitList[i][8] )] != undefined) {
          if (hitList[i][4] == 3) {
            creatureMove[( hitList[i][8] )][14] = hitList[i][10];
          } else {
            creatureMove[( hitList[i][8] )][9] -= hitList[i][10];
            coins += creatureMove[( hitList[i][8] )][10] / 10;
            if (coins > 9999) {
              coins = 9999;
            }
            if (creatureMove[( hitList[i][8] )][9] <= 0) {
              creatureMove.splice(hitList[i][8], 1);
            }
          }
				}
				hitList.splice(i, 1);
			} else {			
				hitList[i][5]+= 0.4;
			}
		}
	}
}

function drawNumber (number, posX, posY) {
	numString = number.toString().split("");
	for (var i = 0; i < numString.length; i++) {
		digit = parseInt(numString[i]);
		context.drawImage(spritesheet, digit * 24, 4, 24, 36, posX + (i * 24), posY, 24, 36);
	}
}

function loadMap(which) {
	switch (which) {
		case 1: {
			mapImage.src="images/map1.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map1MissionSetup);
			creatureWave   = $.extend(true, [], map1CreatureWave);
			towers         = $.extend(true, [], map1Towers);
			routeStart     = $.extend(true, [], map1RouteStart);
			routePath      = $.extend(true, [], map1RoutePath);
			break;
		}
		case 2: {
			mapImage.src="images/map2.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map2MissionSetup);
			creatureWave   = $.extend(true, [], map2CreatureWave);
			towers         = $.extend(true, [], map2Towers);
			routeStart     = $.extend(true, [], map2RouteStart);
			routePath      = $.extend(true, [], map2RoutePath);
			break;
		}
		case 3: {
			mapImage.src="images/map1.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map3MissionSetup);
			creatureWave   = $.extend(true, [], map3CreatureWave);
			towers         = $.extend(true, [], map3Towers);
			routeStart     = $.extend(true, [], map3RouteStart);
			routePath      = $.extend(true, [], map3RoutePath);
			break;
		}
		case 4: {
			mapImage.src="images/map2.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map4MissionSetup);
			creatureWave   = $.extend(true, [], map4CreatureWave);
			towers         = $.extend(true, [], map4Towers);
			routeStart     = $.extend(true, [], map4RouteStart);
			routePath      = $.extend(true, [], map4RoutePath);
			break;
		}
		case 5: {
			mapImage.src="images/map1.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map5MissionSetup);
			creatureWave   = $.extend(true, [], map5CreatureWave);
			towers         = $.extend(true, [], map5Towers);
			routeStart     = $.extend(true, [], map5RouteStart);
			routePath      = $.extend(true, [], map5RoutePath);
			break;
		}
		case 6: {
			mapImage.src="images/map2.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map6MissionSetup);
			creatureWave   = $.extend(true, [], map6CreatureWave);
			towers         = $.extend(true, [], map6Towers);
			routeStart     = $.extend(true, [], map6RouteStart);
			routePath      = $.extend(true, [], map6RoutePath);
			break;
		}
		case 7: {
			mapImage.src="images/map1.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map7MissionSetup);
			creatureWave   = $.extend(true, [], map7CreatureWave);
			towers         = $.extend(true, [], map7Towers);
			routeStart     = $.extend(true, [], map7RouteStart);
			routePath      = $.extend(true, [], map7RoutePath);
			break;
		}
		case 8: {
			mapImage.src="images/map2.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map8MissionSetup);
			creatureWave   = $.extend(true, [], map8CreatureWave);
			towers         = $.extend(true, [], map8Towers);
			routeStart     = $.extend(true, [], map8RouteStart);
			routePath      = $.extend(true, [], map8RoutePath);
			break;
		}
		case 9: {
			mapImage.src="images/map1.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map9MissionSetup);
			creatureWave   = $.extend(true, [], map9CreatureWave);
			towers         = $.extend(true, [], map9Towers);
			routeStart     = $.extend(true, [], map9RouteStart);
			routePath      = $.extend(true, [], map9RoutePath);
			break;
		}
		case 10: {
			mapImage.src="images/map2.png";
			context.drawImage(mapImage, 0, 0);
			missionSetup   = $.extend(true, [], map10MissionSetup);
			creatureWave   = $.extend(true, [], map10CreatureWave);
			towers         = $.extend(true, [], map10Towers);
			routeStart     = $.extend(true, [], map10RouteStart);
			routePath      = $.extend(true, [], map10RoutePath);
			break;
		}
	}
	
	creatureMove.length = 0;
	towerSelected.length = 0;
	hitList.length = 0;
	creatureDensity = 0;
	
	
	coins  = missionSetup[4];
	hearts = missionSetup[5];		
	nextWave = 0;
	wave = 0;
	addWave();
	clickedX = 0;
	clickedY = 0;
}


var map1MissionSetup  = [ 0, 0, 0, 0,  400, 10, 0, "" ];
var map2MissionSetup  = [ 0, 0, 0, 0,  500, 10, 0, "" ];
var map3MissionSetup  = [ 0, 0, 0, 0,  600, 10, 0, "" ];
var map4MissionSetup  = [ 0, 0, 0, 0,  750, 10, 0, "" ];
var map5MissionSetup  = [ 0, 0, 0, 0,  750, 10, 0, "" ];
var map6MissionSetup  = [ 0, 0, 0, 0,  800, 10, 0, "" ];
var map7MissionSetup  = [ 0, 0, 0, 0,  800, 10, 0, "" ];
var map8MissionSetup  = [ 0, 0, 0, 0,  900, 10, 0, "" ];
var map9MissionSetup  = [ 0, 0, 0, 0,  900, 10, 0, "" ];
var map10MissionSetup = [ 0, 0, 0, 0, 1000, 10, 0, "" ];

var map1RoutePath = [ 
	["330:1", "200:2", "240:1", "200:0", "460:1", "400:2", "300:1"],
	["300:1", "200:2", "300:1", "200:0", "400:1", "400:2", "330:1"],
	["270:1", "200:2", "360:1", "200:0", "340:1", "400:2", "360:1"],
	["470:1", "200:0", "100:1", "200:0", "460:1", "400:2", "300:1"],
	["500:1", "200:0", "100:1", "200:0", "400:1", "400:2", "330:1"],
	["530:1", "200:0", "100:1", "200:0", "340:1", "400:2", "360:1"]
	];
var map2RoutePath = [ 
	[ "630:1", "100:2", "400:1", "100:2", "300:1"],
	[ "600:1", "100:2", "400:1", "100:2", "330:1"],
	[ "570:1", "100:2", "400:1", "100:2", "360:1"],
	[ "970:1", "200:0", "360:1"],
	["1000:1", "200:0", "330:1"],
	["1030:1", "200:0", "300:1"],
	[ "570:1", "300:0", "430:1", "100:2", "330:1"],
	[ "600:1", "300:0", "400:1", "100:2", "330:1"],
	[ "630:1", "300:0", "370:1", "100:2", "330:1"]
	];	
var map3RoutePath = [ 
	["330:1", "200:2", "240:1", "200:0", "460:1", "400:2", "300:1"],
	["300:1", "200:2", "300:1", "200:0", "400:1", "400:2", "330:1"],
	["270:1", "200:2", "360:1", "200:0", "340:1", "400:2", "360:1"],
	["470:1", "200:0", "100:1", "200:0", "460:1", "400:2", "300:1"],
	["500:1", "200:0", "100:1", "200:0", "400:1", "400:2", "330:1"],
	["530:1", "200:0", "100:1", "200:0", "340:1", "400:2", "360:1"]
	];	
var map4RoutePath = [ 
	[ "630:1", "100:2", "400:1", "100:2", "300:1"],
	[ "600:1", "100:2", "400:1", "100:2", "330:1"],
	[ "570:1", "100:2", "400:1", "100:2", "360:1"],
	[ "970:1", "200:0", "360:1"],
	["1000:1", "200:0", "330:1"],
	["1030:1", "200:0", "300:1"],
	[ "570:1", "300:0", "430:1", "100:2", "330:1"],
	[ "600:1", "300:0", "400:1", "100:2", "330:1"],
	[ "630:1", "300:0", "370:1", "100:2", "330:1"]
	];
var map5RoutePath = [ 
	["330:1", "200:2", "240:1", "200:0", "460:1", "400:2", "300:1"],
	["300:1", "200:2", "300:1", "200:0", "400:1", "400:2", "330:1"],
	["270:1", "200:2", "360:1", "200:0", "340:1", "400:2", "360:1"],
	["470:1", "200:0", "100:1", "200:0", "460:1", "400:2", "300:1"],
	["500:1", "200:0", "100:1", "200:0", "400:1", "400:2", "330:1"],
	["530:1", "200:0", "100:1", "200:0", "340:1", "400:2", "360:1"]
	];
var map6RoutePath = [ 
	[ "630:1", "100:2", "400:1", "100:2", "300:1"],
	[ "600:1", "100:2", "400:1", "100:2", "330:1"],
	[ "570:1", "100:2", "400:1", "100:2", "360:1"],
	[ "970:1", "200:0", "360:1"],
	["1000:1", "200:0", "330:1"],
	["1030:1", "200:0", "300:1"],
	[ "570:1", "300:0", "430:1", "100:2", "330:1"],
	[ "600:1", "300:0", "400:1", "100:2", "330:1"],
	[ "630:1", "300:0", "370:1", "100:2", "330:1"]
	];
var map7RoutePath = [ 
	["330:1", "200:2", "240:1", "200:0", "460:1", "400:2", "300:1"],
	["300:1", "200:2", "300:1", "200:0", "400:1", "400:2", "330:1"],
	["270:1", "200:2", "360:1", "200:0", "340:1", "400:2", "360:1"],
	["470:1", "200:0", "100:1", "200:0", "460:1", "400:2", "300:1"],
	["500:1", "200:0", "100:1", "200:0", "400:1", "400:2", "330:1"],
	["530:1", "200:0", "100:1", "200:0", "340:1", "400:2", "360:1"]
	];	
var map8RoutePath = [ 
	[ "630:1", "100:2", "400:1", "100:2", "300:1"],
	[ "600:1", "100:2", "400:1", "100:2", "330:1"],
	[ "570:1", "100:2", "400:1", "100:2", "360:1"],
	[ "970:1", "200:0", "360:1"],
	["1000:1", "200:0", "330:1"],
	["1030:1", "200:0", "300:1"],
	[ "570:1", "300:0", "430:1", "100:2", "330:1"],
	[ "600:1", "300:0", "400:1", "100:2", "330:1"],
	[ "630:1", "300:0", "370:1", "100:2", "330:1"]
	];	
var map9RoutePath = [ 
	["330:1", "200:2", "240:1", "200:0", "460:1", "400:2", "300:1"],
	["300:1", "200:2", "300:1", "200:0", "400:1", "400:2", "330:1"],
	["270:1", "200:2", "360:1", "200:0", "340:1", "400:2", "360:1"],
	["470:1", "200:0", "100:1", "200:0", "460:1", "400:2", "300:1"],
	["500:1", "200:0", "100:1", "200:0", "400:1", "400:2", "330:1"],
	["530:1", "200:0", "100:1", "200:0", "340:1", "400:2", "360:1"]
	];
var map10RoutePath = [ 
	[ "630:1", "100:2", "400:1", "100:2", "300:1"],
	[ "600:1", "100:2", "400:1", "100:2", "330:1"],
	[ "570:1", "100:2", "400:1", "100:2", "360:1"],
	[ "970:1", "200:0", "360:1"],
	["1000:1", "200:0", "330:1"],
	["1030:1", "200:0", "300:1"],
	[ "570:1", "300:0", "430:1", "100:2", "330:1"],
	[ "600:1", "300:0", "400:1", "100:2", "330:1"],
	[ "630:1", "300:0", "370:1", "100:2", "330:1"]
	];
	
var map1RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580] ];
var map2RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580], [-53, 520], [-53, 550], [-53, 580] ];
var map3RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580] ];
var map4RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580], [-53, 520], [-53, 550], [-53, 580] ];
var map5RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580] ];
var map6RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580], [-53, 520], [-53, 550], [-53, 580] ];
var map7RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580] ];
var map8RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580], [-53, 520], [-53, 550], [-53, 580] ];
var map9RouteStart  = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580] ];
var map10RouteStart = [ [-53, 120], [-53, 150], [-53, 180], [-53, 520], [-53, 550], [-53, 580], [-53, 520], [-53, 550], [-53, 580] ];

var map1CreatureWave = [
	[0,   4, 40,  7, 0],
	[1,   6, 50,  4, 3],
	[0,   8, 40,  3, 0],
	[1,   9, 50,  0, 3]
	];
var map2CreatureWave = [
	[0,   3, 15,  5, 0],
	[3,   4, 20,  5, 6],
	[1,   3, 30,  5, 3],
	[0,   4, 15,  5, 0],
	[1,   6, 20,  5, 3],
	[3,   12, 30, 11, 6],
	[0,   4, 60, 13, 3],
	[1,   6, 30, 15, 0]
	];
var map3CreatureWave = [
	[0,   5, 15,  8, 0],
	[3,   4, 20,  8, 3],
	[3,   3, 30,  8, 0],
	[0,   2, 30,  8, 3]
	];
var map4CreatureWave = [
	[0,   3, 15,  8, 0],
	[3,   4, 20, 12, 6],
	[0,   3, 30, 10, 3],
	[3,   4, 15,  7, 0],
	[0,   6, 20,  9, 3],
	[3,   5, 30, 11, 6],
	[0,   4, 60, 13, 3],
	[3,   6, 30, 15, 0]
	];
var map5CreatureWave = [
	[0,   5, 15,  8, 0],
	[3,   4, 20,  8, 3],
	[3,   3, 30,  8, 0],
	[0,   2, 30,  8, 3]
	];
var map6CreatureWave = [
	[0,   3, 15,  8, 0],
	[3,   4, 20, 12, 6],
	[0,   3, 30, 10, 3],
	[3,   4, 15,  7, 0],
	[0,   6, 20,  9, 3],
	[3,   5, 30, 11, 6],
	[0,   4, 60, 13, 3],
	[3,   6, 30, 15, 0]
	];
var map7CreatureWave = [
	[0,   5, 15,  8, 0],
	[3,   4, 20,  8, 3],
	[3,   3, 30,  8, 0],
	[0,   2, 30,  8, 3]
	];
var map8CreatureWave = [
	[0,   3, 15,  8, 0],
	[3,   4, 20, 12, 6],
	[0,   3, 30, 10, 3],
	[3,   4, 15,  7, 0],
	[0,   6, 20,  9, 3],
	[3,   5, 30, 11, 6],
	[0,   4, 60, 13, 3],
	[3,   6, 30, 15, 0]
	];
var map9CreatureWave = [
	[0,   5, 15,  8, 0],
	[3,   4, 20,  8, 3],
	[3,   3, 30,  8, 0],
	[0,   2, 30,  8, 3]
	];
var map10CreatureWave = [
	[0,   3, 15,  8, 0],
	[3,   4, 20, 12, 6],
	[0,   3, 30, 10, 3],
	[3,   4, 15,  7, 0],
	[0,   6, 20,  9, 3],
	[3,   5, 30, 11, 6],
	[0,   4, 60, 13, 3],
	[3,   6, 30, 15, 0]
	];

var map1Towers = [	
	[  50, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[1050, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0], 
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 550, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 650, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 650, -1, 0, 0, 0, 0, 0, 0]
	];
var map2Towers = [	
	[ 650, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 950, 150, -1, 0, 0, 0, 0, 0, 0],
	[1050, 150, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[1150, 250, -1, 0, 0, 0, 0, 0, 0],
	
	[ 450, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 350, -1, 0, 0, 0, 0, 0, 0], 
	[ 850, 350, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 450, -1, 0, 0, 0, 0, 0, 0],
	
	[ 650, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[1150, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 550, -1, 0, 0, 0, 0, 0, 0]
	];
var map3Towers = [	
	[  50, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[1050, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0], 
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 550, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 650, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 650, -1, 0, 0, 0, 0, 0, 0]
	];
var map4Towers = [	
	[ 650, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 950, 150, -1, 0, 0, 0, 0, 0, 0],
	[1050, 150, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[1150, 250, -1, 0, 0, 0, 0, 0, 0],
	
	[ 450, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 350, -1, 0, 0, 0, 0, 0, 0], 
	[ 850, 350, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 450, -1, 0, 0, 0, 0, 0, 0],
	
	[ 650, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[1150, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 550, -1, 0, 0, 0, 0, 0, 0]
	];
var map5Towers = [	
	[  50, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[1050, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0], 
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 550, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 650, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 650, -1, 0, 0, 0, 0, 0, 0]
	];
var map6Towers = [	
	[ 650, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 950, 150, -1, 0, 0, 0, 0, 0, 0],
	[1050, 150, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[1150, 250, -1, 0, 0, 0, 0, 0, 0],
	
	[ 450, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 350, -1, 0, 0, 0, 0, 0, 0], 
	[ 850, 350, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 450, -1, 0, 0, 0, 0, 0, 0],
	
	[ 650, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[1150, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 550, -1, 0, 0, 0, 0, 0, 0]
	];
var map7Towers = [	
	[  50, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[1050, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0], 
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 550, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 650, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 650, -1, 0, 0, 0, 0, 0, 0]
	];
var map8Towers = [	
	[ 650, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 950, 150, -1, 0, 0, 0, 0, 0, 0],
	[1050, 150, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[1150, 250, -1, 0, 0, 0, 0, 0, 0],
	
	[ 450, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 350, -1, 0, 0, 0, 0, 0, 0], 
	[ 850, 350, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 450, -1, 0, 0, 0, 0, 0, 0],
	
	[ 650, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[1150, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 550, -1, 0, 0, 0, 0, 0, 0]
	];
var map9Towers = [	
	[  50, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 150, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[1050, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0], 
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 550, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 650, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 650, -1, 0, 0, 0, 0, 0, 0]
	];
var map10Towers = [	
	[ 650, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 150, -1, 0, 0, 0, 0, 0, 0],
	[ 950, 150, -1, 0, 0, 0, 0, 0, 0],
	[1050, 150, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 250, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 250, -1, 0, 0, 0, 0, 0, 0],
	[1050, 250, -1, 0, 0, 0, 0, 0, 0],
	[1150, 250, -1, 0, 0, 0, 0, 0, 0],
	
	[ 450, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 650, 350, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 350, -1, 0, 0, 0, 0, 0, 0], 
	[ 850, 350, -1, 0, 0, 0, 0, 0, 0],
	
	[ 150, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 250, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 350, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 450, 450, -1, 0, 0, 0, 0, 0, 0],
	
	[ 650, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 750, 450, -1, 0, 0, 0, 0, 0, 0],
	[ 850, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 450, -1, 0, 0, 0, 0, 0, 0],
	[1150, 450, -1, 0, 0, 0, 0, 0, 0],
	[1050, 550, -1, 0, 0, 0, 0, 0, 0]
	];


});
