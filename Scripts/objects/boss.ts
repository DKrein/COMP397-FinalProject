/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Object for Boss
Revision:
1. Created class for Boss object
    
*/

module objects {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    export class Boss extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        private _player: objects.Player;
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(player: objects.Player) {
            super("boss");
            
            this._player = player;
            this._reset(this._leftBounds);
            this.name = "boss";
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value: number): void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        }
        
        // reset the fireball offscreen
        protected _reset(value: number): void {
            this._speed.x = 5;
            this._speed.y = 1;
            
            // this.x = value;
            // this.y = (Math.floor(Math.random() * this._bottomBounds) + this._topBounds) - (this.height);
            //this.x = this._rightBounds / 2 - this.width;
            this.x = -50;
            this.y = (this._topBounds + this.height + this._bottomBounds) / 4;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update(): void {
            // scroll the fireball down the screen
            if (this.x < this._rightBounds / 2 - this.width) {
                this.x += this._speed.x;
            }
            else{
                this.x = this._rightBounds / 2 - this.width;
                console.log(this.y);
                this.y = this._player.y + this._speed.y;
            }
            
            
            // this.y += this._speed.y;
            this._checkBounds(this._rightBounds + 100);
        }
    }
}