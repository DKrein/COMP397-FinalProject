/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Level3 scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
4. Renamed the class sky for background, added sounds in the right place
5. fixed some names
6. Added boss and boss label
7. changed 3 playerFireballColision variables for an array
8. Fixed boss movement and fireballs
9. Added fire breathing dragon enemy
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// LEVEL2 SCENE
var scenes;
(function (scenes) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Level3() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Level3.prototype.start = function () {
            createjs.Sound.stop();
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            // added _sky to the scene
            this._backGround = new objects.BackgroundScroll("level3Background");
            this.addChild(this._backGround);
            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;
            this._dragonEnemy3Count = 1;
            this._playerFireballCount = 1;
            this._bossFireballCount = 1;
            this._enemyFireballCount = 1;
            // Instantiate _fireball array
            this._dragonEnemy1 = new Array();
            this._dragonEnemy2 = new Array();
            this._dragonEnemy3 = new Array();
            this._playerFireball = new Array();
            this._bossFireball = new Array();
            this._enemyFireball = new Array();
            this._playerFireballCollision = new Array();
            // added _fire to the scene
            //this._fire = new objects.Fire();
            //this.addChild(this._fire);
            this._collectableContainer.addChild(this._fire);
            //added stalactites to the scene
            this._stalactite = new objects.Stalactites();
            this._enemyContainer.addChild(this._stalactite);
            //added stalactites to the scene
            this._stalagmite = new objects.Stalagmites();
            this._enemyContainer.addChild(this._stalagmite);
            // added player to the scene
            this._player = new objects.Player("player");
            this.addChild(this._player);
            //added _boss to the scene
            this._boss = new objects.Boss(this._player);
            //added _fireball to the scene
            for (var count = 0; count < this._dragonEnemy1Count; count++) {
                this._dragonEnemy1[count] = new objects.DragonEnemy1();
                this._enemyContainer.addChild(this._dragonEnemy1[count]);
            }
            for (var count = 0; count < this._dragonEnemy2Count; count++) {
                this._dragonEnemy2[count] = new objects.DragonEnemy2();
                this._enemyContainer.addChild(this._dragonEnemy2[count]);
            }
            for (var count = 0; count < this._dragonEnemy3Count; count++) {
                this._dragonEnemy3[count] = new objects.DragonEnemy3();
                this._enemyContainer.addChild(this._dragonEnemy3[count]);
            }
            for (var count = 0; count < this._playerFireballCount; count++) {
                this._playerFireball[count] = new objects.PlayerFireball(this._player);
                this.addChild(this._playerFireball[count]);
            }
            for (var count = 0; count < this._bossFireballCount; count++) {
                this._bossFireball[count] = new objects.BossFireball(this._boss);
                this.addChild(this._bossFireball[count]);
            }
            for (var count = 0; count < this._enemyFireballCount; count++) {
                this._enemyFireball[count] = new objects.EnemyFireball(this._dragonEnemy3[count]);
                this.addChild(this._enemyFireball[count]);
            }
            // added collision manager to the scene
            this._playerCollision = new managers.PlayerCollision(this._player);
            for (var count = 0; count < this._playerFireballCount; count++) {
                this._playerFireball[count] = new objects.PlayerFireball(this._player);
                this.addChild(this._playerFireball[count]);
                this._playerFireballCollision[count] = new managers.PlayerFireballCollision(this._playerFireball[count]);
            }
            // added _fire to the scene
            this._fire = new objects.Fire();
            this._collectableContainer.addChild(this._fire);
            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            // add stage click Listener
            this._backGround.on("click", this._playerFire, this);
            //this._backGround.on("click", this._enemyFire, this);
            this._scoreOverlay = new createjs.Bitmap(assets.getResult("ScoreOverlay"));
            this._scoreOverlay.x = config.Screen.WIDTH / 2 - (this._scoreOverlay.getBounds().width / 2);
            this._scoreOverlay.y = 10;
            this.addChild(this._scoreOverlay);
            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ", "bold 25px Finger Paint", "#0434C4", 15, 25, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesWord);
            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                gameController.LivesValue.toString(), "bold 25px Finger Paint", "#0434C4", 100, 25, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesText);
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("SCORE: ", "bold 25px Finger Paint", "#0434C4", 870, 25, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            this.scoreText = new objects.Label("SCORE: " +
                gameController.ScoreValue.toString(), "bold 25px Finger Paint", "#0434C4", 970, 25, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreText);
            this.bossWord = new objects.Label("BOSS: ", "bold 40px Finger Paint", "#FF0000", 460, 12, false);
            //this._livesText.textAlign = "right";
            this.bossText = new objects.Label(gameController.BossValue.toString(), "bold 40px Finger Paint", "#FF0000", 610, 12, false);
            this._playBackgroundSound();
        };
        Level3.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.002 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        Level3.prototype.update = function () {
            var _this = this;
            this.checkControls();
            this._backGround.update();
            this._fire.update();
            this._boss.update();
            this._stalactite.update();
            this._playerCollision.check(this._stalactite);
            this._stalagmite.update();
            this._playerCollision.check(this._stalagmite);
            this._player.update();
            this._playerFireball.forEach(function (fireball) {
                fireball.update();
            });
            this._bossFireball.forEach(function (fireball) {
                fireball.update();
            });
            this._enemyFireball.forEach(function (fireball) {
                fireball.update();
            });
            var countDrag = 0;
            //this._enemyFire();
            this._dragonEnemy1.forEach(function (dragon) {
                dragon.update();
                _this._playerFireballCollision[countDrag].check(dragon);
                _this._playerCollision.check(dragon);
                countDrag++;
            });
            countDrag = 0;
            this._dragonEnemy2.forEach(function (dragon) {
                dragon.update();
                _this._playerFireballCollision[countDrag].check(dragon);
                _this._playerCollision.check(dragon);
                countDrag++;
            });
            countDrag = 0;
            this._dragonEnemy3.forEach(function (dragon) {
                dragon.update();
                _this._playerFireballCollision[countDrag].check(dragon);
                _this._playerCollision.check(dragon);
                countDrag++;
            });
            this._bossFire();
            this._enemyFire();
            this._boss.update();
            this._playerFireballCollision.forEach(function (playerFireballCollision) {
                playerFireballCollision.check(_this._boss);
            });
            this._playerCollision.check(this._enemyFireball[0]);
            this._playerCollision.check(this._bossFireball[0]);
            this._playerCollision.check(this._boss);
            this._playerCollision.check(this._fire);
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
            this.bossText.text = gameController.BossValue.toString();
            this._summonBoss();
            this._checkLives();
            this._changeGameLevel();
        };
        //PRIVATE METHODS
        Level3.prototype._checkLives = function () {
            if (gameController.LivesValue <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        };
        // Move to End
        Level3.prototype._changeGameLevel = function () {
            if (gameController.BossValue == 0) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                //Should be level 3
                scene = config.Scene.VICTORY;
                changeScene();
            }
        };
        //Add boss to scene
        Level3.prototype._summonBoss = function () {
            //if (this._backGround.backgroundResetCount > 1) {
            this._enemyContainer.addChild(this._boss);
            this.addChild(this.bossWord);
            this.addChild(this.bossText);
            console.log("Boss");
            //}
        };
        Level3.prototype.checkControls = function () {
            if (keyboardControls.changeToLevel1) {
                scene = config.Scene.LEVEL1;
                changeScene();
            }
            if (keyboardControls.changeToLevel2) {
                scene = config.Scene.LEVEL2;
                changeScene();
            }
            if (keyboardControls.changeToLevel3) {
                scene = config.Scene.LEVEL3;
                changeScene();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        Level3.prototype._playerFire = function (event) {
            for (var count = 0; count < this._playerFireballCount; count++) {
                console.log("CLICKER CLICK");
                if (this._playerFireball[count].isAvailable) {
                    createjs.Sound.play("shotFireball", { volume: 0.02 });
                    this._playerFireball[count].PositionFireBall();
                    break;
                }
            }
        };
        Level3.prototype._bossFire = function () {
            if (gameController.LivesValue != 0) {
                for (var count = 0; count < this._bossFireballCount; count++) {
                    if (this._bossFireball[count].isAvailable) {
                        this._bossFireball[count].PositionFireBall();
                        break;
                    }
                }
            }
        };
        Level3.prototype._enemyFire = function () {
            if (gameController.LivesValue != 0) {
                for (var count = 0; count < this._enemyFireballCount; count++) {
                    if (this._enemyFireball[count].isAvailable) {
                        this._enemyFireball[count].PositionFireBall();
                        break;
                    }
                }
            }
        };
        return Level3;
    }(objects.Scene));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));

//# sourceMappingURL=level3.js.map
