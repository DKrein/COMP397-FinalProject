/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Object for player's fireball
Revision:
1. Created class for player's fireball object
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // playerFireball CLASS ++++++++++++++++++++++++++++++++++++
    var PlayerFireball = (function (_super) {
        __extends(PlayerFireball, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function PlayerFireball(player) {
            _super.call(this, "playerFireball");
            this.isAvailable = true;
            this._player = player;
            this._speed.x = 5;
            this.x = this._leftBounds - 100;
            this.name = "playerFireball";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        // PROTECTED METHODS ++++++++++++++++++++++++++++
        // reset the playerFireball offscreen
        PlayerFireball.prototype._reset = function (value) {
            this.isAvailable = false;
            this.x = this._rightBounds;
            this.y = this._player.y - 50;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        PlayerFireball.prototype.update = function () {
            // scroll the fireball down the screen
            if (this.x >= this._leftBounds - 100) {
                this.x -= this._speed.x;
            }
            else {
                this.isAvailable = true;
            }
        };
        return PlayerFireball;
    }(objects.GameObject));
    objects.PlayerFireball = PlayerFireball;
})(objects || (objects = {}));

//# sourceMappingURL=playerFireball.js.map
