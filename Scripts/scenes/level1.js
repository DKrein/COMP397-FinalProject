/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Level1 scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
4. Renamed the class sky for background, added sounds in the right place
5. fixed some names
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Level1 SCENE
var scenes;
(function (scenes) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Level1() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Level1.prototype.start = function () {
            createjs.Sound.stop();
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            // added _sky to the scene
            this._backGround = new objects.BackgroundScroll("level1Background");
            this.addChild(this._backGround);
            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;
            this._eggCount = 3;
            // Instantiate _fireball array
            this._dragonEnemy1 = new Array();
            this._dragonEnemy2 = new Array();
            this._eggs = new Array();
            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            //added _fireball to the _collectableContainer
            for (var count = 0; count < this._dragonEnemy1Count; count++) {
                this._dragonEnemy1[count] = new objects.DragonEnemy1();
                this._collectableContainer.addChild(this._dragonEnemy1[count]);
            }
            //added _dragon to the _enemyContainer
            for (var count = 0; count < this._dragonEnemy2Count; count++) {
                this._dragonEnemy2[count] = new objects.DragonEnemy2();
                this._enemyContainer.addChild(this._dragonEnemy2[count]);
            }
            //added _eggs to the _collectableContainer
            for (var egg = 0; egg < this._eggCount; egg++) {
                this._eggs[egg] = new objects.Egg();
                this._collectableContainer.addChild(this._eggs[egg]);
            }
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this, _enemyContainer, _collectableContainer to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
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
            this.scoreWord = new objects.Label("SCORE: ", "bold 25px Britannic Bold", "#0434C4", 500, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            this.scoreText = new objects.Label("SCORE: " +
                gameController.ScoreValue.toString(), "bold 25px Britannic Bold", "#0434C4", 600, 15, false);
            //this._playBackgroundSound();
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreText);
        };
        Level1.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        Level1.prototype.update = function () {
            var _this = this;
            this._backGround.update();
            this._player.update();
            this._dragonEnemy1.forEach(function (dragon) {
                dragon.update();
                _this._collision.check(dragon);
            });
            this._dragonEnemy2.forEach(function (dragon) {
                dragon.update();
                _this._collision.check(dragon);
            });
            this._eggs.forEach(function (egg) {
                egg.update();
                _this._collision.check(egg);
            });
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
            this._checkLives();
            this._changeGameLevel();
        };
        //PRIVATE METHODS
        Level1.prototype._checkLives = function () {
            if (gameController.LivesValue <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        };
        // Move to Level 2
        Level1.prototype._changeGameLevel = function () {
            if (this._backGround.backgroundResetCount > 50) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                scene = config.Scene.LEVEL2;
                changeScene();
            }
        };
        return Level1;
    }(objects.Scene));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));

//# sourceMappingURL=level1.js.map
