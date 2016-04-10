/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the play scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// PLAY SCENE
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Play() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Play.prototype.start = function () {
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            // Set _fireballCount Count
            this._fireballCount = 1;
            this._dragonXCount = 1;
            this._eggCount = 2;
            // Instantiate _fireball array
            this._fireball = new Array();
            this._dragonX = new Array();
            this._eggs = new Array();
            // added _sky to the scene
            this._sky = new objects.Sky("mountain");
            this.addChild(this._sky);
            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            //added _fireball to the _collectableContainer
            for (var ball = 0; ball < this._fireballCount; ball++) {
                this._fireball[ball] = new objects.Fireball();
                this._collectableContainer.addChild(this._fireball[ball]);
            }
            //added _dragon to the _enemyContainer
            for (var dragon = 0; dragon < this._dragonXCount; dragon++) {
                this._dragonX[dragon] = new objects.DragonX();
                this._enemyContainer.addChild(this._dragonX[dragon]);
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
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreText);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
            var _this = this;
            this._sky.update();
            this._player.update();
            this._fireball.forEach(function (ball) {
                ball.update();
                _this._collision.check(ball);
            });
            this._dragonX.forEach(function (dragon) {
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
        Play.prototype._checkLives = function () {
            if (gameController.LivesValue <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        };
        // Move to Level 2
        Play.prototype._changeGameLevel = function () {
            if (this._sky.skyResetCount > 1) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                scene = config.Scene.LEVEL2;
                changeScene();
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));

//# sourceMappingURL=play.js.map
