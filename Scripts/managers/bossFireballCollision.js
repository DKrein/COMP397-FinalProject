var managers;
(function (managers) {
    var BossFireballCollision = (function () {
        function BossFireballCollision(bossFireball) {
            this._bossFireball = bossFireball;
        }
        BossFireballCollision.prototype.distance = function (startPoint, endPoint) {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        };
        BossFireballCollision.prototype.CheckEnemyFire = function (object) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var playerHalfWidth = this._bossFireball.width * 0.5;
            var objectHalfWidth = object.width * 0.5;
            var minimumDistance = playerHalfWidth + objectHalfWidth;
            startPoint.x = this._bossFireball.x;
            startPoint.y = this._bossFireball.y;
            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;
            /* check if the distance between the player and
              the other object is less than the minimum distance */
            if (this.distance(startPoint, endPoint) < minimumDistance) {
                //Check which object it collides
                if (object.name === "player") {
                    object.reset();
                    this._bossFireball.reset();
                    gameController.LivesValue--;
                }
            } //End MinimumDistance check
        };
        return BossFireballCollision;
    }());
    managers.BossFireballCollision = BossFireballCollision;
})(managers || (managers = {}));

//# sourceMappingURL=bossFireballCollision.js.map
