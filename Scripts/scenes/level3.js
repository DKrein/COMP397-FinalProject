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
            this._backGround = new objects.BackgroundScroll("cave");
            this.addChild(this._backGround);
            // Set _fireballCount Count
            this._fireballCount = 1;
            this._dragonXCount = 1;
            // Instantiate _fireball array
            this._fireball = new Array();
            this._dragonX = new Array();
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
            this._player = new objects.Player();
            this.addChild(this._player);
            //added _fireball to the scene
            for (var ball = 0; ball < this._fireballCount; ball++) {
                this._fireball[ball] = new objects.Fireball();
                //this.addChild(this._fireball[ball]);
                this._enemyContainer.addChild(this._fireball[ball]);
            }
            for (var dragon = 0; dragon < this._dragonXCount; dragon++) {
                this._dragonX[dragon] = new objects.DragonX();
                //this.addChild(this._dragonX[dragon]);
                this._enemyContainer.addChild(this._dragonX[dragon]);
            }
            this._playerFireball = new objects.PlayerFireball(this._player);
            this.addChild(this._playerFireball);
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            // add stage click Listener
            stage.on("stagemousedown", this._stageClickHandler);
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
            //this._playBackgroundSound();
            this.addChild(this.scoreText);
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
            this._stalactite.update();
            this._collision.check(this._stalactite);
            this._stalagmite.update();
            this._collision.check(this._stalagmite);
            this._player.update();
            this._playerFireball.update();
            this._fireball.forEach(function (ball) {
                ball.update();
                _this._collision.check(ball);
            });
            this._dragonX.forEach(function (dragon) {
                dragon.update();
                _this._collision.check(dragon);
            });
            this._collision.check(this._fire);
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
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
        // Move to Level 3
        Level3.prototype._changeGameLevel = function () {
            if (this._backGround.backgroundResetCount > 5) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                console.log("Call next level3");
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        Level3.prototype._stageClickHandler = function (event) {
            console.log("Stage clicked");
            this._playerFireball.PositionFireBall();
        };
        return Level3;
    }(objects.Scene));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));

//# sourceMappingURL=level3.js.map
