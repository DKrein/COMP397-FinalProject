var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var Stalactite = (function (_super) {
        __extends(Stalactite, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Stalactite() {
            _super.call(this, "stalactite");
            this._reset(this._leftBounds);
            this.name = "stalactite";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Stalactite.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        };
        // reset the fireball offscreen
        Stalactite.prototype._reset = function (value) {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            this.x = value;
            this.y = 1;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Stalactite.prototype.update = function () {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        };
        return Stalactite;
    }(objects.GameObject));
    objects.Stalactite = Stalactite;
})(objects || (objects = {}));

//# sourceMappingURL=stalactites.js.map
