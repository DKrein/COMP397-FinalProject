var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var DragonX = (function (_super) {
        __extends(DragonX, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function DragonX() {
            _super.call(this, "dragonX");
            this._reset(this._leftBounds);
            this.name = "dragonX";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        DragonX.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the fireball offscreen
        DragonX.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            //this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBounds) + this._topBounds;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        DragonX.prototype.update = function () {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        };
        return DragonX;
    }(objects.GameObject));
    objects.DragonX = DragonX;
})(objects || (objects = {}));
//# sourceMappingURL=dragonX.js.map