/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Level2 scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
4. Renamed the class sky for background, added sounds in the right place
5. fixed some names
6. changed 3 playerFireballColision variables for an array
7. added fire breathing dragon enemy and enemy fireball array
8. added eggs to the scene
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// LEVEL2 SCENE
var scenes;
(function (scenes) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Level2() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Level2.prototype.start = function () {
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            // added _sky to the scene
            this._backGround = new objects.BackgroundScroll("level2Background");
            this.addChild(this._backGround);
            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;
            this._dragonEnemy3Count = 1;
            this._playerFireballCount = 3;
            this._enemyFireballCount = 1;
            this._eggCount = 3;
            // Instantiate _fireball array
            this._dragonEnemy1 = new Array();
            this._dragonEnemy2 = new Array();
            this._dragonEnemy3 = new Array();
            this._playerFireball = new Array();
            this._enemyFireball = new Array();
            this._playerFireballCollision = new Array();
            this._eggs = new Array();
            // // added _fire to the scene
            // this._fire = new objects.Fire();
            // this._collectableContainer.addChild(this._fire);
            //added stalactites to the scene
            this._stalactite = new objects.Stalactites();
            this._enemyContainer.addChild(this._stalactite);
            //added stalactites to the scene
            this._stalagmite = new objects.Stalagmites();
            this._enemyContainer.addChild(this._stalagmite);
            // added player to the scene
            this._player = new objects.Player("player");
            this.addChild(this._player);
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
                this._playerFireballCollision[count] = new managers.PlayerFireballCollision(this._playerFireball[count]);
            }
            for (var count = 0; count < this._enemyFireballCount; count++) {
                this._enemyFireball[count] = new objects.EnemyFireball(this._dragonEnemy3[count]);
                this.addChild(this._enemyFireball[count]);
            }
            //added _eggs to the _collectableContainer
            for (var egg = 0; egg < this._eggCount; egg++) {
                this._eggs[egg] = new objects.Egg();
                this._collectableContainer.addChild(this._eggs[egg]);
            }
            this._playerCollision = new managers.PlayerCollision(this._player);
            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            // add stage click Listener
            this._backGround.on("click", this._playerFireClickHandler, this);
            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ", "bold 25px Britannic Bold", "#0434C4", 15, 15, false);
            this.addChild(this._livesWord);
            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                gameController.LivesValue.toString(), "bold 25px Britannic Bold", "#0434C4", 100, 15, false);
            this.addChild(this._livesText);
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("SCORE: ", "bold 25px Britannic Bold", "#0434C4", 500, 15, false);
            this.addChild(this.scoreWord);
            this.scoreText = new objects.Label("SCORE: " +
                gameController.ScoreValue.toString(), "bold 25px Britannic Bold", "#0434C4", 600, 15, false);
            this.addChild(this.scoreText);
            //this._playBackgroundSound();
        };
        Level2.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        Level2.prototype.update = function () {
            var _this = this;
            this.checkControls();
            this._backGround.update();
            //this._fire.update();
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
            this._eggs.forEach(function (egg) {
                egg.update();
                _this._playerCollision.check(egg);
            });
            var countDrag = 0;
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
            this._enemyFire();
            this._playerCollision.check(this._enemyFireball[0]);
            //this._playerCollision.check(this._fire);
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
            this._checkLives();
            this._changeGameLevel();
        };
        //PRIVATE METHODS
        Level2.prototype._checkLives = function () {
            if (gameController.LivesValue <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        };
        // Move to Level 3
        Level2.prototype._changeGameLevel = function () {
            if (this._backGround.backgroundResetCount > 2) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                //Should be level 3
                scene = config.Scene.LEVEL3;
                changeScene();
            }
        };
        Level2.prototype.checkControls = function () {
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
        Level2.prototype._playerFireClickHandler = function (event) {
            for (var count = 0; count < this._playerFireballCount; count++) {
                if (this._playerFireball[count].isAvailable) {
                    this._playerFireball[count].PositionFireBall();
                    createjs.Sound.play("shotFireball", { volume: 0.02 });
                    break;
                }
            }
        };
        Level2.prototype._enemyFire = function () {
            if (gameController.LivesValue != 0) {
                for (var count = 0; count < this._enemyFireballCount; count++) {
                    if (this._enemyFireball[count].isAvailable) {
                        this._enemyFireball[count].PositionFireBall();
                        break;
                    }
                }
            }
        };
        return Level2;
    }(objects.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));

//# sourceMappingURL=level2.js.map
