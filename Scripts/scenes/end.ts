/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the gameover scene

Revision:
1. Added gameover label and background
*/

// END SCENE
module scenes {
    export class End extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _gameoverImage: createjs.Bitmap;
        
        private _restartButton: objects.Button;
        public scoreWord: objects.Label;
        public scoreText: objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS ++++++++++++++++++++
        
        
        // Start Method
        public start(): void {
            //Add Gameover Image
            this._gameoverImage = new createjs.Bitmap(assets.getResult("gameover"));
            this.addChild(this._gameoverImage);
            
            //add the final score label
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("HIGHSCORE: " + play.scoreText.text,
                "bold 25px Britannic Bold",
                "#FF0000",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 30, true);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);

            play.scoreText.text;
            
            
            // add the _restartButton to the MENU scene
            this._restartButton = new objects.Button(
                "RestartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 100, true);
            this.addChild(this._restartButton); 
           
            // START_OVER Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);


            // add this scene to the global stage container
            stage.addChild(this);
        }

        // PLAY Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START_OVER Button click event handler
        private _restartButtonClick(event: createjs.MouseEvent) {
            // Switch to the INTRO Scene
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}