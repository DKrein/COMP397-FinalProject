/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/15/2016
File description: Manages the victory scene

Revision:
1. Added victory label and background
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// VICTORY SCENE
var scenes;
(function (scenes) {
    var Victory = (function (_super) {
        __extends(Victory, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Victory() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++
        // Start Method
        Victory.prototype.start = function () {
            createjs.Sound.stop();
            //Add Gameover Image
            this._victoryImage = new createjs.Bitmap(assets.getResult("victorybackground"));
            this.addChild(this._victoryImage);
            //add the final score label
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("HIGHSCORE: " + gameController.ScoreValue, "bold 25px Finger Paint", "#00FF00", config.Screen.CENTER_X, config.Screen.CENTER_Y + 30, true);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            level3.scoreText.text;
            // add the _restartButton to the MENU scene
            this._restartButton = new objects.Button("RestartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, true);
            this.addChild(this._restartButton);
            // START_OVER Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            this._playBackgroundSound();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        Victory.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("victorymusic", { volume: 0.001 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        Victory.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START_OVER Button click event handler
        Victory.prototype._restartButtonClick = function (event) {
            gameController.LivesValue = 10;
            gameController.ScoreValue = 0;
            // Switch to the INTRO Scene
            scene = config.Scene.MENU;
            changeScene();
        };
        return Victory;
    }(objects.Scene));
    scenes.Victory = Victory;
})(scenes || (scenes = {}));

//# sourceMappingURL=victory.js.map
