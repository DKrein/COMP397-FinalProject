var managers;
(function (managers) {
    var EnemyFireballCollision = (function () {
        function EnemyFireballCollision(enemyFireball) {
            this._enemyFireball = enemyFireball;
        }
        EnemyFireballCollision.prototype.distance = function (startPoint, endPoint) {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        };
        EnemyFireballCollision.prototype.CheckEnemyFire = function (object) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var playerHalfWidth = this._enemyFireball.width * 0.5;
            var objectHalfWidth = object.width * 0.5;
            var minimumDistance = playerHalfWidth + objectHalfWidth;
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
                }
            } //End MinimumDistance check
        };
        return EnemyFireballCollision;
    }());
    managers.EnemyFireballCollision = EnemyFireballCollision;
})(managers || (managers = {}));

//# sourceMappingURL=enemyFireballCollision.js.map
