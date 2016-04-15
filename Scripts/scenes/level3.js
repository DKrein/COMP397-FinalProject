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
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            // added _sky to the scene
            this._backGround = new objects.BackgroundScroll("level2Background");
            this.addChild(this._backGround);
            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;
            this._playerFireballCount = 3;
            this._enemyFireballCount = 1;
            // Instantiate _fireball array
            this._dragonEnemy1 = new Array();
            this._dragonEnemy2 = new Array();
            this._playerFireball = new Array();
            this._enemyFireball = new Array();
            // added _fire to the scene
            this._fire = new objects.Fire();
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
            for (var count = 0; count < this._playerFireballCount; count++) {
                this._playerFireball[count] = new objects.PlayerFireball(this._player);
                this.addChild(this._playerFireball[count]);
            }
            for (var count = 0; count < this._enemyFireballCount; count++) {
                this._enemyFireball[count] = new objects.EnemyFireball(this._boss);
                this.addChild(this._enemyFireball[count]);
            }
            // added collision manager to the scene
            this._playerFireballCollision = new managers.PlayerFireballCollision(this._playerFireball[0]);
            this._playerFireballCollision1 = new managers.PlayerFireballCollision(this._playerFireball[1]);
            this._playerFireballCollision2 = new managers.PlayerFireballCollision(this._playerFireball[2]);
            this._playerCollision = new managers.PlayerCollision(this._player);
            this._enemyFireballCollision = new managers.EnemyFireballCollision(this._enemyFireball[0]);
            // this._enemyFireballCollision1 = new managers.EnemyFireballCollision(this._enemyFireball[1]);
            // this._enemyFireballCollision2 = new managers.EnemyFireballCollision(this._enemyFireball[2]);
            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            // add stage click Listener
            this._backGround.on("click", this._playerFire, this);
            //this._backGround.on("click", this._enemyFire, this);
            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ", "bold 25px Britannic Bold", "#0434C4", 15, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesWord);
            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                gameController.LivesValue.toString(), "bold 25px Britannic Bold", "#0434C4", 100, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesText);
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("SCORE: ", "bold 25px Britannic Bold", "#0434C4", 900, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            this.scoreText = new objects.Label("SCORE: " +
                gameController.ScoreValue.toString(), "bold 25px Britannic Bold", "#0434C4", 1000, 15, false);
            //this._livesText.textAlign = "right";
            //this._playBackgroundSound();
            this.addChild(this.scoreText);
            this.bossWord = new objects.Label("BOSS: ", "bold 40px Britannic Bold", "#FF0000", 490, 15, false);
            //this._livesText.textAlign = "right";
            this.bossText = new objects.Label(gameController.BossValue.toString(), "bold 40px Britannic Bold", "#FF0000", 525, 55, false);
        };
        Level3.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        Level3.prototype.update = function () {
            var _this = this;
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
            this._enemyFireball.forEach(function (fireball) {
                fireball.update();
            });
            //this._enemyFire();
            this._dragonEnemy1.forEach(function (dragon) {
                dragon.update();
                _this._playerFireballCollision.CheckPlayerFire(dragon);
                _this._playerFireballCollision1.CheckPlayerFire(dragon);
                _this._playerFireballCollision2.CheckPlayerFire(dragon);
                _this._playerCollision.check(dragon);
            });
            this._dragonEnemy2.forEach(function (dragon) {
                dragon.update();
                _this._playerFireballCollision.CheckPlayerFire(dragon);
                _this._playerFireballCollision1.CheckPlayerFire(dragon);
                _this._playerFireballCollision2.CheckPlayerFire(dragon);
                _this._playerCollision.check(dragon);
            });
            this._enemyFire();
            this._boss.update();
            this._playerFireballCollision.CheckPlayerFire(this._boss);
            this._playerFireballCollision1.CheckPlayerFire(this._boss);
            this._playerFireballCollision2.CheckPlayerFire(this._boss);
            this._playerCollision.check(this._enemyFireball[0]);
            // this._playerCollision.check(this._enemyFireball[1]);
            // this._playerCollision.check(this._enemyFireball[2]);
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
                scene = config.Scene.END;
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
        //EVENT HANDLERS ++++++++++++++++++++
        Level3.prototype._playerFire = function (event) {
            for (var count = 0; count < this._playerFireballCount; count++) {
                console.log("CLICKER CLICK");
                if (this._playerFireball[count].isAvailable) {
                    this._playerFireball[count].PositionFireBall();
                    break;
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
