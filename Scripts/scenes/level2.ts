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
        private _playerFireball: objects.PlayerFireball[];
        private _playerFireballCount: number;

        private _stalactite: objects.Stalactites;
        private _stalagmite: objects.Stalagmites;
        private _player: objects.Player;
        private _playerCollision: managers.PlayerCollision;
        private _enemyContainer: createjs.Container;
        private _collectableContainer: createjs.Container;
        private _playerFireballCollision: managers.PlayerFireballCollision;
        private _playerFireballCollision1: managers.PlayerFireballCollision;
        private _playerFireballCollision2: managers.PlayerFireballCollision;

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
            this._playerFireballCount = 3;

            // Instantiate _fireball array
            this._dragonEnemy1 = new Array<objects.DragonEnemy1>();
            this._dragonEnemy2 = new Array<objects.DragonEnemy2>();
            this._playerFireball = new Array<objects.PlayerFireball>();

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
            this._player = new objects.Player("player");
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

            for (var count: number = 0; count < this._playerFireballCount; count++) {
                this._playerFireball[count] = new objects.PlayerFireball(this._player);
                this.addChild(this._playerFireball[count]);
            }

            this._playerFireballCollision = new managers.PlayerFireballCollision(this._playerFireball[0]);
            this._playerFireballCollision1 = new managers.PlayerFireballCollision(this._playerFireball[1]);
            this._playerFireballCollision2 = new managers.PlayerFireballCollision(this._playerFireball[2]);
            this._playerCollision = new managers.PlayerCollision(this._player);

            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);

            // add stage click Listener
            this._backGround.on("click", this._playerFireClickHandler, this);

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

        private _playBackgroundSound(): void {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        }

        // PLAY Scene updates here
        public update(): void {
            this._backGround.update();
            this._fire.update();

            this._stalactite.update();
            this._playerCollision.check(this._stalactite);

            this._stalagmite.update();
            this._playerCollision.check(this._stalagmite);

            this._player.update();

            this._playerFireball.forEach(fireball => {
                fireball.update();
            });

            this._dragonEnemy1.forEach(dragon => {
                dragon.update();
                this._playerFireballCollision.CheckPlayerFire(dragon);
                this._playerFireballCollision1.CheckPlayerFire(dragon);
                this._playerFireballCollision2.CheckPlayerFire(dragon);
                this._playerCollision.check(dragon);
            });

            this._dragonEnemy2.forEach(dragon => {
                dragon.update();
                this._playerFireballCollision.CheckPlayerFire(dragon);
                this._playerFireballCollision1.CheckPlayerFire(dragon);
                this._playerFireballCollision2.CheckPlayerFire(dragon);
                this._playerCollision.check(dragon);
            });

            this._playerCollision.check(this._fire);
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

            if (this._backGround.backgroundResetCount > 2) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);

                //Should be level 3
                scene = config.Scene.LEVEL1;
                changeScene();
            }
        }

        //EVENT HANDLERS ++++++++++++++++++++

        private _playerFireClickHandler(event: createjs.MouseEvent) {
            for (var count: number = 0; count < this._playerFireballCount; count++) {

                if (this._playerFireball[count].isAvailable) {
                    this._playerFireball[count].PositionFireBall();
                    break;
                }
            }
        }

    }
}