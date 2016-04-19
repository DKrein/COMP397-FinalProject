/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
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
        
        private _bgSound: any;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS ++++++++++++++++++++
        
        
        // Start Method
        public start(): void {
            createjs.Sound.stop();
            
            //Add Gameover Image
            this._gameoverImage = new createjs.Bitmap(assets.getResult("gameOverBackground"));
            this.addChild(this._gameoverImage);
            
            //add the final score label
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("HIGHSCORE: " + gameController.ScoreValue,
                "bold 25px Finger Paint",
                "#FF0000",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 30, true);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);

            level3.scoreText.text;
            
            
            // add the _restartButton to the MENU scene
            this._restartButton = new objects.Button(
                "RestartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 100, true);
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
        }
        
        private _playBackgroundSound(): void{
            this._bgSound = createjs.Sound.play("gameOverBgMusic", {volume: 0.001});
            this._bgSound.on("complete",this._playBackgroundSound,this);
        }

        // PLAY Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START_OVER Button click event handler
        private _restartButtonClick(event: createjs.MouseEvent) {
            this._fadeOut(500, () => {
                // Switch to the INTRO Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        }
    }
}