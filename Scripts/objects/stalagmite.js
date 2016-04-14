/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Object for stalagmite
Revision:
1. Created class for stalagmite object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // ISLAND CLASS ++++++++++++++++++++++++++++++++++++
    var Stalagmites = (function (_super) {
        __extends(Stalagmites, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Stalagmites() {
            _super.call(this, "stalagmite");
            this._reset(this._leftBounds - 100);
            this.name = "stalagmite";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Stalagmites.prototype._checkBounds = function (value) {
            // check to see if the top of the fire 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the stalagmite offscreen
        Stalagmites.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            this.x = value;
            this.y = this._bottomBounds - (this.height * 2);
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Stalagmites.prototype.update = function () {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        };
        return Stalagmites;
    }(objects.GameObject));
    objects.Stalagmites = Stalagmites;
})(objects || (objects = {}));

//# sourceMappingURL=stalagmite.js.map
