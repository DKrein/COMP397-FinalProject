var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    var Sky = (function (_super) {
        __extends(Sky, _super);
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Sky(background) {
            _super.call(this, background);
            this._speed.x = 5; //sky speed
            this._reset(0);
            this.skyResetCount = 0;
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Sky.prototype._checkBounds = function (value) {
            // check to see if the top of the sky 
            // is met the top of the scene
            //console.log(this.x);
            if (this.x >= value) {
                this._reset(-1219);
            }
        };
        // reset the sky offscreen
        Sky.prototype._reset = function (value) {
            this.x = value;
            this.skyResetCount += 1;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Sky.prototype.update = function () {
            // scroll the sky 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(0);
        };
        return Sky;
    }(objects.GameObject));
    objects.Sky = Sky;
})(objects || (objects = {}));
//# sourceMappingURL=sky.js.map