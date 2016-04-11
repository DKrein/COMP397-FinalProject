module config {

    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static INSTRUCTION: number = 1;
        public static END: number = 2;
        public static LEVEL1: number = 3;        
        public static LEVEL2: number = 4;
        public static LEVEL3: number = 5;
    }
    
    
    // Screen Constants
    export class Screen {
        public static WIDTH: number = 1024;
        public static HEIGHT: number = 768;
        public static CENTER_X: number = 512;
        public static CENTER_Y: number = 384;
    }
    
    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
} 