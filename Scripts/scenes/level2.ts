/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the play scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
*/

// LEVEL2 SCENE
module scenes {
    export class Level2 extends objects.Scene {

        public scoreWord: objects.Label;
        public scoreText: objects.Label;
        public resetCount: number;

        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _sky: objects.Sky;
        private _fire: objects.Fire;
        private _fireball: objects.Fireball[];
        private _fireballCount: number;
        private _dragonX: objects.DragonX[];
        private _dragonXCount: number;
        private _stalactite: objects.Stalactite;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private _enemyContainer: createjs.Container;
        private _collectableContainer: createjs.Container;
        private _playerFireball: objects.PlayerFireball;

        private _livesWord: objects.Label;
        private _livesText: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            
            
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;

            // Set _fireballCount Count
            this._fireballCount = 1;
            this._dragonXCount = 1;

            // Instantiate _fireball array
            this._fireball = new Array<objects.Fireball>();
            this._dragonX = new Array<objects.DragonX>();

            // added _sky to the scene
            this._sky = new objects.Sky("cave");
            this.addChild(this._sky);

            // added _fire to the scene
            this._fire = new objects.Fire();
            //this.addChild(this._fire);
            this._collectableContainer.addChild(this._fire);
            
            //added stalactites to the scene
            this._stalactite = new objects.Stalactite();
            this._enemyContainer.addChild(this._stalactite);

            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);

            //added _fireball to the scene
            for (var ball: number = 0; ball < this._fireballCount; ball++) {
                this._fireball[ball] = new objects.Fireball();
                //this.addChild(this._fireball[ball]);
                this._enemyContainer.addChild(this._fireball[ball]);
            }

            for (var dragon: number = 0; dragon < this._dragonXCount; dragon++) {
                this._dragonX[dragon] = new objects.DragonX();
                //this.addChild(this._dragonX[dragon]);
                this._enemyContainer.addChild(this._dragonX[dragon]);
            }
            
            this._playerFireball = new objects.PlayerFireball(this._player);
            this.addChild(this._playerFireball);

            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);

            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            
            // add stage click Listener
            stage.on("stagemousedown", this._stageClickHandler)

            //Add _scoreText to the scene
            this._livesWord = new objects.Label("LIVES: ",
                "bold 25px Britannic Bold",
                "#0434C4",
                15, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this._livesWord);

            //Add _livesText to the scene
            this._livesText = new objects.Label("LIVES: " +
                gameController.LivesValue.toString(),
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
                gameController.ScoreValue.toString(),
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
            this._stalactite.update();

            this._player.update();
            this._playerFireball.update();

            this._fireball.forEach(ball => {
                ball.update();
                this._collision.check(ball);
            });

            this._dragonX.forEach(dragon => {
                dragon.update();
                this._collision.check(dragon);
            });

            this._collision.check(this._fire);
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
            this._checkLives();
            this._changeGameLevel();

        }

        //PRIVATE METHODS
        private _checkLives(): void {
            if (gameController.LivesValue <= 0) {
                scene = config.Scene.END;
                changeScene();
            }
        }
        
        // Move to Level 3
        private _changeGameLevel(): void {

            if (this._sky.skyResetCount > 5) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                console.log("Call next level3");
            }
        }

        //EVENT HANDLERS ++++++++++++++++++++
        
        private _stageClickHandler(event: createjs.MouseEvent){
            console.log("Stage clicked");
            this._playerFireball.PositionFireBall();
        }

    }
}