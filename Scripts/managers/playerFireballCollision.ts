module managers {

    export class PlayerFireballCollision {
        // PRIVATE INSTANCE VARIABLES
        private _playerFireball: objects.PlayerFireball;

        constructor(playerFireball: objects.PlayerFireball) {
            this._playerFireball = playerFireball;
        }

        public distance(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        }

        public CheckPlayerFire(object: objects.GameObject) {

            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();
            var playerHalfWidth: number = this._playerFireball.width * 0.5;
            var objectHalfWidth: number = object.width * 0.5;
            var minimumDistance: number = playerHalfWidth + objectHalfWidth;


            startPoint.x = this._playerFireball.x;
            startPoint.y = this._playerFireball.y;

            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;


            /* check if the distance between the player and 
              the other object is less than the minimum distance */
            if (this.distance(startPoint, endPoint) < minimumDistance) {
                //Check which object it collides
                if (object.name === "dragonEnemy1") {
                    object.reset();
                    this._playerFireball.reset();
                    gameController.ScoreValue++;
                    //createjs.Sound.play("collect");
                }
                
                if (object.name === "dragonEnemy2") {
                    object.reset();
                    this._playerFireball.reset();
                    gameController.ScoreValue++;
                    //createjs.Sound.play("collect");
                }
                
                if (object.name === "boss") {
                    //object.reset();
                    this._playerFireball.reset();
                    gameController.BossValue = gameController.BossValue - 1;
                    console.log("Boss has been hit!");
                    //createjs.Sound.play("collect");
                }
                
            }//End MinimumDistance check
            
        }
    }
}