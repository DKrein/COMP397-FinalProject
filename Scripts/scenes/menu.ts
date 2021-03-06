﻿/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/8/2016
File description: Manages the Menu scene in the game

Revision:
1. Added instruction button to the scene
2. Added exit button to the scene
3. Reseting lives and score whenever starting a game
*/

// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _startButton: objects.Button;
        private _instructionButton: objects.Button;
        private _exitButton: objects.Button;
        private _bgSound: any;
        private _startSound: any;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            createjs.Sound.stop();
            
            //Add Background Image
            this._backgroundImage = new createjs.Bitmap(assets.getResult("menuBackground"));
            this.addChild(this._backgroundImage);
            
            
            // add the StartButton to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X  - 75,
                config.Screen.CENTER_Y  - 25, true);
            this.addChild(this._startButton);
            
            // add the InstructionButton to the MENU scene
            this._instructionButton = new objects.Button(
                "InstructionButton",
                config.Screen.CENTER_X - 75,
                config.Screen.CENTER_Y + 100, true);
            this.addChild(this._instructionButton);
            
            // add the ExitButton to the MENU scene
            this._exitButton = new objects.Button(
                "ExitButton",
                config.Screen.CENTER_X + 20,
                config.Screen.CENTER_Y + 165, true);
            this.addChild(this._exitButton);
            
            // StartButton event listener
            this._startButton.on("click", this._startButtonClick, this);
            
            // InstructionButton event listener
            this._instructionButton.on("click", this._instructionButtonClick, this);
            
            // ExitButton event listener
            this._exitButton.on("click", this._exitButtonClick, this);
            
            //reset the gamecontroller
            gameController.reset();
            
            //this._playBackgroundSound();
            
            
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        private _playBackgroundSound(): void {
            this._bgSound = createjs.Sound.play("menuBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        }
       

        // INTRO Scene updates here
        public update(): void {
            this.checkControls();
        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // StartButton click event handler
        private _startButtonClick(event: createjs.MouseEvent) {

            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the Play Scene
                scene = config.Scene.LEVEL1;
                changeScene();
                createjs.Sound.play("startGame", {volume: 0.10});
            });

        }
        
        // StartButton click event handler
        private _instructionButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the INSTRUCTION Scene
                scene = config.Scene.INSTRUCTION;
                changeScene();    
            });
        }
        
        // ExitButton click event handler
        private _exitButtonClick(event: createjs.MouseEvent) {
            // Switch to the EXIT Scene
            window.close();
        }
        
        private checkControls(): void {
            if (keyboardControls.changeToLevel1) {
                this._fadeOut(500, () => {
                    scene = config.Scene.LEVEL1;
                    changeScene();
                });
            }
            if (keyboardControls.changeToLevel2) {
                this._fadeOut(500, () => {
                    scene = config.Scene.LEVEL2;
                    changeScene();
                });
            }
            if (keyboardControls.changeToLevel3) {
                this._fadeOut(500, () => {
                    scene = config.Scene.LEVEL3;
                    changeScene();
                });
            }
        }

    }
}