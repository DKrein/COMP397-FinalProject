/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Object for fire collectable
Revision:
1. Created class for fire collectable object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // ISLAND CLASS ++++++++++++++++++++++++++++++++++++
    var Fire = (function (_super) {
        __extends(Fire, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Fire() {
            _super.call(this, "fire");
            this._speed.x = 5; //fire speed
            this._reset(this._leftBounds - 100);
            this.name = "fire";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Fire.prototype._checkBounds = function (value) {
            // check to see if the top of the fire 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the Sky offscreen
        Fire.prototype._reset = function (value) {
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBounds) + this._topBounds;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Fire.prototype.update = function () {
            // scroll the fire 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        };
        return Fire;
    }(objects.GameObject));
    objects.Fire = Fire;
})(objects || (objects = {}));
//# sourceMappingURL=fire.js.map