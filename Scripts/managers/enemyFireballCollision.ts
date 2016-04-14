module managers {

    export class EnemyFireballCollision {
        // PRIVATE INSTANCE VARIABLES
        private _enemyFireball: objects.EnemyFireball;

        constructor(enemyFireball: objects.EnemyFireball) {
            this._enemyFireball = enemyFireball;
        }

        public distance(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        }

        public CheckEnemyFire(object: objects.GameObject) {

            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();
            var playerHalfWidth: number = this._enemyFireball.width * 0.5;
            var objectHalfWidth: number = object.width * 0.5;
            var minimumDistance: number = playerHalfWidth + objectHalfWidth;


            startPoint.x = this._enemyFireball.x;
            startPoint.y = this._enemyFireball.y;

            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;


            /* check if the distance between the player and 
              the other object is less than the minimum distance */
            if (this.distance(startPoint, endPoint) < minimumDistance) {
                //Check which object it collides
                if (object.name === "player") {
                    object.reset();
                    this._enemyFireball.reset();
                    gameController.LivesValue--;
                    //createjs.Sound.play("collect");
                }
                
            }//End MinimumDistance check
            
        }
    }
}