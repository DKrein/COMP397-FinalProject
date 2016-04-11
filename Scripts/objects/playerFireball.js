var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    var PlayerFireball = (function (_super) {
        __extends(PlayerFireball, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function PlayerFireball(player) {
            _super.call(this, "fireball");
            this._player = player;
            this._speed.x = 5;
            this._reset(this._rightBounds);
            this.name = "fireball";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        // PROTECTED METHODS ++++++++++++++++++++++++++++
        PlayerFireball.prototype._checkBounds = function (value) {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x <= value) {
                this._reset(this._rightBounds + 100);
            }
        };
        // reset the fireball offscreen
        PlayerFireball.prototype._reset = function (value) {
            this.x = this._rightBounds;
            this.y = this._bottomBounds + 100;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        PlayerFireball.prototype.update = function () {
            // scroll the fireball left the screen
            this.x -= this._speed.x;
            this._checkBounds(this._leftBounds);
        };
        PlayerFireball.prototype.PositionFireBall = function () {
            this.y = this._player.y - 30;
            this.x = this._player.x - 80;
        };
        return PlayerFireball;
    }(objects.GameObject));
    objects.PlayerFireball = PlayerFireball;
})(objects || (objects = {}));
//# sourceMappingURL=playerFireball.js.map