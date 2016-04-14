var config;
(function (config) {
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.INSTRUCTION = 1;
        Scene.END = 2;
        Scene.LEVEL1 = 3;
        Scene.LEVEL2 = 4;
        Scene.LEVEL3 = 5;
        return Scene;
    }());
    config.Scene = Scene;
    // Screen Constants
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 1024;
        Screen.HEIGHT = 768;
        Screen.CENTER_X = 512;
        Screen.CENTER_Y = 384;
        return Screen;
    }());
    config.Screen = Screen;
    // Game Constants
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));

//# sourceMappingURL=config.js.map
