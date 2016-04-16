var objects;
(function (objects) {
    // KeyboardControls Class +++++++++++++++
    var KeyboardControls = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        function KeyboardControls() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // PUBLIC METHODS
        KeyboardControls.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 49:
                    this.changeToLevel1 = true;
                    break;
                case 50:
                    this.changeToLevel2 = true;
                    break;
                case 51:
                    this.changeToLevel3 = true;
                    break;
            }
        };
        KeyboardControls.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 49:
                    this.changeToLevel1 = false;
                    break;
                case 50:
                    this.changeToLevel2 = false;
                    break;
                case 51:
                    this.changeToLevel3 = false;
                    break;
            }
        };
        return KeyboardControls;
    }());
    objects.KeyboardControls = KeyboardControls;
})(objects || (objects = {}));

//# sourceMappingURL=keyboard.js.map
