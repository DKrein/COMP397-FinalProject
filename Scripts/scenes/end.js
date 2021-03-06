/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the gameover scene

Revision:
1. Added gameover label and background
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// END SCENE
var scenes;
(function (scenes) {
    var End = (function (_super) {
        __extends(End, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function End() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++
        // Start Method
        End.prototype.start = function () {
            createjs.Sound.stop();
            //Add Gameover Image
            this._gameoverImage = new createjs.Bitmap(assets.getResult("gameOverBackground"));
            this.addChild(this._gameoverImage);
            //add the final score label
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("HIGHSCORE: " + gameController.ScoreValue, "bold 25px Finger Paint", "#FF0000", config.Screen.CENTER_X, config.Screen.CENTER_Y + 30, true);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);
            //level3.scoreText.text;
            // add the _restartButton to the MENU scene
            this._restartButton = new objects.Button("RestartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, true);
            this.addChild(this._restartButton);
            // START_OVER Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            this._playBackgroundSound();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        End.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("gameOverBgMusic", { volume: 0.001 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // PLAY Scene updates here
        End.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START_OVER Button click event handler
        End.prototype._restartButtonClick = function (event) {
            this._fadeOut(500, function () {
                // Switch to the INTRO Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));

//# sourceMappingURL=end.js.map
