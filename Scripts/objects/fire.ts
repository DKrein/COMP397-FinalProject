/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Object for fire collectable
Revision:
1. Created class for fire collectable object
    
*/

module objects {
    // ISLAND CLASS ++++++++++++++++++++++++++++++++++++
    export class Fire extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
            super("fire");
            
           this._speed.x = 5; //fire speed
           this._reset(this._leftBounds - 100);
           this.name = "fire";
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the fire 
            // is outside the viewport         
            if(this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        }
        
        // reset the Sky offscreen
        protected _reset(value:number):void {          
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBounds) + this._topBounds;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the fire 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        }
    }
}