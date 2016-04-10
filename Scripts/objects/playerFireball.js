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
            //this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            //this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            this.x = this._rightBounds;
            this.y = this._bottomBounds + 100;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        PlayerFireball.prototype.update = function () {
            // scroll the fireball down the screen
            this.x -= this._speed.x;
            //this.y -= this._speed.y;
            this._checkBounds(this._leftBounds + 100);
        };
        PlayerFireball.prototype.PositionFireBall = function () {
            console.log("_postionFireBall called");
            this.y = this._player.y;
            this.x = this._player.x;
        };
        return PlayerFireball;
    }(objects.GameObject));
    objects.PlayerFireball = PlayerFireball;
})(objects || (objects = {}));

//# sourceMappingURL=playerFireball.js.map
