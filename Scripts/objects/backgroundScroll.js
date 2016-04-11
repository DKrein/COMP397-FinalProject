/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description:
- Class which take care about the scroll of the background
Revision:
1. Since we don't have sky, the name was changed to better understanding
    
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    var BackgroundScroll = (function (_super) {
        __extends(BackgroundScroll, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function BackgroundScroll(background) {
            _super.call(this, background);
            this._resetSize = (this.width - config.Screen.WIDTH) * -1;
            this._speed.x = 5; //speed which background moves
            this._reset(this._resetSize);
            this.backgroundResetCount = 0;
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        BackgroundScroll.prototype._checkBounds = function (value) {
            // check bounds of background and reset if needed
            if (this.x >= value) {
                this._reset(this._resetSize);
            }
        };
        // reset the background offscreen
        BackgroundScroll.prototype._reset = function (value) {
            this.x = value;
            this.backgroundResetCount += 1;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        BackgroundScroll.prototype.update = function () {
            // scroll the background 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(0);
        };
        return BackgroundScroll;
    }(objects.GameObject));
    objects.BackgroundScroll = BackgroundScroll;
})(objects || (objects = {}));
//# sourceMappingURL=backgroundScroll.js.map