/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Object for enemy's fireball
Revision:
1. Created class for enemy's fireball object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // playerFireball CLASS ++++++++++++++++++++++++++++++++++++
    var BossFireball = (function (_super) {
        __extends(BossFireball, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function BossFireball(boss) {
            _super.call(this, "enemyFireball");
            this.isAvailable = true;
            this._boss = boss;
            this._speed.x = 10;
            this.x = this._rightBounds + 100;
            this.name = "enemyFireball";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        // PROTECTED METHODS ++++++++++++++++++++++++++++
        // reset the playerFireball offscreen
        BossFireball.prototype._reset = function (value) {
            this.isAvailable = true;
            this.x = this._leftBounds;
            this.y = this._bottomBounds + 100;
        };
        BossFireball.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        BossFireball.prototype.update = function () {
            // scroll the fireball left the screen
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds);
        };
        BossFireball.prototype.PositionFireBall = function () {
            this.isAvailable = false;
            this.y = this._boss.y + 30;
            this.x = this._boss.x + 80;
        };
        return BossFireball;
    }(objects.GameObject));
    objects.BossFireball = BossFireball;
})(objects || (objects = {}));

//# sourceMappingURL=bossFireball.js.map
