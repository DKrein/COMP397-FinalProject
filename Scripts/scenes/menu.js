/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/8/2016
File description: Manages the Menu scene in the game

Revision:
1. Added instruction button to the scene
2. Added exit button to the scene
3. Reseting lives and score whenever starting a game
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Menu.prototype.start = function () {
            createjs.Sound.stop();
            //Add Background Image
            this._backgroundImage = new createjs.Bitmap(assets.getResult("menuBackground"));
            this.addChild(this._backgroundImage);
            // add the StartButton to the MENU scene
            this._startButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 35, true);
            this.addChild(this._startButton);
            // add the InstructionButton to the MENU scene
            this._instructionButton = new objects.Button("InstructionButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100, true);
            this.addChild(this._instructionButton);
            // add the ExitButton to the MENU scene
            this._exitButton = new objects.Button("ExitButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 165, true);
            this.addChild(this._exitButton);
            // StartButton event listener
            this._startButton.on("click", this._startButtonClick, this);
            // InstructionButton event listener
            this._instructionButton.on("click", this._instructionButtonClick, this);
            // ExitButton event listener
            this._exitButton.on("click", this._exitButtonClick, this);
            //reset the gamecontroller
            gameController.BossValue = 10;
            gameController.LivesValue = 10;
            gameController.ScoreValue = 0;
            //this._playBackgroundSound();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        Menu.prototype._playBackgroundSound = function () {
            this._bgSound = createjs.Sound.play("menuBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        };
        // INTRO Scene updates here
        Menu.prototype.update = function () {
            this.checkControls();
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // StartButton click event handler
        Menu.prototype._startButtonClick = function (event) {
            // Switch to the Play Scene
            scene = config.Scene.LEVEL2;
            changeScene();
        };
        // StartButton click event handler
        Menu.prototype._instructionButtonClick = function (event) {
            // Switch to the INSTRUCTION Scene
            scene = config.Scene.INSTRUCTION;
            changeScene();
        };
        // ExitButton click event handler
        Menu.prototype._exitButtonClick = function (event) {
            // Switch to the EXIT Scene
            window.close();
        };
        Menu.prototype.checkControls = function () {
            if (this.keyboardControls.changeToLevel2) {
                scene = config.Scene.LEVEL2;
                changeScene();
            }
            if (this.keyboardControls.changeToLevel3) {
                scene = config.Scene.LEVEL3;
                changeScene();
            }
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));

//# sourceMappingURL=menu.js.map
