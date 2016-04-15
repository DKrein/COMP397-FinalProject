/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages the Level3 scene

Revision:
1. Added score and lives label
2. Added score counter based on collision
3. Added live checker to transition to gameover
4. Renamed the class sky for background, added sounds in the right place
5. fixed some names
6. Added boss and boss label
6. changed 3 playerFireballColision variables for an array
*/

// LEVEL2 SCENE
module scenes {
    export class Level3 extends objects.Scene {

        public scoreWord: objects.Label;
        public scoreText: objects.Label;
        public bossWord: objects.Label;
        public bossText: objects.Label;
        //public 
        public resetCount: number;

        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backGround: objects.BackgroundScroll;
        private _fire: objects.Fire;

        private _dragonEnemy1: objects.DragonEnemy1[];
        private _dragonEnemy1Count: number;
        private _dragonEnemy2: objects.DragonEnemy2[];
        private _dragonEnemy2Count: number;
        private _dragonEnemy3: objects.DragonEnemy3[];
        private _dragonEnemy3Count: number;
        private _boss: objects.Boss;
        private _playerFireball: objects.PlayerFireball[];
        private _playerFireballCount: number;
        private _bossFireball: objects.BossFireball[];
        private _bossFireballCount: number;
        private _enemyFireball: objects.EnemyFireball[];
        private _enemyFireballCount: number;
        private _playerFireballCollision: managers.PlayerFireballCollision[];

        private _stalactite: objects.Stalactites;
        private _stalagmite: objects.Stalagmites;
        private _player: objects.Player;
        private _playerCollision: managers.PlayerCollision;
        private _enemyContainer: createjs.Container;
        private _collectableContainer: createjs.Container;


        private _enemyFireballCollision: managers.EnemyFireballCollision;

        private _bossFireballCollision: managers.BossFireballCollision;

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
            this._backGround = new objects.BackgroundScroll("level3Background");
            this.addChild(this._backGround);
            
            // Set _fireballCount Count
            this._dragonEnemy1Count = 1;
            this._dragonEnemy2Count = 1;
            this._dragonEnemy3Count = 1;
            this._playerFireballCount = 3;
            this._bossFireballCount = 1;
            this._enemyFireballCount = 1;

            // Instantiate _fireball array
            this._dragonEnemy1 = new Array<objects.DragonEnemy1>();
            this._dragonEnemy2 = new Array<objects.DragonEnemy2>();
            this._playerFireball = new Array<objects.PlayerFireball>();
            this._bossFireball = new Array<objects.BossFireball>();
            this._enemyFireball = new Array<objects.EnemyFireball>(); 
            this._playerFireballCollision = new Array<managers.PlayerFireballCollision>();            

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
            
            //added _boss to the scene
            this._boss = new objects.Boss(this._player);  

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

            for (var count: number = 0; count < this._bossFireballCount; count++) {
                this._bossFireball[count] = new objects.BossFireball(this._boss);
                this.addChild(this._bossFireball[count]);
            }
            
            for (var count: number = 0; count < this._enemyFireballCount; count++) {
                this._enemyFireball[count] = new objects.EnemyFireball(this._dragonEnemy3[count]);
                this.addChild(this._enemyFireball[count]);
            }

            // added collision manager to the scene
            this._playerCollision = new managers.PlayerCollision(this._player);

            for (var count: number = 0; count < this._playerFireballCount; count++) {
                this._playerFireball[count] = new objects.PlayerFireball(this._player);
                this.addChild(this._playerFireball[count]);
                this._playerFireballCollision[count] = new managers.PlayerFireballCollision(this._playerFireball[count]);
            }

            this._bossFireballCollision = new managers.BossFireballCollision(this._bossFireball[0]);
            // this._enemyFireballCollision1 = new managers.EnemyFireballCollision(this._enemyFireball[1]);
            // this._enemyFireballCollision2 = new managers.EnemyFireballCollision(this._enemyFireball[2]);

            // add this scene to the global stage container
            stage.addChild(this, this._enemyContainer, this._collectableContainer);
            
            // add stage click Listener
            this._backGround.on("click", this._playerFire, this);
            //this._backGround.on("click", this._enemyFire, this);

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
                900, 15, false);
            //this._livesText.textAlign = "right";
            this.addChild(this.scoreWord);

            this.scoreText = new objects.Label("SCORE: " +
                gameController.ScoreValue.toString(),
                "bold 25px Britannic Bold",
                "#0434C4",
                1000, 15, false);
            //this._livesText.textAlign = "right";
            
            
            //this._playBackgroundSound();
            
            
            this.addChild(this.scoreText);

            this.bossWord = new objects.Label("BOSS: ",
                "bold 40px Britannic Bold",
                "#FF0000",
                490, 15, false);
            //this._livesText.textAlign = "right";

            this.bossText = new objects.Label(
                gameController.BossValue.toString(),
                "bold 40px Britannic Bold",
                "#FF0000",
                525, 55, false);

        }

        private _playBackgroundSound(): void {
            this._bgSound = createjs.Sound.play("gameBgMusic", { volume: 0.03 });
            this._bgSound.on("complete", this._playBackgroundSound, this);
        }

        // PLAY Scene updates here
        public update(): void {
            this._backGround.update();
            this._fire.update();
            this._boss.update();

            this._stalactite.update();
            this._playerCollision.check(this._stalactite);

            this._stalagmite.update();
            this._playerCollision.check(this._stalagmite);

            this._player.update();

            this._playerFireball.forEach(fireball => {
                fireball.update();
            });

            this._bossFireball.forEach(fireball => {
                fireball.update();
            });
            
            this._enemyFireball.forEach(fireball => {
                fireball.update();
            });

            var countDrag = 0;
            //this._enemyFire();
            this._dragonEnemy1.forEach(dragon => {
                dragon.update();
                this._playerFireballCollision[countDrag].check(dragon);
                this._playerCollision.check(dragon);
                countDrag++;
            });

            countDrag = 0;
            this._dragonEnemy2.forEach(dragon => {
                dragon.update();
                this._playerFireballCollision[countDrag].check(dragon);
                this._playerCollision.check(dragon);
                countDrag++;
            });
            
            countDrag=0;
            this._dragonEnemy3.forEach(dragon => {
                dragon.update();
                this._playerFireballCollision[countDrag].check(dragon);
                this._playerCollision.check(dragon);
                countDrag++;
            });

            this._bossFire();
            this._enemyFire();
            this._boss.update();

            this._playerFireballCollision.forEach(playerFireballCollision => {
                playerFireballCollision.check(this._boss);
            });
            
            this._playerCollision.check(this._enemyFireball[0]);

            this._playerCollision.check(this._bossFireball[0]);
            // this._playerCollision.check(this._enemyFireball[1]);
            // this._playerCollision.check(this._enemyFireball[2]);
            this._playerCollision.check(this._boss);

            this._playerCollision.check(this._fire);
            this.scoreText.text = gameController.ScoreValue.toString();
            this._livesText.text = gameController.LivesValue.toString();
            this.bossText.text = gameController.BossValue.toString();
            this._summonBoss();
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
        
        // Move to End
        private _changeGameLevel(): void {

            if (gameController.BossValue == 0) {
                //Remove the enemy from
                this._enemyContainer.removeAllChildren();
                this._collectableContainer.removeAllChildren();
                stage.removeChild(this._enemyContainer, this._collectableContainer);
                
                //Should be level 3
                scene = config.Scene.END;
                changeScene();
            }
        }
        
        //Add boss to scene
        private _summonBoss(): void {

            //if (this._backGround.backgroundResetCount > 1) {
            this._enemyContainer.addChild(this._boss);
            this.addChild(this.bossWord);
            this.addChild(this.bossText);

            console.log("Boss");
            //}
        }

        //EVENT HANDLERS ++++++++++++++++++++
        
        private _playerFire(event: createjs.MouseEvent) {
            for (var count: number = 0; count < this._playerFireballCount; count++) {
                console.log("CLICKER CLICK");
                if (this._playerFireball[count].isAvailable) {
                    this._playerFireball[count].PositionFireBall();
                    break;
                }
            }
        }

        private _bossFire(): void {

            if (gameController.LivesValue != 0) {
                for (var count: number = 0; count < this._bossFireballCount; count++) {
                    if (this._bossFireball[count].isAvailable) {
                        this._bossFireball[count].PositionFireBall();
                        break;
                    }
                }
            }
        }
        
        private _enemyFire(): void {

            if (gameController.LivesValue != 0) {
                for (var count: number = 0; count < this._enemyFireballCount; count++) {
                    if (this._enemyFireball[count].isAvailable) {
                        this._enemyFireball[count].PositionFireBall();
                        break;
                    }
                }
            }
        }
        
        

    }
}