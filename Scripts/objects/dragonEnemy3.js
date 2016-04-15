/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/14/2016
File description:
- Object for dragon enemy 3
Revision:
1. Created class for dragonEnemy3 object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var DragonEnemy3 = (function (_super) {
        __extends(DragonEnemy3, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function DragonEnemy3() {
            _super.call(this, "dragonEnemy3");
            this._reset(this._leftBounds);
            this.name = "dragonEnemy3";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        DragonEnemy3.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the fireball offscreen
        DragonEnemy3.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 3 + 1) + 5;
            this._speed.y = Math.floor(Math.random() * 2 + 1) - 2;
            this.x = value;
            this.y = (Math.floor(Math.random() * this._bottomBounds) + this._topBounds) - (this.height);
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        DragonEnemy3.prototype.update = function () {
            // scroll the fireball down the screen
            this.x += this._speed.x;
            this.y += this._speed.y;
            this._checkBounds(this._rightBounds + 100);
        };
        return DragonEnemy3;
    }(objects.GameObject));
    objects.DragonEnemy3 = DragonEnemy3;
})(objects || (objects = {}));

//# sourceMappingURL=dragonEnemy3.js.map
