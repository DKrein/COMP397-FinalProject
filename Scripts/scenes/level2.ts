/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Level2 scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
4. Renamed the class sky for background, added sounds in the right place
5. fixed some names
*/

// LEVEL2 SCENE
module scenes {
    export class Level2 extends objects.Scene {

        public scoreWord: objects.Label;
        public scoreText: objects.Label;
        public resetCount: number;

        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backGround: objects.BackgroundScroll;
        private _fire: objects.Fire;
        
        private _dragonEnemy1: objects.DragonEnemy1[];
        private _dragonEnemy1Count: number;
        private _dragonEnemy2: objects.DragonEnemy2[];
        private _dragonEnemy2Count: number;                
        
        private _stalactite: objects.Stalactites;
        private _stalagmite: objects.Stalagmites;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private _enemyContainer: createjs.Container;
        private _collectableContainer: createjs.Container;
        private _playerFireball: objects.PlayerFireball;

        private _livesWord: objects.Label;
        private _livesText: objects.Label;
        
        private _bgSound: any;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        } 

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            
            
            this._enemyContainer = new createjs.Container;
            this._collectableContainer = new createjs.Container;
            
            // added _sky to the scene
            this._backGround = new objects.BackgroundScroll("level2Background");
            this.addChild(this._backGround);
            

            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;

            // Instantiate _fireball array
            this._dragonEnemy1 = new Array<objects.DragonEnemy1>();
            this._dragonEnemy2 = new Array<objects.DragonEnemy2>();            

            // added _fire to the scene
            this._fire = new objects.Fire();
            //this.addChild(this._fire);
            this._collectableContainer.addChild(this._fire);
            
            //added stalactites to the scene
            this._stalactite = new objects.Stalactites();
            this._enemyContainer.addChild(this._stalactite);
            
            //added stalactites to the scene
            this._stalagmite = new objects.Stalagmites();
            this._enemyContainer.addChild(this._stalagmite);

            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);

            //added _fireball to the scene
            for (var count: number = 0; count < this._dragonEnemy1Count; count++) {
                this._dragonEnemy1[count] = new objects.DragonEnemy1();
                this._enemyContainer.addChild(this._dragonEnemy1[count]);
            }

            for (var count: number = 0; count < this._dragonEnemy2Count; count++) {
                this._dragonEnemy2[count] = new objects.DragonEnemy2();
                this._enemyContainer.addChild(this._dragonEnemy2[count]);
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
            
            
             //this._playBackgroundSound();
            
            
            this.addChild(this.scoreText);

        }
        
        private _playBackgroundSound(): void{
            this._bgSound = createjs.Sound.play("gameBgMusic", {volume: 0.03});
            this._bgSound.on("complete",this._playBackgroundSound,this);
        }

        // PLAY Scene updates here
        public update(): void {
            this._backGround.update();
            this._fire.update();
            
            this._stalactite.update();
            this._collision.check(this._stalactite);
            
            this._stalagmite.update();
            this._collision.check(this._stalagmite);

            this._player.update();
            this._playerFireball.update();

            this._dragonEnemy1.forEach(dragon => {
                dragon.update();
                this._collision.check(dragon);
            });

            this._dragonEnemy2.forEach(dragon => {
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

            if (this._backGround.backgroundResetCount > 5) {
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