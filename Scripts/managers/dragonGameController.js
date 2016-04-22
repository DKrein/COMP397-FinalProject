/**
 * Program: Web Gammming @ Centennial College
 * Source file: GameController.ts
 * Author: Francis Ofougwuka, Christine Cho, Douglas
 * Date modified: 14/04/2016
 * Last modified by: Christine Cho
 * Revison history:
 * 1. Added boss health value
 */
var managers;
(function (managers) {
    //GameController Class
    //Why the hell the controller with game stuff is called dragon? -.-
    var DragonGameController = (function () {
        // private _fireValue: number;
        function DragonGameController() {
            this.reset();
            // this._fireValue = 0;
        }
        Object.defineProperty(DragonGameController.prototype, "LivesValue", {
            //GETTER AND SETTER for livesValuse and ScoreValue
            get: function () {
                return this._livesValue;
            },
            set: function (value) {
                this._livesValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonGameController.prototype, "ScoreValue", {
            get: function () {
                return this._scoreValue;
            },
            set: function (value) {
                this._scoreValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonGameController.prototype, "BossValue", {
            get: function () {
                return this._bossValue;
            },
            set: function (value) {
                this._bossValue = value;
            },
            enumerable: true,
            configurable: true
        });
        DragonGameController.prototype.reset = function () {
            this._livesValue = 10;
            this._scoreValue = 0;
            this._bossValue = 5;
        };
        return DragonGameController;
    }());
    managers.DragonGameController = DragonGameController;
})(managers || (managers = {}));

//# sourceMappingURL=dragonGameController.js.map
