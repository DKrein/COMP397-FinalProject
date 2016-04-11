/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages collisions in the game

Revision:
1. Changed collision to add score
*/

module managers {
    // COLLISION MANAGER CLASS
    export class Collision {
        // PRIVATE INSTANCE VARIABLES
        private _player: objects.Player;
        
        constructor(player:objects.Player) {
            this._player = player;
        }
        
        public distance(startPoint:createjs.Point, endPoint:createjs.Point):number {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x),2) + Math.pow(endPoint.y - startPoint.y,2))
        }
        
        public check(object:objects.GameObject) {
            var startPoint:createjs.Point = new createjs.Point();
            var endPoint:createjs.Point = new createjs.Point();
            var playerHalfWidth:number = this._player.width * 0.5;
            var objectHalfWidth:number = object.width * 0.5;
            var minimumDistance:number = playerHalfWidth + objectHalfWidth;
            
            startPoint.x = this._player.x;
            startPoint.y = this._player.y;
            
            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;
            
            
            /* check if the distance between the player and 
              the other object is less than the minimum distance */
            if(this.distance(startPoint, endPoint) < minimumDistance) {
                
                // check if it's fire hit
                if(object.name === "eggs") {
                    console.log("fire collected!");
                    object.reset();
                    //play.score ++;
                    gameController.ScoreValue++;
                    createjs.Sound.play("hit");
                }
                
                // check if it's a fireball hit
                if(object.name === "dragonXY" || object.name === "dragonX") {
                    object.reset();
                    //play.lives--;
                    gameController.LivesValue--;
                    createjs.Sound.play("collect");
                }
                
                // Collision with stalactite
                if(object.name === "stalactite"){
                    object.reset();
                    gameController.LivesValue--;
                }
            }
        }
    }
}