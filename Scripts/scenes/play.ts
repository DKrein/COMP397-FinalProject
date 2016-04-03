/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the play scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
*/

// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {

        public score: number;
        public scoreWord: objects.Label;
        public scoreText: objects.Label;
        public lives: number;
        
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _sky: objects.Sky;
        private _fire: objects.Fire;
        private _fireball: objects.Fireball[];
        private _fireballCount: number;
        private _player: objects.Player;
        private _collision: managers.Collision;

        private _livesWord: objects.Label;
        private _livesText: objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            this.score = 0;
            this.lives = 10;
            
            // Set _fireballCount Count
            this._fireballCount = 8;
            
            // Instantiate _fireball array
            this._fireball = new Array<objects.Fireball>();
                
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
            for (var ball: number = 0; ball < this._fireballCount; ball++) {
                this._fireball[ball] = new objects.Fireball();
                this.addChild(this._fireball[ball]);
            }
            
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            
            // add this scene to the global stage container
            stage.addChild(this);
            
            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ",
                "bold 25px Britannic Bold",
                "#0434C4",
                15, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesWord);
            
            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                this.lives.toString(),
                "bold 25px Britannic Bold",
                "#0434C4",
                100, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesText);
            
            //Add _scoreText to the scene
            this.scoreWord = new objects.Label("SCORE: ",
                "bold 25px Britannic Bold",
                "#0434C4",
                500, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);

            this.scoreText = new objects.Label("SCORE: " +
                this.score.toString(),
                "bold 25px Britannic Bold",
                "#0434C4",
                600, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreText);

        }

        // PLAY Scene updates here
        public update(): void {
            this._sky.update();
            this._fire.update();

            this._player.update();

            this._fireball.forEach(ball => {
                ball.update();
                this._collision.check(ball);
            });

            this._collision.check(this._fire);
            this.scoreText.text = this.score.toString();
            this._livesText.text = this.lives.toString();
            this._checkLives();

        }
        
        //PRIVATE METHODS
        private _checkLives(): void {
            if (this.lives <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        
        
    }
}