/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Menu scene in the game

Revision:
1. Added instruction button to the scene
*/

// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        
        private _startButton: objects.Button;
        private _instructionButton: objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();     
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
            //Add Background Image
            this._backgroundImage = new createjs.Bitmap(assets.getResult("background"));
            this.addChild(this._backgroundImage);
            
            
            // add the StartButton to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 35, true);
            this.addChild(this._startButton);
            
            // add the InstructionButton to the MENU scene
            this._instructionButton = new objects.Button(
                "InstructionButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 100, true);
            this.addChild(this._instructionButton);
            
            // StartButton event listener
            this._startButton.on("click", this._startButtonClick, this);
            
            // InstructionButton event listener
            this._instructionButton.on("click", this._instructionButtonClick, this);
            
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // StartButton click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // Switch to the Play Scene
            scene = config.Scene.PLAY;
            changeScene();
        }
        
        // StartButton click event handler
        private _instructionButtonClick(event: createjs.MouseEvent) {
            // Switch to the Play Scene
            scene = config.Scene.INSTRUCTION;
            changeScene();
        }

    }
}