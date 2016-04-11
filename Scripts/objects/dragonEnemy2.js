/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- dragonEnemy2 object
Revision:
1. Created class for dragonEnemy2 object
2. fixed the name of the class
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var DragonEnemy2 = (function (_super) {
        __extends(DragonEnemy2, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function DragonEnemy2() {
            _super.call(this, "dragonEnemy2");
            this._reset(this._leftBounds);
            this.name = "dragonEnemy2";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        DragonEnemy2.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the fireball offscreen
        DragonEnemy2.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            //this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            this.x = value;
            this.y = (Math.floor(Math.random() * this._bottomBounds) + this._topBounds) - (this.height);
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        DragonEnemy2.prototype.update = function () {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        };
        return DragonEnemy2;
    }(objects.GameObject));
    objects.DragonEnemy2 = DragonEnemy2;
})(objects || (objects = {}));
//# sourceMappingURL=dragonEnemy2.js.map