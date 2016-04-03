/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages Instruction scene in the game

Revision:
1. Added instruction labels and buttons
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// INSTRUCTION SCENE
var scenes;
(function (scenes) {
    var Instruction = (function (_super) {
        __extends(Instruction, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Instruction() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Instruction.prototype.start = function () {
            //Add Background Image
            this._instructionImage = new createjs.Bitmap(assets.getResult("instruction"));
            this.addChild(this._instructionImage);
            // add the BackButton to the MENU scene
            this._backButton = new objects.Button("BackButton", config.Screen.CENTER_X + 230, config.Screen.CENTER_Y + 200, true);
            this.addChild(this._backButton);
            // StartButton event listener
            this._backButton.on("click", this._backButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        Instruction.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // StartButton click event handler
        Instruction.prototype._backButtonClick = function (event) {
            // Switch to the Play Scene
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instruction;
    }(objects.Scene));
    scenes.Instruction = Instruction;
})(scenes || (scenes = {}));

//# sourceMappingURL=instruction.js.map
