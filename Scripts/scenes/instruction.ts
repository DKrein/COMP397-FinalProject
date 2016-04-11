/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages Instruction scene in the game

Revision:
1. Added instruction labels and buttons
*/

// INSTRUCTION SCENE
module scenes {
    export class Instruction extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _instructionImage: createjs.Bitmap;
        
        private _startButton: objects.Button;
        private _backButton: objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();     
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
            //Add Background Image
            this._instructionImage = new createjs.Bitmap(assets.getResult("instructionBackground"));
            this.addChild(this._instructionImage);
            
            
            // add the BackButton to the MENU scene
            this._backButton = new objects.Button(
                "BackButton",
                config.Screen.CENTER_X + 350,
                config.Screen.CENTER_Y + 260, true);
            this.addChild(this._backButton);         
            
            // StartButton event listener
            this._backButton.on("click", this._backButtonClick, this);
                      
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // StartButton click event handler
        private _backButtonClick(event: createjs.MouseEvent) {
            // Switch to the Play Scene
            scene = config.Scene.MENU;
            changeScene();
        }

    }
}