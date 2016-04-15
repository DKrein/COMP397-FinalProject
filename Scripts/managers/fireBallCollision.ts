/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages collisions in the player object

Revision:
1. created a new class to take care about the fireballs
*/

module managers {
    // COLLISION MANAGER CLASS
    export class FireBallCollision {
        // PRIVATE INSTANCE VARIABLES
        private _player: objects.Player;

        constructor(player: objects.Player) {
            this._player = player;
        }

        public distance(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2))
        }

        public check(object: objects.GameObject) {
            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();
            var playerHalfWidth: number = this._player.width * 0.5;
            var objectHalfWidth: number = object.width * 0.5;
            var minimumDistance: number = playerHalfWidth + objectHalfWidth;

            startPoint.x = this._player.x;
            startPoint.y = this._player.y;

            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;


            /* check if the distance between the player and 
              the other object is less than the minimum distance */
            if(this.distance(startPoint, endPoint) < minimumDistance) {
                
                // check if it's egg
                if( object.name.indexOf('egg') >= 0 ) {
                    console.log("egg collected!");
                    object.reset();
                    var score = parseInt(object.name.replace("egg",""));
                    
                    gameController.ScoreValue+= score;
                    createjs.Sound.play("hit", {volume: 0.01});
                } 
                
                if( object.name === "fire") {
                    console.log("fire collected!");
                    object.reset();
                    //DO SOMETHING HERE IN THE FUTURE
                } 
                
                // check if it's a fireball hit
                if(object.name === "dragonEnemy1" || object.name === "dragonEnemy2" || object.name === "dragonEnemy3") {
                    object.reset();
                    gameController.LivesValue--;
                    createjs.Sound.play("collect", {volume: 0.01});
                }

                // check if player collided with stalactite
                if (object.name === "stalactite" || object.name === "stalagmite") {
                    object.reset();
                    console.log("BOINK");
                    gameController.LivesValue-= 2;
                    createjs.Sound.play("collect", {volume: 0.01});
                }
            }

        }
    }
}