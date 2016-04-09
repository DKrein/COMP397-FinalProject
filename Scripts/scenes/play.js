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
            this.score = 0;
            this.lives = 10;
            // Set _fireballCount Count
            this._fireballCount = 1;
            this._dragonXCount = 3;
            // Instantiate _fireball array
            this._fireball = new Array();
            this._dragonX = new Array();
            // added _sky to the scene
            this._sky = new objects.Sky();
            this.addChild(this._sky);
            // added _fire to the scene
            this._fire = new objects.Fire();
            this.addChild(this._fire);
            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            //added _fireball to the scene
            for (var ball = 0; ball < this._fireballCount; ball++) {
                this._fireball[ball] = new objects.Fireball();
                this.addChild(this._fireball[ball]);
            }
            for (var dragon = 0; dragon < this._dragonXCount; dragon++) {
                this._dragonX[dragon] = new objects.DragonX();
                this.addChild(this._dragonX[dragon]);
            }
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this scene to the global stage container
            stage.addChild(this);
            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ", "bold 25px Britannic Bold", "#0434C4", 15, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesWord);
            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                this.lives.toString(), "bold 25px Britannic Bold", "#0434C4", 100, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesText);
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("SCORE: ", "bold 25px Britannic Bold", "#0434C4", 500, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            this.scoreText = new objects.Label("SCORE: " +
                this.score.toString(), "bold 25px Britannic Bold", "#0434C4", 600, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreText);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
            var _this = this;
            this._sky.update();
            this._fire.update();
            this._player.update();
            this._fireball.forEach(function (ball) {
                ball.update();
                _this._collision.check(ball);
            });
            this._dragonX.forEach(function (dragon) {
                dragon.update();
                _this._collision.check(dragon);
            });
            this._collision.check(this._fire);
            this.scoreText.text = this.score.toString();
            this._livesText.text = this.lives.toString();
            this._checkLives();
        };
        //PRIVATE METHODS
        Play.prototype._checkLives = function () {
            if (this.lives <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));

//# sourceMappingURL=play.js.map
