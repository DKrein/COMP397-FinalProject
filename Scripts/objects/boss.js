/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Object for Boss
Revision:
1. Created class for Boss object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var Boss = (function (_super) {
        __extends(Boss, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Boss() {
            _super.call(this, "boss");
            this._reset(this._leftBounds);
            this.name = "boss";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Boss.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the fireball offscreen
        Boss.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            this.x = value;
            this.y = (Math.floor(Math.random() * this._bottomBounds) + this._topBounds) - (this.height);
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Boss.prototype.update = function () {
            // scroll the fireball down the screen
            this.x += this._speed.x;
            this.y += this._speed.y;
            this._checkBounds(this._rightBounds + 100);
        };
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));

//# sourceMappingURL=boss.js.map
