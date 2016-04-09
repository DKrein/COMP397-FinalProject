/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Object for egg
Revision:

    
*/

module objects {
    // ISLAND CLASS ++++++++++++++++++++++++++++++++++++
    export class Egg extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
           super("egg"+(Math.floor(Math.random() * 4)+1));        
           
           this._reset(this._leftBounds);
           this.name = "eggs";
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if(this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        }
        
        // reset the fireball offscreen
        protected _reset(value:number):void {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBounds) + this._topBounds;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the fireball down the screen
            this.x += this._speed.x;
            this.y += this._speed.y;
            this._checkBounds(this._rightBounds + 100);
        }
    }
}