/**
 * Program: Web Gammming @ Centennial College
 * Source file: GameController.ts
 * Author: Francis Ofougwuka, Christine Cho, Douglas
 * Date modified: 29/03/2016
 * Last modified by: Francis Ofougwuka
 * Revison history:
 */
var managers;
(function (managers) {
    //GameController Class
    var DragonGameController = (function () {
        function DragonGameController() {
            this._livesValue = 10;
            this._scoreValue = 0;
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
        return DragonGameController;
    }());
    managers.DragonGameController = DragonGameController;
})(managers || (managers = {}));

//# sourceMappingURL=dragonGameController.js.map
