/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/22/2016
File description: Manages the player location

Revision:
1. Changed the location to of the player to the right of the screen
2. Adjusted rightBounds to use screen.width
*/

module objects {
    // PLAYER CLASS ++++++++++++++++++++++++++++++
    export class Player extends createjs.Bitmap {
        // PRIVATE INSTANCE VARIABLES
        private _leftBounds: number;
        private _rightBounds: number;
        
        private _topBounds: number;
        private _bottomBounds: number;

        // PUBLIC INSTANCE VARIABLES
        public width: number;
        public height: number;
        constructor(imgToLoad) {
            super(assets.getResult(imgToLoad));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            
            this._topBounds = this.height * 0.5;
            this._bottomBounds = config.Screen.HEIGHT - (this.height * 0.5);
            this._rightBounds = config.Screen.WIDTH - (this.width*0.5);

            this.x = this._rightBounds;
        }

        // PRIVATE METHODS
        private _checkBounds(): void {
            if (this.y < this._topBounds) {
                this.y = this._topBounds;
            }

            if (this.y > this._bottomBounds) {
                this.y = this._bottomBounds;
            }
        }

        // PUBLIC METHODS
        public update(): void {
            this.y = stage.mouseY;
            this._checkBounds();
        }
        
    }
}